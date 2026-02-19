"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { AuthSession } from "@/types/auth";
import { getSession, clearSession, isClientAdmin } from "@/lib/auth";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(() => getSession());
  const router = useRouter();

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    router.replace(ROUTES.login);
  }, [router]);

  return {
    session,
    loading: false,
    isAdmin: isClientAdmin(session),
    logout,
  };
}
