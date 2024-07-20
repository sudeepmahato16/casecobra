import { Router } from "express";

import { isAuthenticated } from "@/middleware/isAuthenticated";
import schemaValidator from "@/middleware/schemaValidator";
import { createConfiguration } from "@/controller/configurationController";

const configurationRouter: Router = Router();

configurationRouter.post(
  "/",
  isAuthenticated,
  schemaValidator("createConfiguration"),
  createConfiguration
);

export { configurationRouter };
