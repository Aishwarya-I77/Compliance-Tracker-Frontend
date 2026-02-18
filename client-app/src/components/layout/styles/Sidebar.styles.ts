// src/components/layout/styles/Sidebar.styles.ts
// ─── All Sidebar styled components in one place ──────────────────

import styled from "styled-components";
import { Layout } from "antd";
import { colors, fonts, sizes, transitions } from "@/styles/theme";

export const SidebarWrap = styled(Layout.Sider)<{ $collapsed: boolean }>`
  && {
    width: ${({ $collapsed }) =>
      $collapsed ? `${sizes.sidebarCollapsed}px` : `${sizes.sidebarExpanded}px`} !important;
    min-width: unset !important;
    max-width: unset !important;
    height: 100vh;
    background: ${colors.sidebarBg} !important;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow: hidden;
    transition: width ${transitions.normal} !important;
    display: flex;
    flex-direction: column;
    font-family: ${fonts.family};
  }
`;

export const LogoArea = styled.div<{ $collapsed: boolean }>`
  height: ${sizes.headerHeight}px;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  padding: ${({ $collapsed }) => ($collapsed ? "0" : `0 16px`)};
  border-bottom: 1px solid ${colors.sidebarStroke};
  flex-shrink: 0;
`;

export const LogoImg = styled.img`
  width: ${sizes.logoWidth}px;
  height: ${sizes.logoHeight}px;
  object-fit: contain;
  object-position: left;
`;

export const LogoLetter = styled.span`
  font-size: 22px;
  font-weight: ${fonts.weightBlack};
  color: ${colors.sidebarAccent};
  letter-spacing: -1px;
  line-height: 1;
  font-family: ${fonts.family};
`;

export const NavWrap = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 12px 0;
  gap: 4px;
  overflow: hidden;
`;

export const NavGroupGap = styled.div`
  height: ${sizes.navGap}px;
  flex-shrink: 0;
`;

export const NavItem = styled.div<{ $active: boolean; $locked: boolean }>`
  position: relative;
  width: 100%;
  height: ${sizes.navItemHeight}px;
  display: flex;
  align-items: center;
  cursor: ${({ $locked }) => ($locked ? "default" : "pointer")};
  background: ${({ $active }) => ($active ? colors.sidebarActive : "transparent")};
  transition: background ${transitions.fast};

  /* Blue left accent on active item */
  &::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: ${({ $active }) => ($active ? "4px" : "0")};
    background: ${colors.sidebarAccent};
    border-radius: 0 2px 2px 0;
    transition: width 0.2s ease;
  }

  &:hover {
    ${({ $active, $locked }) =>
      !$active && !$locked && `background: rgba(255,255,255,0.06);`}
  }
`;

export const NavInner = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${({ $collapsed }) =>
    $collapsed ? `0 0 0 20px` : `0 10px 0 ${sizes.navPaddingLeft}px`};
  width: 100%;
  overflow: hidden;
`;

export const NavIcon = styled.span<{ $active: boolean; $locked: boolean }>`
  font-size: ${sizes.navIconSize}px;
  width: ${sizes.navIconSize}px;
  height: ${sizes.navIconSize}px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, $locked }) =>
    $active  ? colors.white :
    $locked  ? colors.sidebarLocked :
               colors.sidebarText};
  opacity: ${({ $locked }) => ($locked ? 0.6 : 1)};
  transition: color ${transitions.fast};
`;

export const NavLabel = styled.span<{ $active: boolean; $locked: boolean }>`
  font-size: ${fonts.sizeMd};
  font-weight: ${({ $active }) => ($active ? fonts.weightSemibold : fonts.weightRegular)};
  color: ${({ $active, $locked }) =>
    $active  ? colors.white :
    $locked  ? colors.sidebarLocked :
               colors.sidebarText};
  opacity: ${({ $locked }) => ($locked ? 0.6 : 1)};
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
  transition: color ${transitions.fast};
`;

export const LockIcon = styled.span`
  font-size: ${fonts.sizeXs};
  color: ${colors.sidebarLocked};
  opacity: 0.6;
  padding-right: 10px;
  flex-shrink: 0;
`;

export const BottomDivider = styled.div`
  height: 1px;
  background: ${colors.sidebarStroke};
  flex-shrink: 0;
`;

export const CollapseBtn = styled.button<{ $collapsed: boolean }>`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  padding: ${({ $collapsed }) =>
    $collapsed ? "0" : `0 0 0 ${sizes.navPaddingLeft}px`};
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.sidebarIcon};
  font-size: 21px;
  flex-shrink: 0;
  transition: color ${transitions.fast};
  &:hover { color: ${colors.white}; }
`;