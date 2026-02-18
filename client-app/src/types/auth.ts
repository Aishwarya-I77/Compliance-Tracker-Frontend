// src/types/auth.ts

// Matches backend LoginRequest DTO
export interface LoginRequest {
  email: string;
  password: string;
}

// ← ADD THIS — the wrapper the backend sends
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
}

// Matches backend LoginResponse DTO exactly
export interface LoginResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
  role: string;
  clientId: number | null;
  clientName: string | null;
  categoryAccess: string[];
}

// Parsed session stored in cookie
export interface AuthSession {
  token: string;
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  clientId: number | null;
  clientName: string | null;
  categoryAccess: string[];
}

export type UserRole =
  | "CLIENT_ADMIN"
  | "CLIENT_USER"
  | "INTERNAL_USER"
  | "SUPER_ADMIN"
  | "INTERNAL_SUPER_ADMIN"; // ← also add this role