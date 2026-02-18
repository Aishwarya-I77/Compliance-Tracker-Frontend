// src/app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styled from "styled-components";
import { authApi, ApiError } from "@/lib/apiClient";
import { saveSession, getSession } from "@/lib/auth";
import { LoginRequest } from "@/types/auth";

// ─── Styled Components ────────────────────────────
const Root = styled.div`
  display: flex;
  width: 1280px;
  height: 720px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "DM Sans", "Segoe UI", sans-serif;
  overflow: hidden;
  @media (max-width: 1280px) { width: 100vw; height: 100vh; top: 0; left: 0; transform: none; }
`;

const LeftPanel = styled.div`
  width: 640px;
  height: 720px;
  background: #ffffff;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) { width: 100%; height: auto; }
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 30px;
  top: 26px;
`;

const LogoImg = styled.img`
  width: 161.78px;
  height: 37px;
  object-fit: contain;
`;

const FormArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-center;
  justify-content: flex-start;  /* moved to top */
  padding: 100px 0 0 148px;

  @media (max-width: 768px) {
    padding: 80px 24px 48px;
    align-items: center;
  }
`;


const TitleGroup = styled.div`margin-top: 20px;`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #222222;
  margin: 0;
  line-height: 1;
  text-align: center;
  width: 343px;
`;

const WelcomeSub = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #646464;
  margin: 18px 0 0;
  text-align: center;
  width: 343px;
  line-height: 1.4;
`;

const StyledForm = styled(Form)`
  width: 343px !important;
  margin-top: 30px;

  .ant-form-item-label > label {
    font-size: 14px !important;
    font-weight: 400 !important;
    color: #222222 !important;
    height: auto !important;
  }

  .ant-form-item {
    margin-bottom: 16px !important;
  }
` as typeof Form;

const FieldLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #222222;
`;

const Required = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

const StyledInput = styled(Input)`
  width: 343px !important;
  height: 35px !important;
  border-radius: 6px !important;
  border-color: #e2e8f0 !important;
  background: #ffffff !important;
  font-size: 12px !important;

  .ant-input { font-size: 12px !important; color: #222222 !important; }
  .ant-input::placeholder { font-size: 12px !important; color: #9f9f9f !important; }

  &:hover, &:focus-within {
    border-color: #314f8b !important;
    box-shadow: 0 0 0 2px rgba(49,79,139,0.1) !important;
  }
`;

const StyledInputPassword = styled(Input.Password)`
  width: 343px !important;
  height: 35px !important;
  border-radius: 6px !important;
  border-color: #e2e8f0 !important;
  background: #ffffff !important;
  font-size: 12px !important;

  .ant-input { font-size: 12px !important; color: #222222 !important; }
  .ant-input::placeholder { font-size: 12px !important; color: #9f9f9f !important; }

  &:hover, &:focus-within {
    border-color: #314f8b !important;
    box-shadow: 0 0 0 2px rgba(49,79,139,0.1) !important;
  }
`;

const ForgotWrapper = styled.div`
  width: 343px;
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const ForgotBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #314f8b;
  transition: opacity 0.15s;
  &:hover { opacity: 0.75; text-decoration: underline; }
`;

const SubmitBtn = styled(Button)`
  width: 343px !important;
  height: 47px !important;
  border-radius: 6px !important;
  background: #314f8b !important;
  border: none !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  transition: opacity 0.2s ease !important;
  &:hover { opacity: 0.9 !important; background: #314f8b !important; }
`;

const DividerRow = styled.div`
  display: flex;
  align-items: center;
  width: 343px;
  gap: 10px;
  margin-top: 18px;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`;

const DividerText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #646464;
  white-space: nowrap;
`;

const GoogleBtn = styled.button`
  width: 343px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  margin-top: 18px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 400;
  color: #222222;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:hover { border-color: #314f8b; box-shadow: 0 2px 8px rgba(49,79,139,0.1); }
`;

const GoogleIcon = styled.svg`width: 18px; height: 18px; flex-shrink: 0;`;

const RightPanel = styled.div`
  width: 640px;
  height: 720px;
  background: linear-gradient(180deg, #0f133b 0%, #314f8b 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) { width: 100%; height: auto; min-height: 300px; padding: 48px 24px; }
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 60px 0;
  gap: 20px;
  width: 564px;
`;

const RightTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin: 0;
  line-height: 1.3;
`;

const RightSub = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  margin: 0;
  line-height: 1.5;
  opacity: 0.85;
`;

const CardsWrapper = styled.div`
  position: relative;
  width: 471px;
  height: 380px;
  margin-top: 68px;
  margin-left: -80px;
`;

const CardBack = styled.div`
  position: absolute;
  left: 0; top: 0;
  width: 471px; height: 333px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
`;

const CardFront = styled.div`
  position: absolute;
  right: -70px;
  top: 50px;
  width: 200px; height: 180px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
`;

// ─── Component ────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm<LoginRequest>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (getSession()) router.replace("/dashboard");
  }, [router]);

  const handleLogin = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authApi.login(values);
      saveSession(response);
      messageApi.success(`Welcome back, ${response.name}!`);
      setTimeout(() => router.replace("/dashboard"), 600);
    } catch (err) {
      if (err instanceof ApiError) {
        messageApi.error(err.status === 401 ? "Invalid email or password." : "Something went wrong.");
      } else {
        messageApi.error("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Root>
        {/* ── Left Panel ── */}
        <LeftPanel>
          <LogoWrapper>
            <LogoImg src="/logo.png" alt="AcquantHR" />
          </LogoWrapper>

          <FormArea>
            <TitleGroup>
              <WelcomeTitle>Welcome Back</WelcomeTitle>
              <WelcomeSub>Sign in to access your compliance dashboard</WelcomeSub>
            </TitleGroup>

            <StyledForm form={form} layout="vertical" onFinish={handleLogin} requiredMark={false}>
              <Form.Item
                name="email"
                label={<FieldLabel>Email <Required>*</Required></FieldLabel>}
                rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Enter a valid email" }]}
              >
                <StyledInput placeholder="Enter your Email" autoComplete="email" />
              </Form.Item>

              <Form.Item
                name="password"
                label={<FieldLabel>Password <Required>*</Required></FieldLabel>}
                rules={[{ required: true, message: "Password is required" }]}
              >
                <StyledInputPassword
                  placeholder="Enter your Password"
                  autoComplete="current-password"
                  iconRender={(visible: boolean) =>
                    visible ? <EyeTwoTone twoToneColor="#314f8b" /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <ForgotWrapper>
                <ForgotBtn type="button">Forgot Your Password</ForgotBtn>
              </ForgotWrapper>

              <Form.Item style={{ marginTop: 0, marginBottom: 0, width: 343 }}>
                <SubmitBtn type="primary" htmlType="submit" loading={loading} block>
                  {loading ? "Signing in…" : "Log In"}
                </SubmitBtn>
              </Form.Item>
            </StyledForm>

            <DividerRow>
              <DividerLine /><DividerText>Or Login With</DividerText><DividerLine />
            </DividerRow>

            <GoogleBtn>
              <GoogleIcon viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </GoogleIcon>
              <span>Login With Google</span>
            </GoogleBtn>
          </FormArea>
        </LeftPanel>

        {/* ── Right Panel ── */}
        <RightPanel>
          <RightContent>
            <RightTitle>Stay compliant. Stay confident.</RightTitle>
            <RightSub>Built for modern enterprises managing multi-location compliance.</RightSub>
          </RightContent>
          <CardsWrapper>
            <CardBack />
            <CardFront />
          </CardsWrapper>
        </RightPanel>
      </Root>
    </>
  );
}