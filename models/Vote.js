import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 18
    },

    mobile: {
      type: String,
      required: true,
      index: true,
      match: /^[6-9]\d{9}$/
    },

    district: {
      type: String,
      required: true,
      index: true
    },

    constituency: {
      type: String,
      required: true
    },

    party: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Vote", voteSchema);