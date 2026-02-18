// src/styles/shared.ts
// ─── Reusable styled primitives ─────────────────────────────────
// Import individual pieces wherever needed

import styled from "styled-components";
import { Layout, Input, Avatar, Button } from "antd";
import { colors, fonts, transitions } from "./theme";

// ── Typography ───────────────────────────────────────────────────
export const PageTitle = styled.h2`
  font-size: ${fonts.sizeLg};
  font-weight: ${fonts.weightSemibold};
  color: ${colors.textPrimary};
  margin: 0;
  white-space: nowrap;
  font-family: ${fonts.family};
`;

export const Label = styled.span`
  font-size: ${fonts.sizeMd};
  font-weight: ${fonts.weightRegular};
  color: ${colors.textPrimary};
  font-family: ${fonts.family};
`;

export const MutedText = styled.span`
  font-size: ${fonts.sizeSm};
  color: ${colors.textMuted};
  font-family: ${fonts.family};
`;

// ── Layout primitives ────────────────────────────────────────────
export const AppContent = styled(Layout.Content)<{ $left: number }>`
  margin-left: ${({ $left }) => $left}px;
  margin-top: ${53}px;
  padding: 28px 32px;
  min-height: calc(100vh - 53px);
  background: ${colors.appBg};
  transition: margin-left ${transitions.normal};
  font-family: ${fonts.family};
`;

// ── Form inputs ──────────────────────────────────────────────────
export const SearchInput = styled(Input)`
  width: 200px !important;
  height: 28px !important;
  border-radius: 6px !important;
  border-color: #e0e0e0 !important;
  background: #f8fafc !important;
  font-size: ${fonts.sizeSm} !important;

  .ant-input {
    font-size: ${fonts.sizeSm} !important;
    color: #9e9e9e;
    background: transparent !important;
  }
  .ant-input::placeholder {
    color: ${colors.textPlaceholder} !important;
  }
  &:hover { border-color: ${colors.primary} !important; }
  &:focus-within {
    border-color: ${colors.primary} !important;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.1) !important;
  }
`;

// ── Buttons ──────────────────────────────────────────────────────
export const IconButton = styled.button`
  width: 32px;
  height: 33px;
  border-radius: 6px;
  border: 1px solid ${colors.border};
  background: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all ${transitions.fast};
  &:hover { background: #eff6ff; border-color: ${colors.primary}; }
`;

export const CircleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50%;
  transition: opacity ${transitions.fast};
  &:hover { opacity: 0.85; }
`;

export const PrimaryAvatar = styled(Avatar)`
  width: 28px !important;
  height: 27px !important;
  line-height: 27px !important;
  background: ${colors.primary} !important;
`;

// ── Cards ────────────────────────────────────────────────────────
export const StatCard = styled.div<{ $borderColor: string }>`
  background: ${colors.white};
  border-radius: 12px;
  padding: 20px 20px 18px;
  border-top: 3px solid ${({ $borderColor }) => $borderColor};
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow ${transitions.fast}, transform ${transitions.fast};
  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;