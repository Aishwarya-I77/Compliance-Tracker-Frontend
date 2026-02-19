// src/app/landing/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Root,
  BgImage,
  Navbar,
  Logo,
  NavButtons,
  LoginBtn,
  SignupBtn,
  Hero,
  Heading,
  Subtext,
  GetStartedBtn,
  BtnText,
  BtnArrow,
} from "./page.styles";

export default function LandingPage() {
  const router = useRouter();

  // ← Key fix: start false, only animate after client mounts
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <Root>
      <BgImage />
      <Navbar $animate={animate}>
        <Logo src="/logo.png" alt="AcquantHR" />
        <NavButtons>
          <LoginBtn onClick={() => router.push("/login")}>Login</LoginBtn>
          <SignupBtn onClick={() => router.push("/login")}>Sign Up</SignupBtn>
        </NavButtons>
      </Navbar>
      <Hero>
        <Heading $animate={animate}>
          Compliance Management<br />Platform For Modern Enterprises
        </Heading>
        <Subtext $animate={animate}>
          Track, monitor, and manage regulatory compliance across your
          organization, states, and branches from a single unified platform.
        </Subtext>
        <GetStartedBtn $animate={animate} onClick={() => router.push("/login")}>
          <BtnText>Get Started</BtnText>
          <BtnArrow>→</BtnArrow>
        </GetStartedBtn>
      </Hero>
    </Root>
  );
}
