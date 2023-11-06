import Bucket from "@/app/models/Bucket";
import connectToDatabase from "@/lib/mongoose";

export default async (req, res) => {
  try {
    await connectToDatabase();
    const { email, date } = req.body;

    switch (req.method) {
      case "POST":
        let bucketExist = await Bucket.findOne({
          email: email,
          date: date,
          title: req.body.title,
        }).exec();
        if (!bucketExist) {
          const data = {
            email,
            date,
            title: req.body.title,
            secondsCompleted: 0,
            secondsAllocated: 0,
          };
          const newBucketEntry = new Bucket(data);
          await newBucketEntry.save();
          return res.status(201).json({ bucketCreated: newBucketEntry });
        } else {
          console.log(res.json());
          return res.status(409).json({ error: "Bucket already exists" });
        }

      case "GET":
        const buckets = await Bucket.find({
          email: req.query.email,
          date: req.query.date,
        }).exec();
        console.log(buckets);
        return res.status(200).json({ buckets });

      case "PATCH":
        const id = req.body.id;
        const type = req.body.type;
        const seconds = req.body.seconds;
        console.log(req.body);
        let updatedBucket;
        if (type == "allocated") {
          updatedBucket = await Bucket.findOneAndUpdate(
            { _id: id },
            { secondsAllocated: seconds },
            {
              new: true,
            }
          );
        } else if (type == "completed") {
          updatedBucket = await Bucket.findOneAndUpdate(
            { _id: updatedId },
            { secondsCompleted: seconds },
            {
              new: true,
            }
          );
        }
        return res.status(200).json({ updatedBucket });

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
