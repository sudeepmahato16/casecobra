import { Router } from "express";
import { signUp, verifyUser } from "@/controller/authController";
import schemaValidator from "@/middleware/schemaValidator";

const authRouter: Router = Router();

authRouter.post("/signup", schemaValidator("signup"), signUp);

authRouter.get("/verify", verifyUser);

export { authRouter };
