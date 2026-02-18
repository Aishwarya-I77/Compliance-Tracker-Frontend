"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthSession } from "@/types/auth";
import { getSession, clearSession, isClientAdmin } from "@/lib/auth";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const s = getSession();
    setSession(s);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    router.replace("/login");
  }, [router]);

  return {
    session,
    loading,
    isAdmin: isClientAdmin(session),
    logout,
  };
}
