import styled from "styled-components";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
}

export default function SubmitButton({ label, onClick }: SubmitButtonProps) {
  return (
    <StyledButton type="submit" onClick={onClick}>
      {label}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: var(--main-color);
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: var(--hover-color);
  }
`;
