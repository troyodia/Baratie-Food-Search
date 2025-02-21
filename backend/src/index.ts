import "dotenv/config";
import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./db/connectDB";
import { notFoundErrorMiddleware } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/user";
import { resturantRouter } from "./routes/myResturant";
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.APP_ORIGIN, credentials: true }));

app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
  res.send("home");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/resturant", resturantRouter);

app.use(errorHandler);
app.use(notFoundErrorMiddleware);

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
