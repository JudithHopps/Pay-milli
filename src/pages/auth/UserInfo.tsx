import styled from "styled-components";
import UserInfoForm from "../../components/auth/UserInfoForm";

export default function UserInfo() {
  return (
    <UserInfoContainer>
      <UserInfoTitle>사용자 정보</UserInfoTitle>
      <UserInfoForm />
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const UserInfoTitle = styled.h1`
  text-align: center;
  margin: 10px;
  font-size: 24px;
  color: #6dcef5;
`;
