import styled from "styled-components";

export const ContainerTerritories = styled.div`
  width: 20%;
  min-width: 240px;
  height: 100%;

  @media (max-width: 1050px) {
    width: 30%;
  }
`;

export const TerritoriesContent = styled.div`
  border: 1px solid #424242;
  height: 80%;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

export const TerritoriesTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const AddAlert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #39af4f;
  width: 93%;
  height: 18px;
  position: absolute;
  border-radius: 5px;
  font-size: 0.8rem;
  color: #fff;
  pointer-events: none;

  transform-origin: 50% 0%;
  transition: all 0.2s ease;

  ${(props) => {
    if (props.showAddAlert) {
      return `
        transform: scaleY(1);
      `;
    } else {
      return `
        transform: scaleY(0);
      `;
    }
  }}
`;

export const TerritoriesItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: 6px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 85%;
  border-radius: 5px;
  border: 1px solid #424242;

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
`;

export const TerritoriesAddWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 96%;
  left: 5px;
  bottom: 5px;

  background: #161616;
  position: absolute;
  box-sizing: border-box;
  padding: 4px 6px;
  border-radius: 5px;
  overflow: hidden;

  transform-origin: 50% 100%;
  transition: all 0.2s ease;

  & button {
    margin-top: 5px;
  }

  ${(props) => {
    if (props.addTerritoryWindow) {
      return `
        transform: scaleY(1);
      `;
    } else {
      return `
        transform: scaleY(0);
      `;
    }
  }}
`;

export const InputAlert = styled.div`
  font-size: 0.8rem;
  pointer-events: none;

  ${(props) => {
    if (props.showInputAlert) {
      return `
        display: block;
        color: red;
      `;
    } else {
      return `
        display: none;
      `;
    }
  }}
`;

export const TerritoriesButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  height: 20%;
`;
