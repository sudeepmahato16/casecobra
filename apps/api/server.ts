import app from "@/app";
import { config } from "dotenv";

config({
  path: "./.env",
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
