import axiosInstance from "./axiosInstance";
import {
  SignupFormData,
  LoginFormData,
  MemberInfoData,
} from "../types/memberTypes";

// 회원가입 API
export const signup = async (formData: SignupFormData) => {
  const response = await axiosInstance.post("/member/join", formData);
  return response.data;
};

// 로그인 API
export const login = async (formData: LoginFormData) => {
  const response = await axiosInstance.post<{ accessToken: string }>(
    "/member/login",
    formData,
  );
  return response.data;
};

// 로그아웃 API
export const logout = async (accessToken: string) => {
  const response = await axiosInstance.post(
    "/member/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

// 회원 정보 조회 API
export const getMemberInfo = async (accessToken: string) => {
  const response = await axiosInstance.get("/member/info", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 토큰 재발급 API
export const refreshToken = async (accessToken: string) => {
  const response = await axiosInstance.post(
    "/member/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

// 회원 탈퇴 API
export const deleteMember = async (accessToken: string) => {
  const response = await axiosInstance.delete("/member", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 회원 정보 변경 API
export const updateMemberInfo = async (
  accessToken: string,
  formData: Partial<MemberInfoData>,
) => {
  const response = await axiosInstance.put("/member", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 결제 비밀번호 변경 API
export const updatePaymentPassword = async (
  accessToken: string,
  paymentPassword: string,
) => {
  const response = await axiosInstance.put(
    "/member/payment/password",
    { paymentPassword },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
