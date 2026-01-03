import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  // Agar user already authenticated hai aur login/register/verify pages pe hai
  if (
    token &&
    ["/", "/sign-in", "/sign-up", "/verify"].includes(url.pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Agar user authenticated nahi hai aur dashboard access karna chahta hai
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Default: request allow kar do
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/verify/:path*", "/dashboard/:path*"],
};
