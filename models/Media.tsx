import mongoose, { Schema } from "mongoose";

const MediaSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"]
    },
    url: {
      type: String,
      required: [true, "Url is required"]
    }
  },
  { timestamps: true }
);

const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema);
export default Media;
