import mongoose, { Schema } from "mongoose";

const dailyTimeSchema = new Schema({
  email: String,
  date: String,
  secondsRemaining: Number,
});

const DailyTime =
  mongoose.models.DailyTime || mongoose.model("DailyTime", dailyTimeSchema);
export default DailyTime;
