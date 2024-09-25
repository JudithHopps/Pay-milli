import axiosInstance from "./axiosInstance";

// 결제내역 조회
export const PaymentHistory = async (accessToken: string) => {
  const response = await axiosInstance.get("/payment", {
    headers: {
      accessToken,
    },
  });
  return response.data.transactions;
};
