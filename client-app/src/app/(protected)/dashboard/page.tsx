"use client";

import {
  UnorderedListOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/features/auth/hooks";
import { useGetDashboardSummaryQuery } from "@/features/auth/dashboard/dashboardApi";
import StatCard from "@/features/auth/dashboard/components/StatCard";
import { DashboardStat } from "@/features/auth/dashboard/types";
import { Root, WelcomeTitle, CardGrid } from "./page.styles";

function formatValue(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function DashboardPage() {
  const { session } = useAuth();
  const { data, isLoading } = useGetDashboardSummaryQuery();

  const totalRegistrations = data?.totalRegistrations ?? 0;
  const totalComplied = data?.totalComplied ?? 0;
  const totalNotComplied = data?.totalNotComplied ?? 0;
  const notApplicable = data?.notApplicable ?? 0;
  const complianceRate =
    totalRegistrations > 0
      ? ((totalComplied / totalRegistrations) * 100).toFixed(1)
      : "0.0";

  const stats: DashboardStat[] = [
    {
      key: "total",
      title: "Total Registrations",
      value: formatValue(totalRegistrations),
      sub: "All Active Scope",
      subColor: "#1a56db",
      icon: <UnorderedListOutlined />,
      iconBg: "#eff6ff",
      iconColor: "#1a56db",
      borderColor: "#1a56db",
    },
    {
      key: "complied",
      title: "Total Complied",
      value: formatValue(totalComplied),
      sub: `${complianceRate}% Compliance Rate`,
      subColor: "#16a34a",
      icon: <CheckCircleOutlined />,
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
      borderColor: "#16a34a",
    },
    {
      key: "notComplied",
      title: "Total Not Complied",
      value: formatValue(totalNotComplied),
      sub: "Action required immediately",
      subColor: "#dc2626",
      icon: <CloseCircleOutlined />,
      iconBg: "#fef2f2",
      iconColor: "#dc2626",
      borderColor: "#dc2626",
    },
    {
      key: "na",
      title: "Not Applicable",
      value: formatValue(notApplicable),
      sub: "Registration not required",
      subColor: "#64748b",
      icon: <StopOutlined />,
      iconBg: "#f8fafc",
      iconColor: "#94a3b8",
      borderColor: "#cbd5e1",
    },
  ];

  return (
    <Root>
      <WelcomeTitle>
        Welcome to Acquant Compliance Tracker,{" "}
        {session?.name?.split(" ")[0] ?? "User"}
      </WelcomeTitle>

      {isLoading && <p>Loading dashboard summary...</p>}

      <CardGrid>
        {stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </CardGrid>
    </Root>
  );
}
