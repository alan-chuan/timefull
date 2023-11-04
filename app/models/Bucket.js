import mongoose, { Schema } from "mongoose";

const bucketSchema = new Schema({
  email: String,
  date: String,
  title: String,
  secondsCompleted: Number,
  secondsAllocated: Number,
});

const Bucket = mongoose.models.Bucket || mongoose.model("Bucket", bucketSchema);

export default Bucket;
