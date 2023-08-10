import mongoose from "mongoose";
import bcrypt from "bcrypt";

var slug = require("mongoose-slug-generator");
var options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};
mongoose.plugin(slug, options);
var Schema = mongoose.Schema;

const Userschema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      ],
    },
    image: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    password: {
      type: String,
      minLength: [6, "Your password must be at least 6 characters long"],
      select: false, //dont send back password after request
    },
    slug: { type: String, slug: "username", unique: true },
  },
  { timestamps: true },
);

// ENCRYPTION
Userschema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) next();

  const hashedPassword: string = await bcrypt.hash(this.password || "", 10);
  this.password = hashedPassword;
  next();
});

const User = mongoose.models.User || mongoose.model("User", Userschema);
export default User;
