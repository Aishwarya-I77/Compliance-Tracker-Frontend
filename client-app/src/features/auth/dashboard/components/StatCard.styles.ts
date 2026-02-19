import styled from "styled-components";

export const Card = styled.div<{ $borderColor: string }>`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 20px 18px;
  border-top: 3px solid ${({ $borderColor }) => $borderColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: default;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const CardTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
`;

export const CardIconWrap = styled.div<{ $bg: string; $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const CardValue = styled.p`
  font-size: 36px;
  font-weight: 800;
  color: #1e293b;
  margin: 4px 0 0;
  letter-spacing: -1px;
  line-height: 1;
`;

export const CardSub = styled.p<{ $color: string }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $color }) => $color};
  margin: 0;
`;
