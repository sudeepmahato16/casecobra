import AppError from "@/utils/appError";
import { catchAsync } from "@/utils/catchAsync";
import { db } from "@/app";
import { redis } from "@/lib/redis";

export const getCurrentUser = catchAsync(async (req, res, next) => {
  const data = req.user;

  if (!data) return next(new AppError("Please logged in to access this!", 401));

  const cachedUser = await redis.get(data.id);

  if (cachedUser) {
    return res.status(200).json({
      status: "success",
      data: {
        user: JSON.parse(cachedUser),
      },
    });
  }

  const user = await db.user.findUnique({
    where: {
      id: data.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (user) {
    await redis.set(user.id, JSON.stringify(user));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
