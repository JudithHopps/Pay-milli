import React, { useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import PaymentPasswordModal from "../../components/modal/PaymentPasswordModal";
import {
  postVerifyPayPassword,
  putUpdatePayPassword,
} from "../../api/memberApi";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../common/SubmitButton";

export default function PaymentPasswordForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentPasswordToken, setPaymentPasswordToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSetPassword = async (password: string) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (step === 1) {
      try {
        const data = await postVerifyPayPassword(accessToken, password);
        setPaymentPasswordToken(data.paymentPasswordToken);
        setStep(2);
      } catch (error) {
        alert("현재 비밀번호가 일치하지 않습니다.");
        console.error(error);
        setIsModalOpen(false);
      }
    } else if (step === 2) {
      setNewPassword(password);
      setStep(3);
    } else if (step === 3) {
      if (password === newPassword) {
        try {
          await putUpdatePayPassword(
            accessToken,
            paymentPasswordToken,
            newPassword,
          );
          alert("비밀번호가 성공적으로 변경되었습니다.");
          setIsModalOpen(false);
          setPaymentPasswordToken("");
        } catch (error) {
          alert("비밀번호 변경에 실패했습니다.");
          console.error(error);
        }
      } else {
        alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
        setStep(2);
      }
    }
  };

  const handleOpenModal = () => {
    setStep(1);
    setIsModalOpen(true);
  };

  const getModalTitle = () => {
    if (step === 1) return "결제 비밀번호 확인";
    if (step === 2) return "결제 비밀번호 설정";
    return "결제 비밀번호 확인";
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <SubmitButtonContainer>
          <SubmitButton label="결제 비밀번호 변경" onClick={handleOpenModal} />
        </SubmitButtonContainer>
      </form>

      {isModalOpen && (
        <PaymentPasswordModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSetPassword}
          title={getModalTitle()}
        />
      )}
    </>
  );
}

const SubmitButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
