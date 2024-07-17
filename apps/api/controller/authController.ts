import { catchAsync } from "@/utils/catchAsync";

export const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
});
