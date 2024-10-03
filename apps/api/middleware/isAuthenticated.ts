import { NextFunction, Request, Response } from "express";
import AppError from "@/utils/appError";
import { verifyToken } from "@/controller/authController";
import { ACCESS_TOKEN_SECRET } from "@/config";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies["casecobra-access-token"];
  }

  if (!token)
    return next(
      new AppError("You are not logged in. please log in to get access.", 401)
    );

  try {
    const data = verifyToken(token, ACCESS_TOKEN_SECRET!);

    if (!data.id) {
      return next(
        new AppError("You are not logged in. please log in to get access.", 401)
      );
    }

    req.user = {
      id: data.id,
    };

    next();
  } catch (error: any) {
    next(new AppError("Token is invalid or has expired", 401));
  }
};
