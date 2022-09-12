import * as C from './styles';

function CheckBox({ onClick, checked, id }) {
  return (
    <C.CheckBox
      type='checkbox'
      onClick={onClick}
      defaultChecked={checked}
      id={id}
    />
  );
}

export default CheckBox;
