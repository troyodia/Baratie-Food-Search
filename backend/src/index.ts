import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.get("/", async (req: Request, res: Response) => {
  res.send("home");
});

const port = process.env.PORT || 5000;
const start = () => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};
start();
