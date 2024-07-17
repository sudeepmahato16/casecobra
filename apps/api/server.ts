import app from "@/app";
import { config } from "dotenv";
import { PORT } from "./config";

config({
  path: "./.env",
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});
