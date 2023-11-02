import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    switch (req.method) {
      case "POST":
        const data = req.body;

        db.collection("todo").insertOne(data);
        res.status(200).json({ message: "Nice" });
        break;

      case "PATCH":
        try {
          const updatedId = await db.collection("todo").updateOne(
            {
              _id: new ObjectId(req.body.id),
              email: req.body.email,
            },
            { $set: { isDone: req.body.isDone } }
          );
          res.status(200).json({ updatedId: updatedId });
          break;
        } catch (e) {
          console.log(e);
        }

      case "GET":
        const todos = await db
          .collection("todo")
          .find({
            email: req.query.email,
            date: req.query.date,
          })
          .toArray();
        res.status(200).json({ todos });
        break;

      default:
        res.status(405).end(); // Method Not Allowed
        break;

      case "DELETE":
        try {
          const deletedId = db.collection("todo").deleteOne({
            _id: new ObjectId(req.body.id),
          });
          res.status(200).json({ deletedId });
        } catch (e) {
          print(e);
        }
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
