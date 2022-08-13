import styled from "styled-components";

export const Container = styled.div`
  * {
    transition: all 0.2s ease;
    user-select: none;
  }
`;

export const ButtonInfo = styled.p`
  color: #888888;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
  ${(props) => {
    if (props.showInfo) {
      return `
        color: #fff;
      `;
    }
  }}
`;

export const InfoWindow = styled.div`
  background: transparent;
  width: 100%;
  position: absolute;
  right: 0;
  top: 30px;
  overflow: hidden;
  color: transparent;
  font-size: 0.8rem;
  padding: 3px 6px;
  border-radius: 5px;
  pointer-events: none;
  * {
    transition: background 0.2s ease;
  }

  ${(props) => {
    if (props.showInfo) {
      return `
        background: #181818;
        color: #fff;
      `;
    }
  }}
`;

export const InfoText = styled.div`
  white-space: pre-line;
`;
