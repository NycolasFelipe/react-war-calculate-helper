import * as C from "./styles";

function CheckBox({ onClick, checked }) {
  return (
    <C.CheckBox type="checkbox" onClick={onClick} defaultChecked={checked} />
  );
}

export default CheckBox;
