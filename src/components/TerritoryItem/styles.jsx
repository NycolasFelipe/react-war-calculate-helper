import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Item = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  width: 98%;
  background: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  padding: 3px 8px;
  font-size: 0.8rem;
  user-select: none;
  transition: width 0.1s ease;

  ${(props) => {
    if (props.deleteItemActive) {
      return `
        &:hover {
          cursor: pointer;
          background: #ca1e1e;
          width: 96%;
          margin: 0 auto;
        }
        &:active {
          transform: scale(1.01);
        }
      `;
    }
    if (props.selected) {
      return `
        width: 88%;
      `;
    }
    if (props.divHeight) {
      return `
        height: ${props.divHeight};
        line-height: 1;
      `;
    }
    if (props.addTerritory) {
      return `
        &:hover {
          cursor: pointer;
          background: #2e8b2e;
          transition: all 0.1s ease;
        }
      `;
    }
  }}
`;

export const ItemSelected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #2e8b2e;
  width: 0%;
  overflow: hidden;
  user-select: none;

  transition: all 0.3s ease;

  ${(props) => {
    if (props.selected) {
      return `
      width: 12%;
    `;
    }
  }};
`;

export const Continent = styled.div`
  color: #fff;
  width: 55%;
  pointer-events: none;

  ${(props) => {
    if (props.hideTerritory) {
      return `
        width: 100%;
      `;
    }
    if (props.selected) {
      return `
        width: 40%;
      `;
    }
  }}
`;

export const Territory = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  color: #fff;
  width: 45%;
  pointer-events: none;

  ${(props) => {
    if (props.hideTerritory) {
      return `
        width: 0;
      `;
    }
    if (props.selected) {
      return `
        width: 35%;
      `;
    }
  }}
`;
