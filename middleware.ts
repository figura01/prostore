import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token");
  // Check if the user is on a protected page and is not authenticated
  if (pathname.startsWith("/protected") && !token) {
    return Response.redirect(new URL("/login", request.url));
  }
  // Add a custom header to the response
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "This is a custom header");
  return response;
}
