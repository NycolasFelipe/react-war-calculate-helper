import styled from "styled-components";

export const Input = styled.input`
  color: #fff;
  font-weight: lighter;
  font-size: 0.9rem;
  width: 100%;
  border-radius: 5px;
  border: none;
  background: #313131;
  padding-left: 5px;

  ${(props) => {
    if (props.alignCenter) {
      return `
        text-align: center;
        padding-left: 0;
        `;
    }
  }}
  ${(props) => {
    if (props.borderRadius) {
      return `
          border-radius: ${props.borderRadius};
      `;
    }
  }}
  ${(props) => {
    if (props.lockValue) {
      return `
        color: #a1a1a1;
        pointer-events: none;
      `;
    }
  }}
  ${(props) => {
    if (props.inputWidth) {
      return `
        width: ${props.inputWidth}
      `;
    }
  }}
`;

export const Label = styled.label`
  color: #ccc;
  width: 100%;
  font-size: 0.8rem;
  line-height: 1.5;
`;
