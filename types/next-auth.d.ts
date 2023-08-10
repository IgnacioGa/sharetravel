import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    _id: string;
    role: number;
    user: {
      _id: string;
      email: string;
      name: string;
      image: string;
      slug: string;
    };
  }

  interface Profile {
    given_name: string;
    family_name: number;
    picture: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: number;
  }
}
