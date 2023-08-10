import { Schema } from "mongoose";

const Metadata = {
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  }
};

export default Metadata;
