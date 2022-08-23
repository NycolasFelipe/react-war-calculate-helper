import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif !important;
}

body {
    width: 100vw;
    height: 100vh;
    background-color: #05050a;
    overflow-x: hidden;

    &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
    border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      --webkit-box-shadow: inset 0 0 6px #0000004d;
      background-color: #202020;
    }
  }
`;
