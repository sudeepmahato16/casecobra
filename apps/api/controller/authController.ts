import { catchAsync } from "@/utils/catchAsync";

export const signUp = catchAsync(async (req, res, next) => {
  res.send("hello");
});
