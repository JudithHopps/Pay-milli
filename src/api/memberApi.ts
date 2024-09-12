import axiosInstance from "./axiosInstance";
import { SignupFormData, LoginFormData } from "../types/memberTypes";

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
