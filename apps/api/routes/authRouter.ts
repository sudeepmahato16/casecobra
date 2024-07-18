import { Router } from "express";
import { signIn, signUp, verifyUser } from "@/controller/authController";
import schemaValidator from "@/middleware/schemaValidator";

const authRouter: Router = Router();

authRouter.post("/signup", schemaValidator("signup"), signUp);
authRouter.post("/signin", schemaValidator("signin"), signIn);

authRouter.get("/verify", verifyUser);

export { authRouter };
