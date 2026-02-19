// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { usePathname } from "next/navigation";
import { Badge, Dropdown } from "antd";
import {
  SearchOutlined, BellOutlined, UserOutlined,
  LogoutOutlined, SettingOutlined, AppstoreOutlined,
  AuditOutlined, SendOutlined, RetweetOutlined,
  BarChartOutlined, BellFilled, CustomerServiceOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth/hooks";
import {
  HeaderWrap, PageInfo, PageIconWrap, HeaderActions,
  MenuProfileWrap, MenuUserName, MenuUserEmail,
  HeaderSearch, BellButton, AvatarButton, PrimaryAvatar, PageTitle,
} from "./Header.styles";

// ─── Page map ─────────────────────────────────────
const PAGE_MAP: Record<string, { label: string; icon: React.ReactNode }> = {
  "/dashboard":     { label: "Dashboard",      icon: <AppstoreOutlined />        },
  "/registrations": { label: "Registrations",  icon: <AuditOutlined />           },
  "/returns":       { label: "Returns",        icon: <RetweetOutlined />         },
  "/remittance":    { label: "Remittance",     icon: <SendOutlined />            },
  "/notices":       { label: "Notices",        icon: <BellFilled />              },
  "/analytics":     { label: "Analytics",      icon: <BarChartOutlined />        },
  "/help":          { label: "Help & Support", icon: <CustomerServiceOutlined /> },
};

// ─── Component ────────────────────────────────────
export default function Header({ sidebarWidth = 210 }: { sidebarWidth?: number }) {
  const { session, logout } = useAuth();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const page = PAGE_MAP[pathname] ?? PAGE_MAP["/dashboard"];

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      disabled: true,
      label: (
        <MenuProfileWrap>
          <MenuUserName>{session?.name}</MenuUserName>
          <MenuUserEmail>{session?.email}</MenuUserEmail>
        </MenuProfileWrap>
      ),
    },
    { type: "divider" },
    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
    { type: "divider" },
    { key: "logout",   icon: <LogoutOutlined />,  label: "Sign out", danger: true, onClick: logout },
  ];

  return (
    <HeaderWrap $left={sidebarWidth}>
      {/* Left — current page icon + name */}
      <PageInfo>
        <PageIconWrap>{page.icon}</PageIconWrap>
        <PageTitle>{page.label}</PageTitle>
      </PageInfo>

      {/* Right — search + bell + avatar */}
      <HeaderActions>
        <HeaderSearch
          prefix={<SearchOutlined style={{ fontSize: 12, color: "#9e9e9e" }} />}
          placeholder="Search by Act"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          allowClear
        />

        <Badge count={3} size="small" offset={[-2, 2]}>
          <BellButton>
            <BellOutlined style={{ fontSize: 16, color: "#475569" }} />
          </BellButton>
        </Badge>

        <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]}>
          <AvatarButton>
            <PrimaryAvatar icon={<UserOutlined style={{ fontSize: 14 }} />} />
          </AvatarButton>
        </Dropdown>
      </HeaderActions>
    </HeaderWrap>
  );
}
