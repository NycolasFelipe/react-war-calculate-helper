import * as C from "./styles";

function Select({ text, value, label, options, onChange }) {
  return (
    <C.Label htmlFor={label}>
      {text}
      <C.Select id={label} value={value} onChange={onChange}>
        {options.map((item, index) => (
          <option key={index} value={item[1]}>
            {item[0]}
          </option>
        ))}
      </C.Select>
    </C.Label>
  );
}

export default Select;
