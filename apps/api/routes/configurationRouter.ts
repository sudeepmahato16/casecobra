import { Router } from "express";

import { isAuthenticated } from "@/middleware/isAuthenticated";
import schemaValidator from "@/middleware/schemaValidator";
import {
  createConfiguration,
  getConfigurationById,
} from "@/controller/configurationController";

const configurationRouter: Router = Router();

configurationRouter.use(isAuthenticated);

configurationRouter.post(
  "/",
  schemaValidator("createConfiguration"),
  createConfiguration
);

configurationRouter.get("/:id", getConfigurationById);

export { configurationRouter };
