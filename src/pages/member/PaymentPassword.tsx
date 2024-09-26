import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "components/layout/NavBar";
import PaymentPasswordModal from "../../components/modal/PaymentPasswordModal";
import {
  verifyCurrentPassword,
  updatePaymentPassword,
} from "../../api/memberApi";
import { useNavigate } from "react-router-dom";

export default function PaymentPassword() {
  const [isModalOpen, setIsModalOpen] = useState(true); // 페이지 진입 시 모달이 열리도록 true로 설정
  const [step, setStep] = useState(1); // 단계 관리: 1 - 현재 비밀번호, 2 - 새 비밀번호, 3 - 비밀번호 확인
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // 모달에서 비밀번호를 입력받는 핸들러
  const handleSetPassword = async (password: string) => {
    if (step === 1) {
      // 현재 비밀번호 확인 단계
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        // 현재 비밀번호 검증 요청
        await verifyCurrentPassword(accessToken, password);
        alert("현재 비밀번호가 확인되었습니다.");
        setCurrentPassword(password);
        setStep(2); // 다음 단계로 이동
      } catch (error) {
        alert("현재 비밀번호가 일치하지 않습니다.");
        console.error(error);
      }
    } else if (step === 2) {
      // 새 비밀번호 입력 단계
      setNewPassword(password);
      setStep(3); // 다음 단계로 이동
    } else if (step === 3) {
      // 비밀번호 확인 단계
      if (password === newPassword) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
          }

          // 새 비밀번호로 변경 요청
          await updatePaymentPassword(accessToken, newPassword);
          alert("비밀번호가 성공적으로 변경되었습니다.");
          setIsModalOpen(false);
          navigate("/"); // 비밀번호 변경 완료 후 홈으로 이동
        } catch (error) {
          alert("비밀번호 변경에 실패했습니다.");
          console.error(error);
        }
      } else {
        alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
        setStep(2); // 다시 새 비밀번호 입력 단계로 이동
      }
    }
  };

  return (
    <>
      <NavBar />
      <PaymentPasswordContainer>
        <PaymentPasswordTitle>결제 비밀번호 변경</PaymentPasswordTitle>
        {/* 모달을 통해 비밀번호 설정 단계 진행 */}
        {isModalOpen && (
          <PaymentPasswordModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSetPassword}
          />
        )}
      </PaymentPasswordContainer>
    </>
  );
}

const PaymentPasswordContainer = styled.div`
  max-width: 400px;
  margin: 150px auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const PaymentPasswordTitle = styled.h1`
  text-align: center;
  margin: 10px;
  font-size: 24px;
  color: var(--main-color);
`;
