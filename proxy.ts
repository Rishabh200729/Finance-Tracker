import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // if NOT logged in
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
