export interface LoginRequest {
  email: string;
  password: string;
}

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
  | "INTERNAL_SUPER_ADMIN";
