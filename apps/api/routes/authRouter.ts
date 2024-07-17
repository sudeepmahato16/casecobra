import { Router } from "express";
import { signUp } from "@/controller/authController";
import schemaValidator from "@/middleware/schemaValidator";

const authRouter: Router = Router();

authRouter.post("/signup", schemaValidator("signup"), signUp);

export { authRouter };
