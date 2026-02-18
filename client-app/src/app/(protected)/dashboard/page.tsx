// src/app/(main)/dashboard/page.tsx
"use client";

import styled from "styled-components";
import {
  UnorderedListOutlined, CheckCircleOutlined,
  CloseCircleOutlined, StopOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";

// ─── Styled Components ────────────────────────────
const Root = styled.div`
  font-family: "DM Sans", "Segoe UI", sans-serif;
`;

const WelcomeTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 28px;
  letter-spacing: -0.3px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
`;

const Card = styled.div<{ $borderColor: string }>`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 20px 18px;
  border-top: 3px solid ${({ $borderColor }) => $borderColor};
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: default;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const CardTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
`;

const CardIconWrap = styled.div<{ $bg: string; $color: string }>`
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const CardValue = styled.p`
  font-size: 36px;
  font-weight: 800;
  color: #1e293b;
  margin: 4px 0 0;
  letter-spacing: -1px;
  line-height: 1;
`;

const CardSub = styled.p<{ $color: string }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $color }) => $color};
  margin: 0;
`;

// ─── Data ─────────────────────────────────────────
const STATS = [
  {
    key: "total",
    title: "Total Registrations",
    value: "1,240",
    sub: "All Active Scope",
    subColor: "#1a56db",
    icon: <UnorderedListOutlined />,
    iconBg: "#eff6ff",
    iconColor: "#1a56db",
    border: "#1a56db",
  },
  {
    key: "complied",
    title: "Total Complied",
    value: "850",
    sub: "68.5%  Compliance Rate",
    subColor: "#16a34a",
    icon: <CheckCircleOutlined />,
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
    border: "#16a34a",
  },
  {
    key: "notComplied",
    title: "Total Not Complied",
    value: "120",
    sub: "Action required immediately",
    subColor: "#dc2626",
    icon: <CloseCircleOutlined />,
    iconBg: "#fef2f2",
    iconColor: "#dc2626",
    border: "#dc2626",
  },
  {
    key: "na",
    title: "Not Applicable",
    value: "10",
    sub: "Registration not required",
    subColor: "#64748b",
    icon: <StopOutlined />,
    iconBg: "#f8fafc",
    iconColor: "#94a3b8",
    border: "#cbd5e1",
  },
];

// ─── Component ────────────────────────────────────
export default function DashboardPage() {
  const { session } = useAuth();

  return (
    <Root>
      <WelcomeTitle>
        Welcome to Acquant Compliance Tracker,{" "}
        {session?.name?.split(" ")[0] ?? "User"}
      </WelcomeTitle>

      <CardGrid>
        {STATS.map((stat) => (
          <Card key={stat.key} $borderColor={stat.border}>
            <CardTop>
              <CardTitle>{stat.title}</CardTitle>
              <CardIconWrap $bg={stat.iconBg} $color={stat.iconColor}>
                {stat.icon}
              </CardIconWrap>
            </CardTop>
            <CardValue>{stat.value}</CardValue>
            <CardSub $color={stat.subColor}>{stat.sub}</CardSub>
          </Card>
        ))}
      </CardGrid>
    </Root>
  );
}