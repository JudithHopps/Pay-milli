interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required,
}: SelectFieldProps) {
  return (
    <div>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange} required={required}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
