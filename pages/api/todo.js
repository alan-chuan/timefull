import Todo from "@/app/models/Todo";
import dbConnect from "@/lib/mongoose";

export default async (req, res) => {
  await dbConnect();
  try {
    switch (req.method) {
      case "POST":
        const data = req.body;
        const todo = new Todo(data);
        const saved = await todo.save();
        res.status(200).json({ saved });
        break;

      case "PATCH":
        try {
          const updatedId = req.body.id;
          const isDone = req.body.isDone;
          await Todo.findOneAndUpdate({ _id: updatedId }, { isDone: isDone });
          res.status(200).json({ updatedId });
        } catch (e) {
          console.log(e);
        }
        break;

      case "GET":
        const todos = await Todo.find({
          email: req.query.email,
          date: req.query.date,
        }).exec();
        res.status(200).json({ todos });
        break;

      case "DELETE":
        try {
          const deletedId = req.body.id;
          await Todo.deleteOne({ _id: deletedId });
          res.status(200).json({ deletedId });
        } catch (e) {
          console.log(e);
        }
        break;

      default:
        res.status(405).end(); // Method Not Allowed
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
