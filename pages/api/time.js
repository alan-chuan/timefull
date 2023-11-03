import DailyTime from "@/app/models/DailyTime";
import connectToDatabase from "@/lib/mongoose";

export default async (req, res) => {
  try {
    await connectToDatabase(); // Ensure you have a connection method in `lib/mongodb`.
    const { email, date } = req.body;

    switch (req.method) {
      case "POST":
        let timeEntry = await DailyTime.findOne({ email, date });

        if (timeEntry && timeEntry.secondsRemaining) {
          const { secondsRemaining } = timeEntry;
          return res.status(200).json({ secondsRemaining });
        } else {
          const data = {
            email,
            date,
            secondsRemaining: 28000,
          };

          const newTimeEntry = new DailyTime(data);
          await newTimeEntry.save();

          return res
            .status(201)
            .json({ secondsRemaining: data.secondsRemaining });
        }
      case "PATCH":
        console.log(req.body);
        const { secondsRemaining } = req.body;
        await DailyTime.findOneAndUpdate(
          { email: email, date: date },
          { secondsRemaining: secondsRemaining }
        );
        return res.status(200).json();

        break;

      default:
        return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
