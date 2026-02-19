import styled from "styled-components";

export const Root = styled.div`
  font-family: "DM Sans", "Segoe UI", sans-serif;
`;

export const WelcomeTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 28px;
  letter-spacing: -0.3px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
