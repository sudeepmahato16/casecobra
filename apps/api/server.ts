import { config } from "dotenv";

config({
  path: "./.env",
});

import app from "@/app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});
