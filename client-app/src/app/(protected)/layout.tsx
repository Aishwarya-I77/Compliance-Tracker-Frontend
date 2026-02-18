// src/app/(main)/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Spin } from "antd";
import styled from "styled-components";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { AppContent } from "@/styles/shared";
import { colors, fonts } from "@/styles/theme";

const AppLayout = styled(Layout)`
  min-height: 100vh;
  background: ${colors.appBg};
  font-family: ${fonts.family};
`;

const LoaderWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.appBg};
`;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const [sidebarWidth, setSidebarWidth] = useState(210);

  useEffect(() => {
    if (!loading && !session) router.replace("/login");
  }, [loading, session, router]);

  if (loading) return <LoaderWrap><Spin size="large" /></LoaderWrap>;
  if (!session) return null;

  return (
    <AppLayout>
      <Header sidebarWidth={sidebarWidth} />
      <Layout>
        <Sidebar onCollapse={(c) => setSidebarWidth(c ? 59 : 210)} />
        <AppContent $left={sidebarWidth}>{children}</AppContent>
      </Layout>
    </AppLayout>
  );
}