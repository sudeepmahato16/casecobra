import express, { Express } from "express";

const app: Express = express();

app.get("/", (req, res, next) => {
  res.send("hello!");
});

export default app;
