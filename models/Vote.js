import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mobile:{
    type: Number,
    unique: true
  },
  place: String,
  district: String,
  constituency: String,
  party: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Vote", voteSchema);