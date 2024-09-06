import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/authApi";
import { UserInfoData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function UserInfoForm() {
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        const data = await getUserInfo(accessToken);
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        // alert("유저정보 가져오기 실패");

        setUserInfo({
          userId: "gilddong",
          name: "홍길동",
          email: "gilddong@example.com",
          birthday: "1990-01-01",
          gender: "MALE",
          phone: "010-1234-5678",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  return (
    userInfo && (
      <FormContainer>
        <InfoItem>
          <Label>이름</Label> {userInfo.name} (
          {userInfo.gender === "MALE" ? "남" : "여"})
        </InfoItem>
        <InfoItem>
          <Label>생년월일</Label> {userInfo.birthday}
        </InfoItem>
        <InfoItem>
          <Label>아이디</Label> {userInfo.userId}
        </InfoItem>
        <InfoItem>
          <Label>이메일</Label> {userInfo.email}
        </InfoItem>
        <InfoItem>
          <Label>전화번호</Label> {userInfo.phone}
        </InfoItem>
      </FormContainer>
    )
  );
}

export default UserInfoForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: auto;
  padding: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  color: #333;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #6dcef5;
  font-size: 18px;
`;
