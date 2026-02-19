import { ReactNode } from "react";

export interface DashboardSummary {
  totalRegistrations: number;
  totalComplied: number;
  totalNotComplied: number;
  notApplicable: number;
}

export interface DashboardStat {
  key: string;
  title: string;
  value: string;
  sub: string;
  subColor: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  borderColor: string;
}
