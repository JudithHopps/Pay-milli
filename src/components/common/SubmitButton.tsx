import styled from "styled-components";

interface SubmitButtonProps {
  label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
  return <StyledButton type="submit">{label}</StyledButton>;
}

const StyledButton = styled.button`
  padding: 10px;
  font-size: 15px;
  color: white;
  background-color: #222;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;
