import * as C from "./styles";

function Input({
  text,
  label,
  value,
  defaultValue,
  placeholder,
  alignCenter,
  onChange,
  readOnly,
  maxLength,
  borderRadius,
  inputWidth,
  lockValue,
  type,
  paddingleft = "5px",
}) {
  return (
    <C.Label htmlFor={label}>
      {text}
      <C.Input
        id={label}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        alignCenter={alignCenter}
        onChange={onChange}
        readOnly={readOnly}
        maxLength={maxLength}
        borderRadius={borderRadius}
        inputWidth={inputWidth}
        lockValue={lockValue}
        type={type}
        paddingleft={paddingleft}
      />
    </C.Label>
  );
}

export default Input;
