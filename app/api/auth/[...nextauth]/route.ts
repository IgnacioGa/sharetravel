import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectoToDB } from "@utils/database";
import User from "@models/User";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserType } from "@utils/schemasTypes";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        await connectoToDB();
        const email = credentials?.email.toLowerCase();
        const sessionUser = await User.findOne({
          email: email
        }).select("+password");
        if (!sessionUser) {
          throw new Error("User does not exist.");
        }

        //validate password
        const passwordIsValid = await bcrypt.compare(credentials?.password!, sessionUser.password);

        if (!passwordIsValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: sessionUser._id.toString(),
          ...sessionUser
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      let sessionUser;
      if (session.user?.email) {
        sessionUser = await User.findOne({
          email: session.user?.email
        });
      } else {
        sessionUser = await User.findOne({
          _id: token.sub as string
        });
      }

      if (sessionUser) {
        session.user._id = sessionUser?.id;
        session.user.email = sessionUser?.id;
        session.user.name = sessionUser?.username;
        session.user.image = sessionUser?.image;
        session.user.slug = sessionUser?.slug;
      }
      return session;
    },
    async signIn({ profile }) {
      if (profile) {
        try {
          await connectoToDB();
          const userExists = await User.findOne({
            email: profile?.email
          });

          if (!userExists) {
            await User.create({
              email: profile?.email,
              username: profile?.name?.replace(" ", "").toLowerCase(),
              image: profile?.picture,
              firstName: profile?.given_name,
              lastName: profile?.family_name
            });
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    }
  }
});

export { handler as GET, handler as POST };
