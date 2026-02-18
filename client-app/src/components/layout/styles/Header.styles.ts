// src/components/layout/styles/Header.styles.ts
// ─── All Header styled components in one place ───────────────────

import styled from "styled-components";
import { Layout } from "antd";
import { colors, fonts, sizes, transitions } from "@/styles/theme";
import { SearchInput, IconButton, CircleButton, PrimaryAvatar, PageTitle } from "@/styles/shared";

export const HeaderWrap = styled(Layout.Header)<{ $left: number }>`
  && {
    height: ${sizes.headerHeight}px;
    line-height: ${sizes.headerHeight}px;
    background: ${colors.white};
    border-bottom: 1px solid ${colors.border};
    box-shadow: 0 1px 4px ${colors.shadow};
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 16px;
    position: fixed;
    top: 0;
    left: ${({ $left }) => $left}px;
    right: 0;
    z-index: 99;
    font-family: ${fonts.family};
    transition: left ${transitions.normal};
  }
`;

export const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

export const PageIconWrap = styled.span`
  font-size: ${sizes.navIconSize}px;
  color: ${colors.textPrimary};
  display: flex;
  align-items: center;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const MenuProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 2px 0;
  pointer-events: none;
`;

export const MenuUserName  = styled.span`
  font-size: ${fonts.sizeMd};
  font-weight: ${fonts.weightSemibold};
  color: ${colors.textPrimary};
`;

export const MenuUserEmail = styled.span`
  font-size: ${fonts.sizeSm};
  color: ${colors.textMuted};
`;

// Re-export shared components with header-specific aliases
export { SearchInput as HeaderSearch, IconButton as BellButton, CircleButton as AvatarButton, PrimaryAvatar, PageTitle };