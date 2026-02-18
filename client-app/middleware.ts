import { NextRequest, NextResponse } from "next/server";

const PUBLIC    = ["/login", "/forgot-password", "/reset-password", "/unauthorised"];
const ADMIN_ONLY = ["/dashboard/users", "/dashboard/settings"];

const isPublic    = (p: string) => PUBLIC.some(r => p.startsWith(r));
const isAdminOnly = (p: string) => ADMIN_ONLY.some(r => p.startsWith(r));

function decodePayload(token: string): { role?: string; exp?: number } | null {
  try {
    const b64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(b64));
  } catch { return null; }
}

function expired(p: { exp?: number }) {
  return !p.exp || Date.now() >= p.exp * 1000;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  if (pathname === "/") return NextResponse.redirect(new URL("/login", req.url));
  if (isPublic(pathname)) return NextResponse.next();

  const token = req.cookies.get("ct_access_token")?.value;
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  const payload = decodePayload(token);
  if (!payload || expired(payload)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("session", "expired");
    return NextResponse.redirect(url);
  }

  if (isAdminOnly(pathname) && payload.role !== "client-admin") {
    return NextResponse.redirect(new URL("/unauthorised", req.url));
  }

  const res = NextResponse.next();
  res.headers.set("x-user-role", payload.role ?? "");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};