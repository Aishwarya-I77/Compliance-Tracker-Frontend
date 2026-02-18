// src/lib/apiClient.ts

import { getToken } from "@/lib/auth";
import { LoginRequest, LoginResponse, ApiResponse } from "@/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8082";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const body = await res.json();
      console.log("🔴 Backend error response:", body);
      message = body.message || body.error || message;
    } catch {
      // ignore
    }
    throw new ApiError(res.status, message);
  }

  // ← Unwrap the "data" field from the backend wrapper
  const json = await res.json() as ApiResponse<T>;
  return json.data;
}

export const authApi = {
  login(payload: LoginRequest): Promise<LoginResponse> {
    return request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export { ApiError };
