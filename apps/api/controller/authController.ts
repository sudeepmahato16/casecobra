import * as bcrypt from "bcrypt";
import { db } from "@casecobra/db";
import { catchAsync } from "@/utils/catchAsync";
import AppError from "@/utils/appError";

export const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const isEmailInUse = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (isEmailInUse) return next(new AppError("Email is in use", 400));

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Please verified your email address",
    });
  } catch (error) {
    return next(new AppError("Failed to create account", 500));
  }
});
