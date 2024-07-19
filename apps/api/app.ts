import express, { Express, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authRouter } from "./routes/authRouter";
import { userRouter } from "./routes/userRouter";
import globalErrorHandler from "./controller/errorController";
import AppError from "./utils/appError";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

const app: Express = express();

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  urlencoded({
    limit: "10kb",
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.options("*", cors());

app.get("/", (req, res, next) => {
  res.send("hello!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, _res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
