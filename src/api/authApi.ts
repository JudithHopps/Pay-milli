import axiosInstance from "./axiosInstance";
import { SignupFormData, LoginFormData } from "../types/types";

// 회원가입 API
export const signup = async (formData: SignupFormData) => {
  const response = await axiosInstance.post("/user/join", formData);
  return response.data;
};

// 로그인 API
export const login = async (formData: LoginFormData) => {
  const response = await axiosInstance.post<{ accessToken: string }>(
    "/user/login",
    formData,
  );
  return response.data;
};

// 회원 정보 조회 API
export const getUserInfo = async () => {
  const response = await axiosInstance.get("/user/info");
  return response.data;
};
