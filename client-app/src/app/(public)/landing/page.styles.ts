import styled, { css, keyframes } from "styled-components";

const fadeDown = keyframes`from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}`;
const slideLeft = keyframes`from{opacity:0;transform:translateX(-80px)}to{opacity:1;transform:translateX(0)}`;
const slideRight = keyframes`from{opacity:0;transform:translateX(80px)}to{opacity:1;transform:translateX(0)}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}`;

export const Root = styled.div`
  width: 1280px;
  height: 720px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  background: #fff;
  font-family: "DM Sans", "Segoe UI", sans-serif;

  @media (max-width: 1280px) {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    transform: none;
  }
`;

export const BgImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url("/landing-bg.jpeg") center/cover;
  opacity: 0.14;
`;

export const Navbar = styled.nav<{ $animate: boolean }>`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  height: 80px;
  opacity: ${({ $animate }) => ($animate ? "0" : "1")};
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${fadeDown} 0.6s ease forwards;
    `}
`;

export const Logo = styled.img`
  width: 161.78px;
  height: 37px;
  object-fit: contain;
`;

export const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const BaseBtn = styled.button`
  width: 100px;
  height: 43px;

  display: flex;               /* ADD THIS */
  align-items: center;         /* Vertical center */
  justify-content: center;     /* Horizontal center */

  font-family: inherit;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #acadb9;
  transition: all 0.2s ease;

  padding: 0;                  /* REMOVE padding */
`;

export const LoginBtn = styled(BaseBtn)`

  color: #1e293b;
  background: #fff;
  font-weight: 400;

  &:hover {
    border-color: #314f8b;
    color: #314f8b;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 79, 139, 0.15);
  }

  &:active {
    background: #1e293b;
    color: #fff;
    border-color: #1e293b;
    transform: translateY(0);
  }
`;

export const SignupBtn = styled(BaseBtn)`
  color: #fff;
  background: #314f8b;
  font-weight: 400;
  

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 79, 139, 0.35);
  }

  &:active {
    background: #1e293b;
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Hero = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 70px 60px 0;
`;

export const Heading = styled.h1<{ $animate: boolean }>`
  font-size: 64px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.15;
  margin: 0;
  letter-spacing: -1px;
  max-width: 980px;
  opacity: ${({ $animate }) => ($animate ? "0" : "1")};
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${slideLeft} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s
        forwards;
    `}

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Subtext = styled.p<{ $animate: boolean }>`
  font-size: 20px;
  font-weight: 400;
  color: #475569;
  line-height:1;
  margin: 36px 0 0;
  max-width: 820px;
  opacity: ${({ $animate }) => ($animate ? "0" : "1")};
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${slideRight} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.45s
        forwards;
    `}

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const BtnText = styled.span`
  transition: transform 0.2s ease;
`;

export const BtnArrow = styled.span`
  position: absolute;        /* Important */
  right: 24px;               /* Fix arrow position */
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  font-size: 18px;
`;

export const GetStartedBtn = styled.button<{ $animate: boolean }>`
  width: 230px;
  height: 56px;
  margin-top: 36px;
  font-family: inherit;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  background: #314f8b;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  position: relative;        /* Important */
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 4px 16px rgba(49, 79, 139, 0.35);
  opacity: ${({ $animate }) => ($animate ? "0" : "1")};

  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${fadeUp} 0.7s ease 0.7s forwards;
    `}

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 24px rgba(49, 79, 139, 0.5);

    ${BtnText} {
      transform: translateX(-8px);
    }

    ${BtnArrow} {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:active {
    background: #1e293b;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 48px;
    font-size: 16px;
  }
`;
