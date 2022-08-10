import { useContext, useState } from "react";
import DataContext from "../../contexts/DataContext";
import * as C from "./styles";
import Title from "../Title";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import TerritoryItem from "../TerritoryItem";

function ContainerTerritories() {
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

  return (
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
  );
}

export default ContainerTerritories;
