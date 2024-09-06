import styled from "styled-components";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

function InputField({
  label,
  name,
  type,
  value,
  onChange,
  required,
  placeholder,
}: InputFieldProps) {
  return (
    <InputWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
}

export default InputField;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-size: 15px;
  margin-bottom: 5px;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 13px;
  border: 1px solid #333;
  border-radius: 10px;
  &:focus {
    border-color: #333;
  }
`;
