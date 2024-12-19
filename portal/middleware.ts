import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.redirect(new URL("/landing/", req.url));
  }
  
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/portal", req.url));
  }

 

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/portal",
    "/portal/transactions/:path*",
    "/portal/api/:path*",
    "/portal/profile/:path*",
    "/portal/team/:path*",
  ],
};
