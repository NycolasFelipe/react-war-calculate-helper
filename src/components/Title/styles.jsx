import styled from "styled-components";

export const Title = styled.h1`
  color: #fff;
  font-size: 0.8rem;
  font-weight: lighter;
  width: 50%;
  pointer-events: none;

  ${(props) => {
    if (props.titleWidth) {
      return `
        width: ${props.titleWidth}
      `;
    }
    if (props.fontSize) {
      return `
        font-size: ${props.fontSize}
      `;
    }
  }}
`;
