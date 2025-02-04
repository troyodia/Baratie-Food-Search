import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "../db/connectDB";
const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.get("/", async (req: Request, res: Response) => {
  res.send("home");
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    if (error instanceof Error) console.log(error);
  }
};
start();
