import { Response } from "express";
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import { ObjectId } from "bson";

import { db } from "@casecobra/db";
import Email from "@/services/email";
import AppError from "@/utils/appError";
import { catchAsync } from "@/utils/catchAsync";
import AuthManager from "@/utils/authManager";
import { EMAIL_ACTIVATION_TOKEN_EXPIRES_IN } from "@/config";

const createHashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const createEmailVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashToken = createHashToken(token);

  return {
    token,
    hashToken,
  };
};

export const checkEmailVerificationToken = async (token: string) => {
  try {
    const hashToken = createHashToken(token);
    const user = await db.user.findFirst({
      where: {
        verificationToken: hashToken,
        verificationTokenExpiresIn: {
          gt: new Date(Date.now()),
        },
      },
    });

    if (!user) throw new Error("Token is invalid or has expired");

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
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

    const { token, hashToken } = createEmailVerificationToken();

    const verificationTokenExpiresIn = new Date(
      Date.now() + Number(EMAIL_ACTIVATION_TOKEN_EXPIRES_IN)
    );

    await db.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
        name,
        verificationToken: hashToken,
        verificationTokenExpiresIn,
      },
    });

    const url = `${req.protocol}://${req.get("host")}/api/v1/auth/verify?token=${token}`;

    await new Email({
      user: { email, name },
      url,
    }).sendEmailActivationMail();

    res.status(201).json({
      status: "success",
      message: "Please verified your email address",
    });
  } catch (error) {
    console.log(error);
    next(new AppError("Failed to create account", 500));
  }
});

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || (user && !(await bcrypt.compare(password, user.password)))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  if (!user.isVerified) {
    return next(new AppError("Please verified your email address", 401));
  }

  new AuthManager(res)
    .createTokenAndCookie(user.id)
    .sendResponse(200, { id: user.id, email: user.email, name: user.name });
});

export const verifyUser = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  if (!token || typeof token !== "string")
    return next(new AppError("token not found!", 404));

  try {
    const user = await checkEmailVerificationToken(token);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresIn: null,
      },
    });

    new AuthManager(res)
      .createTokenAndCookie(user.id)
      .redirect("http://localhost:3000");
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
});

export const signOut = catchAsync(async (req, res, next) => {
  res.cookie("casecobra-access-token", "signout", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 5000),
  });

  res.cookie("casecobra-refresh-token", "signout", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 5000),
  });

  res.status(200).json({
    status: "success",
  });
});
