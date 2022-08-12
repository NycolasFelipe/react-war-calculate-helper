import { useContext, useState } from "react";
import DataContext from "../../contexts/DataContext";
import * as C from "./styles";
import Title from "../Title";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import CheckBox from "../CheckBox";
import ButtonInfo from "../ButtonInfo";
import TerritoryItem from "../TerritoryItem";

function ContainerSettings() {
  //#region Territories Settings
  //Get territories list
  const { territories } = useContext(DataContext);
  const [territoriesList, setTerritoriesList] = useState(
    territories.territoriesList
  );

  //Flag for Add Territory Window
  const [addTerritoryWindow, setAddTerritoryWindow] = useState(false);

  //#region Alerts and related
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showInputAlert, setShowInputAlert] = useState(false);
  const [inputAlertText, setInputAlertText] = useState("");

  const inputAlert = (text) => {
    setInputAlertText(text);
    // Exibe alerta de erro
    setShowInputAlert(true);
    // Depois de um tempo, esconde o alerta novamente
    setTimeout(() => setShowInputAlert(false), 5000);
  };

  //Delete is active at the current moment
  const [deleteItemActive, setDeleteItemActive] = useState(false);

  //Delete territory
  const deleteTerritory = (territory, continent) => {
    if (deleteItemActive) {
      territories.deleteTerritory(territory);
      //Update territories list
      setTerritoriesList(territories.territoriesList);
      setBonusSettings(continent);
    }
  };
  //#endregion

  //#region Add Territory
  const [territoryName, setTerritoryName] = useState("");
  const [territoryContinent, setTerritoryContinent] = useState("Africa");
  const addTerritory = (territory, continent) => {
    const error = territories.addTerritory(territory, continent);
    setTerritoryName("");

    //Caso tenha havido um erro, exibe uma mensagem
    if (error) {
      inputAlert(error);
    }
    //Caso a adição tenha sucesso, exibe uma mensagem
    else if (!error) {
      //Exibe confirmação de que o território foi adicionado
      setShowAddAlert(true);
      //Depois de um tempo, esconde o alerta novamente
      setTimeout(() => setShowAddAlert(false), 3000);
      setBonusSettings(territoryContinent);
    }
  };
  //#endregion
  //#endregion

  //#region Bonus Settings
  const { settings } = useContext(DataContext);

  const setBonusSettings = (territoryContinent) => {
    let totalValue = territories.territoriesList.filter((item) => {
      if (item.continent === territoryContinent) return item;
    }).length;

    settings.setTotalValue(territoryContinent, totalValue);
    setTotalBonus(settings.getTotalBonus());
  };

  //Min Bonus Settings
  const [minBonus, setMinBonus] = useState(settings.getMinBonus());
  const [minBonusActive, setMinBonusActive] = useState(
    settings.minBonusActive()
  );

  //Total Bonus Settings
  const [totalBonus, setTotalBonus] = useState(settings.getTotalBonus());

  //#region Input Item model
  const inputItem = (type, subtype, index, text) => {
    if (type === "totalBonus") {
      if (subtype === "value") {
        return (
          <Input
            value={totalBonus[index].value}
            readOnly={true}
            text={text}
            type={"number"}
            lockValue={true}
            borderRadius={"0"}
          />
        );
      } else if (subtype === "bonus") {
        return (
          <Input
            defaultValue={totalBonus[index].bonus}
            text={text}
            type={"number"}
            borderRadius={"0"}
            onChange={(e) =>
              changeBonus(
                "totalBonus",
                totalBonus[index].continent,
                e.target.value
              )
            }
          />
        );
      }
    } else if (type === "minBonus") {
      return (
        <Input
          defaultValue={minBonus[index][subtype]}
          text={text}
          type={"number"}
          borderRadius={"0"}
          onChange={(e) =>
            changeBonus(
              type,
              minBonus[index].continent,
              e.target.value,
              subtype
            )
          }
        />
      );
    }
  };
  //#endregion

  //Territory item
  const territoryItem = (continent) => {
    return (
      <TerritoryItem
        divHeight={"19px"}
        hideTerritory={true}
        continent={continent}
      />
    );
  };

  //Changing input values
  const changeBonus = (type, continent, input, subtype) => {
    const inputValue = input ? parseInt(input) : "";
    if (type === "totalBonus") {
      for (let item in totalBonus) {
        if (totalBonus[item].continent === continent) {
          totalBonus[item].bonus = inputValue;
        }
      }
    }
    if (type === "minBonus") {
      for (let item in minBonus) {
        if (minBonus[item].continent === continent) {
          minBonus[item][subtype] = inputValue;
        }
      }
    }
    setSaveSettingsActive(true);
  };

  //Settings button and warning flags
  const [saveSettingsActive, setSaveSettingsActive] = useState(false);
  const [saveSettingsWarning, setSaveSettingsWarning] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");
  const warningMessages = {
    fieldEmpty: "Field cannot be empty.",
    negativeValue: "Value cannot be negative.",
    invalidMinBonus: "Min bonus cannot be greater than total bonus.",
  };

  const handleWarning = (warningType) => {
    setWarningMessage(warningMessages[warningType]);
    setSaveSettingsWarning(true);
    setTimeout(() => {
      setSaveSettingsWarning(false);
    }, 5000);
  };

  //Checking if data is valid before saving it
  const checkValidSettings = () => {
    for (let item in totalBonus) {
      if (totalBonus[item]["bonus"] === "") {
        handleWarning("fieldEmpty");
        return false;
      } else if (totalBonus[item]["bonus"] < 0) {
        handleWarning("negativeValue");
        return false;
      }
    }
    if (minBonusActive) {
      for (let item in minBonus) {
        if (minBonus[item]["value"] === "" || minBonus[item]["bonus"] === "") {
          handleWarning("fieldEmpty");
          return false;
        } else if (minBonus[item]["value"] > totalBonus[item]["value"]) {
          handleWarning("invalidMinBonus");
          return false;
        } else if (minBonus[item]["value"] < 0) {
          handleWarning("negativeValue");
          return false;
        }
        if (minBonus[item]["bonus"] < 0) {
          handleWarning("negativeValue");
          return false;
        }
      }
    }
    return true;
  };

  //Saving user changes
  const saveSettings = () => {
    //Save Settings if provided valid data
    if (checkValidSettings()) {
      settings.setMinBonusActive(minBonusActive);
      settings.setBonus(minBonus, totalBonus);
      setMinBonus(settings.getMinBonus());
      setSaveSettingsActive(false);
      setSaveSettingsWarning(false);
    }
  };
  //#endregion

  //#region Players
  const { players } = useContext(DataContext);
  const [playersList, setPlayersList] = useState(players.getPlayers());

  const [editActive, setEditActive] = useState(true);

  const playerItem = (playerId) => {
    const player = players.getPlayer(playerId);
    return (
      <C.Player editActive={editActive} playerActive={player.active}>
        <CheckBox
          onClick={() => changePlayerActive(playerId)}
          checked={player.active}
        />
        <Title text={`Player ${playerId.slice(-1)}`} />
        <Input
          defaultValue={player.playerName}
          placeholder={"Player name..."}
          borderRadius={"0"}
        />
      </C.Player>
    );
  };

  const changePlayerActive = (playerId) => {
    setPlayersList(
      playersList.filter((item) => {
        if (item.playerId === playerId) {
          item.active = !item.active;
          return item;
        } else return item;
      })
    );
  };

  const savePlayers = () => {
    players.setPlayers(playersList);
    setEditActive(!editActive);
  };
  //#endregion

  return (
    <C.ContainerSettings>
      <C.ContainerTerritories>
        <C.TerritoriesContent>
          <C.AddAlert showAddAlert={showAddAlert}>Territory Added!</C.AddAlert>
          <C.TerritoriesTitle>
            <Title
              text={`Available Territories | Count: ${territoriesList.length}`}
              titleWidth={"100%"}
            />
            <Title text={"Continent"} />
            <Title text={"| Territory"} />
          </C.TerritoriesTitle>
          <C.TerritoriesItems>
            {territoriesList.map((item, index) => (
              <TerritoryItem
                key={index}
                continent={item.continent}
                territory={item.territory}
                deleteItemActive={deleteItemActive}
                onClick={() => deleteTerritory(item.territory, item.continent)}
              />
            ))}
          </C.TerritoriesItems>
          <C.TerritoriesAddWindow addTerritoryWindow={addTerritoryWindow}>
            <C.InputAlert showInputAlert={showInputAlert}>
              {inputAlertText}
            </C.InputAlert>
            <Input
              label={"labelAddTerritoryName"}
              text={"Territory's Name"}
              placeholder={"Ex.: Canada"}
              value={territoryName}
              onChange={(e) => setTerritoryName(e.target.value)}
            />
            <Select
              label={"labelAddTerritoryContinent"}
              text={"Continent"}
              options={[
                ["Africa", "africa"],
                ["Asia", "asia"],
                ["Europe", "europe"],
                ["North America", "northAmerica"],
                ["Oceania", "oceania"],
                ["South America", "southAmerica"],
              ]}
              onChange={(e) =>
                setTerritoryContinent(
                  e.target.options[e.target.selectedIndex].text
                )
              }
            />
            <Button
              text={"Add"}
              buttonBgColor={"#228be6"}
              buttonWidth={"100%"}
              buttonHeight={"1.6rem"}
              onClick={() => addTerritory(territoryName, territoryContinent)}
            />
          </C.TerritoriesAddWindow>
        </C.TerritoriesContent>
        <C.TerritoriesButtons>
          <Button
            text={addTerritoryWindow ? "Finish" : "Add Territory"}
            buttonBgColor={"#2e8b2e"}
            buttonWidth={"100%"}
            disabled={deleteItemActive}
            onClick={() => setAddTerritoryWindow(!addTerritoryWindow)}
          />
          <Button
            text={deleteItemActive ? "Cancel" : "Delete Item"}
            buttonBgColor={"#ca1e1e"}
            buttonWidth={"100%"}
            disabled={addTerritoryWindow}
            onClick={() => setDeleteItemActive(!deleteItemActive)}
          />
        </C.TerritoriesButtons>
      </C.ContainerTerritories>
      <C.ContainerBonus>
        <Title text={"Game Settings"} fontSize={"1rem"} />
        <C.SaveSettingWarning saveSettingsWarning={saveSettingsWarning}>
          {warningMessage}
        </C.SaveSettingWarning>
        <C.ButtonSaveSettings>
          <Button
            text={saveSettingsActive ? "Save Settings*" : "Save Settings"}
            fontSize={"0.8rem"}
            buttonHeight="20px"
            buttonBgColor="#2e8b2e"
            disabled={!saveSettingsActive}
            onClick={() => saveSettings()}
          />
        </C.ButtonSaveSettings>
        <C.BonusSettings>
          <C.BonusContinent>
            <C.BonusHeader>
              <C.Title>Continent</C.Title>
            </C.BonusHeader>
            <C.TerritoryItems>
              {territoryItem("Africa")}
              {territoryItem("Asia")}
              {territoryItem("Europe")}
              {territoryItem("North America")}
              {territoryItem("Oceania")}
              {territoryItem("South America")}
            </C.TerritoryItems>
          </C.BonusContinent>
          <C.BonusMin>
            <C.BonusHeader>
              <C.Title>Min. Bonus</C.Title>
              <CheckBox
                onClick={() => [
                  setMinBonusActive(!minBonusActive),
                  setSaveSettingsActive(true),
                ]}
              />
              <ButtonInfo
                text={
                  "Minimum of territories on a continent to receive additional troops."
                }
              />
            </C.BonusHeader>
            <C.BonusMinLeft minBonusActive={minBonusActive}>
              {inputItem("minBonus", "value", 0, "Min.")}
              {inputItem("minBonus", "value", 1)}
              {inputItem("minBonus", "value", 2)}
              {inputItem("minBonus", "value", 3)}
              {inputItem("minBonus", "value", 4)}
              {inputItem("minBonus", "value", 5)}
            </C.BonusMinLeft>
            <C.BonusMinRight minBonusActive={minBonusActive}>
              {inputItem("minBonus", "bonus", 0, "Bonus")}
              {inputItem("minBonus", "bonus", 1)}
              {inputItem("minBonus", "bonus", 2)}
              {inputItem("minBonus", "bonus", 3)}
              {inputItem("minBonus", "bonus", 4)}
              {inputItem("minBonus", "bonus", 5)}
            </C.BonusMinRight>
          </C.BonusMin>
          <C.BonusTotal>
            <C.BonusHeader>
              <C.Title>Total Bonus</C.Title>
              <ButtonInfo
                text={
                  "Number of additional troops received when there is total dominance of a continent."
                }
              />
            </C.BonusHeader>
            <C.BonusTotalLeft>
              {inputItem("totalBonus", "value", 0, "Total")}
              {inputItem("totalBonus", "value", 1)}
              {inputItem("totalBonus", "value", 2)}
              {inputItem("totalBonus", "value", 3)}
              {inputItem("totalBonus", "value", 4)}
              {inputItem("totalBonus", "value", 5)}
            </C.BonusTotalLeft>
            <C.BonusTotalRight>
              {inputItem("totalBonus", "bonus", 0, "Bonus")}
              {inputItem("totalBonus", "bonus", 1)}
              {inputItem("totalBonus", "bonus", 2)}
              {inputItem("totalBonus", "bonus", 3)}
              {inputItem("totalBonus", "bonus", 4)}
              {inputItem("totalBonus", "bonus", 5)}
            </C.BonusTotalRight>
          </C.BonusTotal>
        </C.BonusSettings>
      </C.ContainerBonus>
      <C.ContainerPlayers>
        <Button
          text={editActive ? "Save Players" : "Edit Players"}
          onClick={() => savePlayers()}
          color={editActive ? "#fff" : "#808080"}
          buttonBgColor={"#2e8b2e"}
          buttonBorderColor={editActive ? "#2e8b2e" : "#808080"}
        />
        <Title text={"Players"} fontSize={"1rem"} />
        <C.Players>
          {playerItem("player1")}
          {playerItem("player4")}
          {playerItem("player2")}
          {playerItem("player5")}
          {playerItem("player3")}
          {playerItem("player6")}
        </C.Players>
      </C.ContainerPlayers>
    </C.ContainerSettings>
  );
}

export default ContainerSettings;
