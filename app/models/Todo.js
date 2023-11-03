import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const todoSchema = new Schema({
  email: String,
  task: String,
  isDone: Boolean,
  date: String,
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
