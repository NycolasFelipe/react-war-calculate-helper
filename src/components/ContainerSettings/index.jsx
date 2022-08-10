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
  //#endregion

  //Delete is active at the current moment
  const [deleteItemActive, setDeleteItemActive] = useState(false);

  //Delete territory
  const deleteTerritory = (territory) => {
    if (deleteItemActive) {
      territories.deleteTerritory(territory);
      //Update territories list
      setTerritoriesList(territories.territoriesList);
    }
  };

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
    }
    //#endregion
  };
  //#endregion

  //#region Bonus Settings
  const territoriesCount = (continent) => {
    return territoriesList.filter((item) => item.continent === continent)
      .length;
  };

  const minBonus = [
    ["Africa", 4, 2],
    ["Asia", 7, 4],
    ["Europe", 4, 2],
    ["North America", 5, 3],
    ["Oceania", 2, 1],
    ["South America", 2, 1],
  ];
  const [minBonusActive, setMinBonusActive] = useState(false);

  const totalBonus = [
    ["Africa", territoriesCount("Africa"), 3],
    ["Asia", territoriesCount("Asia"), 7],
    ["Europe", territoriesCount("Europe"), 5],
    ["North America", territoriesCount("North America"), 5],
    ["Oceania", territoriesCount("Oceania"), 2],
    ["South America", territoriesCount("South America"), 2],
  ];

  const inputItem = (type, value, bonus, text, lockValue) => {
    let array;
    switch (type) {
      case "minBonus":
        array = minBonus;
        break;
      case "totalBonus":
        array = totalBonus;
        break;
    }
    if (lockValue) {
      return (
        <Input
          value={territoriesCount(array[value][0])}
          readOnly={true}
          alignCenter={true}
          text={text}
          lockValue={lockValue}
          borderRadius={"0"}
        />
      );
    } else {
      return (
        <Input
          defaultValue={array[value][bonus]}
          alignCenter={true}
          text={text}
          borderRadius={"0"}
        />
      );
    }
  };

  const territoryItem = (continent) => {
    return (
      <TerritoryItem
        divHeight={"19px"}
        hideTerritory={true}
        continent={continent}
      />
    );
  };
  //#endregion

  return (
    <C.ContainerSettings>
      <C.ContainerTerritories>
        <C.TerritoriesContent>
          <C.AddAlert showAddAlert={showAddAlert}>Territory Added!</C.AddAlert>
          <C.TerritoriesTitle>
            <Title
              text={`Territories count: ${territoriesList.length}`}
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
                onClick={() => deleteTerritory(item.territory)}
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
              <CheckBox onClick={() => setMinBonusActive(!minBonusActive)} />
              <ButtonInfo
                text={
                  "Minimum of territories on a continent to receive additional troops."
                }
              />
            </C.BonusHeader>
            <C.BonusMinLeft minBonusActive={minBonusActive}>
              {inputItem("minBonus", 0, 1, "Min.")}
              {inputItem("minBonus", 1, 1)}
              {inputItem("minBonus", 2, 1)}
              {inputItem("minBonus", 3, 1)}
              {inputItem("minBonus", 4, 1)}
              {inputItem("minBonus", 5, 1)}
            </C.BonusMinLeft>
            <C.BonusMinRight minBonusActive={minBonusActive}>
              {inputItem("minBonus", 0, 2, "Bonus")}
              {inputItem("minBonus", 1, 2)}
              {inputItem("minBonus", 2, 2)}
              {inputItem("minBonus", 3, 2)}
              {inputItem("minBonus", 4, 2)}
              {inputItem("minBonus", 5, 2)}
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
              {inputItem("totalBonus", 0, 1, "Total", true)}
              {inputItem("totalBonus", 1, 1, "", true)}
              {inputItem("totalBonus", 2, 1, "", true)}
              {inputItem("totalBonus", 3, 1, "", true)}
              {inputItem("totalBonus", 4, 1, "", true)}
              {inputItem("totalBonus", 5, 1, "", true)}
            </C.BonusTotalLeft>
            <C.BonusTotalRight>
              {inputItem("totalBonus", 0, 2, "Bonus")}
              {inputItem("totalBonus", 1, 2)}
              {inputItem("totalBonus", 2, 2)}
              {inputItem("totalBonus", 3, 2)}
              {inputItem("totalBonus", 4, 2)}
              {inputItem("totalBonus", 5, 2)}
            </C.BonusTotalRight>
          </C.BonusTotal>
        </C.BonusSettings>
      </C.ContainerBonus>
    </C.ContainerSettings>
  );
}

export default ContainerSettings;
