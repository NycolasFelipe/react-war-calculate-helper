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
  }
`;
