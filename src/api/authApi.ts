import axiosInstance from "./axiosInstance";

// 회원가입 API
export const signup = async (formData: {
  userId: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
  phone: string;
  paymentPassword: string;
}) => {
  const response = await axiosInstance.post("/user/join", formData);
  return response.data;
};

// 로그인 API
export const login = async (formData: { userId: string; password: string }) => {
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
