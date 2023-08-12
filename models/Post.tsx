import { STATUS } from "@utils/contants";
import Metadata from "@utils/metadata";
import mongoose from "mongoose";
import Media from "./Media";

var slug = require("mongoose-slug-generator");
var options = {
  separator: "-",
  lang: "en",
  truncate: 120
};
mongoose.plugin(slug, options);
var Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    ...Metadata,
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    text: {
      type: String,
      required: [true, "Text is required"]
    },
    city: {
      type: String,
      required: [true, "City is required"]
    },
    principalImage: {
      type: String
    },
    slug: { type: String, slug: "title", unique: true },
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.DRAFT,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

PostSchema.virtual("medias", {
  ref: Media,
  localField: "_id",
  foreignField: "post"
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
