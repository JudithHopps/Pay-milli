import styled from "styled-components";
import MemberInfoForm from "../../components/member/MemberInfoForm";
import NavBar from "components/layout/NavBar";

export default function MemberInfo() {
  return (
    <>
      <NavBar />
      <MemberInfoContainer>
        <MemberInfoTitle>사용자 정보</MemberInfoTitle>
        <MemberInfoForm />
      </MemberInfoContainer>
    </>
  );
}

const MemberInfoContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const MemberInfoTitle = styled.h1`
  text-align: center;
  margin: 10px;
  font-size: 24px;
  color: var(--main-color);
`;
