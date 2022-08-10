import { useMemo } from "react";
import DataContext from "./contexts/DataContext";
import * as C from "./AppStyles";
import ContainerTerritories from "./components/ContainerTerritories";

class Territories {
  constructor() {
    //#region Territories List
    this.territoriesList = [
      {
        territory: "UK",
        continent: "Europe",
        owner: "none",
        selected: {
          sideTerritories: false,
          addTerritories: false,
        },
      },
      {
        territory: "Germany",
        continent: "Europe",
        owner: "none",
        selected: {
          sideTerritories: false,
          addTerritories: false,
        },
      },
      {
        territory: "France",
        continent: "Europe",
        owner: "none",
        selected: {
          sideTerritories: false,
          addTerritories: false,
        },
      },
      {
        territory: "Sweden",
        continent: "Europe",
        owner: "none",
        selected: {
          sideTerritories: false,
          addTerritories: false,
        },
      },
      {
        territory: "Norway",
        continent: "Europe",
        owner: "none",
        selected: {
          sideTerritories: false,
          addTerritories: false,
        },
      },
      {
        territory: "Portugal",
        continent: "Europe",
        owner: "player",
        selected: {
          sideTerritories: false,
          addTerritories: false,
        },
      },
    ];
    //#endregion

    //#region Set Owner Territory
    this.setPlayerTerritory = (newOwner, territory) => {
      for (let item in this.territoriesList) {
        if (this.territoriesList[item].territory === territory) {
          this.territoriesList[item].owner = newOwner;
        }
      }
    };
    //#endregion

    //#region Delete Territory
    this.deleteTerritory = (deletedTerritory) => {
      const filteredTerritories = this.territoriesList.filter((item) => {
        if (item.territory !== deletedTerritory) return item;
      });
      this.territoriesList = filteredTerritories;
    };
    //#endregion

    //#region Error Messages
    const error = {
      emptyName: "You must type a name for the territory.",
      duplicatedName: "There is already a territory with this name.",
    };
    //#endregion

    //#region Add Territory
    //Check Territory Duplicate
    const checkTerritoryDuplicate = (territoryName) => {
      for (let item in this.territoriesList) {
        if (this.territoriesList[item].territory === territoryName) return true;
      }
    };

    //Compare Territories Rule
    const compareTerritories = (a, b) => {
      if (a.continent === b.continent) {
        return a.territory < b.territory ? -1 : 1;
      } else {
        return a.continent < b.continent ? -1 : 1;
      }
    };

    this.addTerritory = (territoryName, territoryContinent) => {
      //Se não digitar um nome para o território
      if (!territoryName) {
        return error.emptyName;
        //Checa se existe algum outro território com o mesmo nome
      } else if (checkTerritoryDuplicate(territoryName)) {
        return error.duplicatedName;
      } else {
        this.territoriesList.push({
          territory: territoryName,
          continent: territoryContinent,
          owner: "none",
          selected: {
            sideTerritories: false,
            addTerritories: false,
          },
        });
        this.territoriesList = this.territoriesList.sort(compareTerritories);
      }
    };
    //#endregion
  }
}

function App() {
  const territories = new Territories();
  const providerValue = useMemo(() => ({ territories }), [territories]);

  return (
    <C.Container>
      <DataContext.Provider value={providerValue}>
        <C.ContainerGameSettings>
          <ContainerTerritories />
        </C.ContainerGameSettings>
      </DataContext.Provider>
    </C.Container>
  );
}

export default App;

// const availableTerritories = territories.territoriesList.filter((item) => {
//   return item.owner !== "none";
// });
