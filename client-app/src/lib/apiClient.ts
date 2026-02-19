import { getToken } from "@/lib/auth";
import { ApiResponse } from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8082";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const body = await response.json(); 
      message = body.message || body.error || message;
    } catch {
      // Keep default message when backend body cannot be parsed.
    }
    throw new ApiError(response.status, message);
  }

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}
