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

// 카드목록 조회
export const CardList = async (accessToken: string) => {
  const response = await axiosInstance.get("/card", {
    headers: {
      accessToken,
    },
  });
  return response.data;
};
