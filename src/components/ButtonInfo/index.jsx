import { useState } from "react";
import * as C from "./styles";

function ButtonInfo({ text }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <C.Container>
      <C.InfoWindow showInfo={showInfo}>
        <C.InfoText>{text}</C.InfoText>
      </C.InfoWindow>
      <C.ButtonInfo onClick={() => setShowInfo(!showInfo)} showInfo={showInfo}>
        ?
      </C.ButtonInfo>
    </C.Container>
  );
}

export default ButtonInfo;
