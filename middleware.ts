import { NextRequest, NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // console.log(token);

  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname == "/")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if ((!token && url.pathname.startsWith("/home")) || url.pathname == "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-up", "/login", "/", "/:path*"],
};
