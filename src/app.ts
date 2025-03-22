import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { ICustomError } from "./interfaces/errorInterface.js";
import { authRouter } from "./routes/api/index.js";

const { NODE_ENV } = process.env;

const formatsLogger = NODE_ENV === "development" ? "dev" : "short";

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api/auth", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(
  (error: ICustomError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
);

export default app;
