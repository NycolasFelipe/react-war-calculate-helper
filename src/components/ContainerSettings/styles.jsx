import styled from "styled-components";

export const ContainerSettings = styled.div`
  display: flex;
  gap: 10px;
  width: 70%;
  height: 100%;
`;

//#region Territories Settings
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
//#endregion

//#region Bonus Settings
export const ContainerBonus = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
  width: 50%;
  min-width: 360px;
  height: 100%;
  background: transparent;
  border: 1px solid #424242;
  border-radius: 5px;
  padding: 5px 10px;
  position: relative;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 0.8rem;
  pointer-events: none;
  width: 75%;
`;

export const SaveSettingWarning = styled.span`
  font-size: 0.8rem;
  color: transparent;
  position: absolute;
  right: 130px;
  top: 10px;
  text-align: right;
  user-select: none;

  ${(props) => {
    if (props.saveSettingsWarning) {
      return `
        color: #ca1e1e;
      `;
    }
  }}
`;

export const ButtonSaveSettings = styled.div`
  position: absolute;
  right: 5px;
  top: 8px;
  width: 120px;
`;

export const BonusSettings = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  width: 100%;
  height: 45%;
`;

export const BonusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 15%;
  padding-right: 3px;
  position: relative;
`;

export const BonusContinent = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  height: 100%;
  margin-right: 5px;
`;

export const TerritoryItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid transparent;
  height: 85%;
`;

export const BonusMin = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 30%;
  * {
    transition: all 0.2s ease;
  }
`;

export const BonusMinLeft = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 3px;
  width: 45%;
  ${(props) => {
    if (!props.minBonusActive) {
      return `
        * {
          color: #505050 !important;
          pointer-events: none;
        }
      `;
    }
  }}
`;

export const BonusMinRight = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 3px;
  width: 45%;
  ${(props) => {
    if (!props.minBonusActive) {
      return `
        * {
          color: #505050 !important;
          pointer-events: none;
        }
      `;
    }
  }}
`;

export const BonusTotal = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 33%;
  * {
    transition: all 0.2s ease;
  }
`;

export const BonusTotalLeft = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 3px;
  width: 45%;
`;

export const BonusTotalRight = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 3px;
  width: 45%;
`;
//#endregion
