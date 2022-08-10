import * as C from "./styles";

function Title({ text, titleWidth, fontSize }) {
  return (
    <C.Title titleWidth={titleWidth} fontSize={fontSize}>
      {text}
    </C.Title>
  );
}

export default Title;
