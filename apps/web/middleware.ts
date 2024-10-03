import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/user";
import { ADMIN_EMAIL } from "./utils/config";

export async function middleware(request: NextRequest) {
  const forbiddenRoutes = ["/dashboard"];

  const currentPath = request.nextUrl.pathname;

  const isForbiddenRoute = forbiddenRoutes.includes(currentPath);

  const response = NextResponse.next();

  const data = await getCurrentUser();

  if (data && data?.token) {
    response.cookies.set("casecobra-access-token", data.token.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });
    response.cookies.set("casecobra-refresh-token", data.token.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });
  }

  if (isForbiddenRoute) {
    if (!data || data.user.email !== ADMIN_EMAIL)
      return NextResponse.redirect(new URL("/not-found", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
