export const ROUTES = {
  home: "/",
  landing: "/landing",
  login: "/login",
  dashboard: "/dashboard",
} as const;

export const PUBLIC_ROUTES = [ROUTES.landing, ROUTES.login] as const;
export const PROTECTED_ROUTES = [ROUTES.dashboard] as const;
