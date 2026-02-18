"use client";

import { AuthSession, LoginResponse, UserRole } from "@/types/auth";

const SESSION_STORAGE_KEY = "acquantrack_auth_session";

function isUserRole(value: unknown): value is UserRole {
  return (
    value === "CLIENT_ADMIN" ||
    value === "CLIENT_USER" ||
    value === "INTERNAL_USER" ||
    value === "SUPER_ADMIN"
  );
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") return false;

  const session = value as Record<string, unknown>;
  return (
    typeof session.token === "string" &&
    typeof session.userId === "number" &&
    typeof session.name === "string" &&
    typeof session.email === "string" &&
    isUserRole(session.role) &&
    (session.clientId === null || typeof session.clientId === "number") &&
    (session.clientName === null || typeof session.clientName === "string") &&
    Array.isArray(session.categoryAccess) &&
    session.categoryAccess.every((category) => typeof category === "string")
  );
}

function mapLoginResponseToSession(response: LoginResponse): AuthSession {
  return {
    token: response.token,
    userId: response.userId,
    name: response.name,
    email: response.email,
    role: isUserRole(response.role) ? response.role : "CLIENT_USER",
    clientId: response.clientId,
    clientName: response.clientName,
    categoryAccess: response.categoryAccess,
  };
}

export function saveSession(response: LoginResponse): void {
  if (typeof window === "undefined") return;
  const session = mapLoginResponseToSession(response);
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isAuthSession(parsed)) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function getToken(): string | null {
  return getSession()?.token ?? null;
}

export function isClientAdmin(session: AuthSession | null): boolean {
  return !!session && (session.role === "CLIENT_ADMIN" || session.role === "SUPER_ADMIN");
}
