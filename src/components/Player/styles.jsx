import styled from "styled-components";

export const ContainerPlayer = styled.div`
  flex-grow: 1;
  flex-basis: 180px;
  height: 300px;
  border-radius: 5px;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid #424242;
  * {
    transition: all 0.2s ease;
  }

  ${(props) => {
    if (!props.playerActive) {
      return `
        * {
          color: #505050 !important;
          pointer-events: none;
        }
        border: 1px solid #505050;
      `;
    }
  }}
`;

export const PlayerHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;

  & > button {
    position: absolute;
    right: -5px;
    font-size: 0.8rem;
    padding-bottom: 15px;
  }
`;

export const PlayerTitle = styled.div`
  display: flex;
  width: 100%;
  color: #fff;
  font-size: 0.8rem;
  pointer-events: none;
  padding-bottom: 2px;
`;

export const Territories = styled.div`
  display: flex;
  width: 100%;
  color: #fff;
  font-size: 0.8em;
  pointer-events: none;
`;

export const DottedLine = styled.div`
  height: 1.2rem;
  flex: 1;
  margin: -6px 6px;
  border-bottom: 2px dotted #424242;
`;

export const PlayerTerritories = styled.div`
  border: 1px solid #424242;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  height: 80%;
  overflow-y: auto;
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
  & > * {
    margin-bottom: 1px;
  }
`;

export const PlayerButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-top: 5px;
  width: 100%;
  height: 18%;
`;
