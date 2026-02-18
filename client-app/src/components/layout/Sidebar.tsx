// src/components/layout/Sidebar.tsx
"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AppstoreOutlined, AuditOutlined, SendOutlined,
  RetweetOutlined, BellOutlined, BarChartOutlined,
  LockOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  SidebarWrap, LogoArea, LogoImg, LogoLetter,
  NavWrap, NavGroupGap, NavItem, NavInner,
  NavIcon, NavLabel, LockIcon,
  BottomDivider, CollapseBtn,
} from "./styles/Sidebar.styles";

// ─── Nav config ───────────────────────────────────
type NavItemType = { key: string; label: string; icon: React.ReactNode; href: string; locked: boolean };

const UNLOCKED_NAV: NavItemType[] = [
  { key: "dashboard",     label: "Dashboard",     icon: <AppstoreOutlined />, href: "/dashboard",     locked: false },
  { key: "registrations", label: "Registrations", icon: <AuditOutlined />,   href: "/registrations", locked: false },
  { key: "returns",       label: "Returns",       icon: <RetweetOutlined />, href: "/returns",       locked: false },
  { key: "remittance",    label: "Remittance",    icon: <SendOutlined />,    href: "/remittance",    locked: false },
];

const LOCKED_NAV: NavItemType[] = [
  { key: "notices",   label: "Notices",   icon: <BellOutlined />,     href: "/notices",   locked: true },
  { key: "analytics", label: "Analytics", icon: <BarChartOutlined />, href: "/analytics", locked: true },
];

// ─── Component ────────────────────────────────────
export default function Sidebar({ onCollapse }: { onCollapse?: (c: boolean) => void }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href;

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapse?.(next);
  };

  const renderItem = ({ key, label, icon, href, locked }: NavItemType) => (
    <NavItem
      key={key}
      $active={isActive(href)}
      $locked={locked}
      onClick={() => !locked && router.push(href)}
    >
      <NavInner $collapsed={collapsed}>
        <NavIcon $active={isActive(href)} $locked={locked}>{icon}</NavIcon>
        {!collapsed && (
          <>
            <NavLabel $active={isActive(href)} $locked={locked}>{label}</NavLabel>
            {locked && <LockIcon><LockOutlined /></LockIcon>}
          </>
        )}
      </NavInner>
    </NavItem>
  );

  return (
    <SidebarWrap $collapsed={collapsed}>
      <LogoArea $collapsed={collapsed}>
        {collapsed
          ? <LogoLetter>A</LogoLetter>
          : <LogoImg src="/logo.png" alt="AcquantHR" />}
      </LogoArea>

      <NavWrap>
        {UNLOCKED_NAV.map(renderItem)}
        <NavGroupGap />
        {LOCKED_NAV.map(renderItem)}
      </NavWrap>

      <BottomDivider />
      <CollapseBtn $collapsed={collapsed} onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </CollapseBtn>
    </SidebarWrap>
  );
}