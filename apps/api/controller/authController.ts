import * as bcrypt from "bcrypt";
import crypto from "crypto";
import { ObjectId } from "bson";

import { db } from "@casecobra/db";
import Email from "@/services/email";
import AppError from "@/utils/appError";
import { catchAsync } from "@/utils/catchAsync";
import { EMAIL_ACTIVATION_TOKEN_EXPIRES_IN } from "@/config";

const createEmailActivationToken = (id: string) => {
  const token = crypto.randomBytes(32).toString("hex");

  return crypto.createHash("sha256").update(token).digest("hex");
};

export const signUp = catchAsync(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isEmailInUse = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailInUse) return next(new AppError("Email is in use", 400));

    const id = new ObjectId().toString();

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = createEmailActivationToken(id);
    const verificationTokenExpiresIn = new Date(
      Date.now() + Number(EMAIL_ACTIVATION_TOKEN_EXPIRES_IN)
    );

    await db.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresIn,
      },
    });
    const url = `${req.protocol}://${req.get("host")}/api/v1/auth/activate?token=${verificationToken}`;
    await new Email({
      user: { email, name },
      url,
    }).sendEmailActivationMail();

    res.status(200).json({
      status: "success",
      message: "Please verified your email address",
    });
  } catch (error) {
    console.log(error);
    next(new AppError("Failed to create account", 500));
  }
});
