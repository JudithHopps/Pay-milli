import React from "react";
import { deleteMemberAPI } from "../../api/memberApi";
import SubmitButton from "../common/SubmitButton";
import { useNavigate } from "react-router-dom";

export default function DeleteMemberForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (!window.confirm("정말로 회원 탈퇴를 진행하시겠습니까?")) {
      return;
    }

    try {
      await deleteMemberAPI(accessToken);
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("회원탈퇴 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton label="회원탈퇴" />
    </form>
  );
}
