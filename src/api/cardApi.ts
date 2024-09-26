import axiosInstance from "./axiosInstance";
import { AddCardFormData } from "../types/card/cardTypes";

// 결제내역 조회
export const getPaymentHistoryAPI = async (accessToken: string) => {
  const response = await axiosInstance.get("/payment", {
    headers: {
      accessToken,
    },
  });
  return response.data.transactions;
};

// 결제내역 세부조회

// 카드목록 조회
export const getCardListAPI = async (accessToken: string) => {
  const response = await axiosInstance.get("/card", {
    headers: {
      accessToken,
    },
  });
  return response.data;
};

// 카드등록
export const addCardAPI = async (
  accessToken: string,
  formData: AddCardFormData,
) => {
  const response = await axiosInstance.post("/card", formData, {
    headers: {
      accessToken,
    },
  });
  return response.data;
};

// 카드삭제
export const deleteCardAPI = async (accessToken: string, cardId: string) => {
  const response = await axiosInstance.delete("/card", {
    headers: {
      accessToken,
    },
    data: {
      cardId,
    },
  });
  return response.data;
};
