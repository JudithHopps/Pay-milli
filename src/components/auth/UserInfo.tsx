import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/authApi";
import { UserInfoData } from "../../types/types";

import styled from "styled-components";

function UserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        alert("유저정보 가져오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  return (
    userInfo && (
      <UserInfoContainer>
        <Title>사용자 정보</Title>
        <InfoItem>
          <Label>아이디:</Label> {userInfo.userId}
        </InfoItem>
        <InfoItem>
          <Label>이름:</Label> {userInfo.name}
        </InfoItem>
        <InfoItem>
          <Label>이메일:</Label> {userInfo.email}
        </InfoItem>
        <InfoItem>
          <Label>생년월일:</Label> {userInfo.birthday}
        </InfoItem>
        <InfoItem>
          <Label>성별:</Label> {userInfo.gender === "MALE" ? "남성" : "여성"}
        </InfoItem>
        <InfoItem>
          <Label>전화번호:</Label> {userInfo.phone}
        </InfoItem>
      </UserInfoContainer>
    )
  );
}

export default UserInfo;

const UserInfoContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #007bff;
`;
