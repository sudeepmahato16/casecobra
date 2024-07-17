import express, { Express, urlencoded } from "express";
import { authRouter } from "./routes/authRouter";

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

export default app;
