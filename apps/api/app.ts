import express, { Express, urlencoded } from "express";
import { authRouter } from "./routes/authRouter";
import globalErrorHandler from "./controller/errorController";
import AppError from "./utils/appError";

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

app.get("/", (req, res, next) => {
  res.send("hello!");
});

app.use("/api/v1/auth", authRouter);

app.all("*", (req, _res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
