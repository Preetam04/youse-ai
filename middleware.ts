import { NextRequest, NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export { default } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const token = await getToken({ req: request });
  const url = request.nextUrl;
  const header = request.headers;
  const token: string | null = header.get("token");
  // console.log(url.pathname);

  if (url.pathname.includes("/api")) {
    if (!url.pathname.includes("/auth")) {
      if (token) {
        const secret = new TextEncoder().encode(process.env.ACCESSTOKEN_SECRET);

        const { payload } = await jwtVerify(token, secret);

        if (payload) {
          const requestHeaders = new Headers(request.headers);
          requestHeaders.set("user", JSON.stringify(payload));

          return NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
        }
      } else {
        return Response.json(
          {
            message: "Unauthorized!",
            status: 401,
          },
          {
            status: 401,
          }
        );
      }
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-up", "/login", "/", "/:path*", "/api/:path*"],
};
