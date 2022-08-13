import styled from "styled-components";

export const Button = styled.button`
  width: ${(props) => props.buttonWidth};
  height: ${(props) => props.buttonHeight};
  border: 1px solid ${(props) => props.buttonBorderColor};
  background: transparent;
  border-radius: 5px;
  font-size: ${(props) => props.fontSize};
  line-height: 1;
  color: ${(props) => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  padding: ${(props) => props.padding};

  &:hover {
    background: ${(props) => props.buttonBgColor};
    border: 1px solid ${(props) => props.buttonBgColor};
    transition: background 0.2s ease;
  }

  &:active {
    transform: scale(1.01);
  }

  ${(props) => {
    if (props.disabled) {
      return `
        border: 1px solid #424242;
        color: #424242;
        pointer-events: none;
      `;
    }
  }}
`;
