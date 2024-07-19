import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/user";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/dashboard", "/configure"];

  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const user = await getCurrentUser();

    if (!user)
      return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
