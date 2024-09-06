import styled from "styled-components";

interface SubmitButtonProps {
  label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
  return <StyledButton type="submit">{label}</StyledButton>;
}

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6dcef5;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #5bb3dc;
  }
`;
