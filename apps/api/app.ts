import express, { Express, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

config({
  path: "./.env",
});

import { PrismaClient } from "@casecobra/db";
import { authRouter } from "@/routes/authRouter";
import { userRouter } from "@/routes/userRouter";
import { configurationRouter } from "@/routes/configurationRouter";
import { orderRouter } from "@/routes/orderRouter";

import globalErrorHandler from "@/controller/errorController";
import { webHooksCheckout } from "@/controller/orderController";
import AppError from "@/utils/appError";
import { CLIENT_URL, PORT } from "@/config";
import { logger } from "@/utils/logger";
import { morganMiddleware } from "./middleware/morgan";

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

export const db = new PrismaClient();

app.use(morganMiddleware);

app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);

app.options("*", cors());

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  webHooksCheckout
);

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

app.get("/", (req, res, next) => {
  res.send("hello!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/configure", configurationRouter);

app.all("*", (req, _res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}....`);
});

export default app;
