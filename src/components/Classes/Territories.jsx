export default class Territories {
  constructor() {
    //#region Territories List
    this.territoriesList = [
      {
        continent: "Africa",
        territory: "Algeria",
        owner: "none",
        selected: false,
      },
      {
        continent: "Africa",
        territory: "Congo",
        owner: "none",
        selected: false,
      },
      {
        continent: "Africa",
        territory: "Egypt",
        owner: "none",
        selected: false,
      },
      {
        continent: "Africa",
        territory: "Madagascar",
        owner: "none",
        selected: false,
      },
      {
        continent: "Africa",
        territory: "South Africa",
        owner: "none",
        selected: false,
      },
      {
        continent: "Africa",
        territory: "Sudan",
        owner: "none",
        selected: false,
      },

      {
        continent: "Asia",
        territory: "Aral",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "China",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Dudinka",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "India",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Japan",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Middle East",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Mongolia",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Omsk",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Siberia",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Tchita",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Vietnam",
        owner: "none",
        selected: false,
      },
      {
        continent: "Asia",
        territory: "Vladivostok",
        owner: "none",
        selected: false,
      },
      {
        continent: "Europe",
        territory: "England",
        owner: "none",
        selected: false,
      },
      {
        continent: "Europe",
        territory: "France",
        owner: "none",
        selected: false,
      },
      {
        continent: "Europe",
        territory: "Germany",
        owner: "none",
        selected: false,
      },
      {
        continent: "Europe",
        territory: "Iceland",
        owner: "none",
        selected: false,
      },
      {
        continent: "Europe",
        territory: "Moscow",
        owner: "none",
        selected: false,
      },
      {
        continent: "Europe",
        territory: "Poland",
        owner: "none",
        selected: false,
      },
      {
        continent: "Europe",
        territory: "Sweden",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "Alaska",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "California",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "Greenland",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "Labrador",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "Mackenzie",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "Mexico",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "New York",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "Ottawa",
        owner: "none",
        selected: false,
      },
      {
        continent: "North America",
        territory: "Vancouver",
        owner: "none",
        selected: false,
      },
      {
        continent: "Oceania",
        territory: "Australia",
        owner: "none",
        selected: false,
      },
      {
        continent: "Oceania",
        territory: "Borneo",
        owner: "none",
        selected: false,
      },
      {
        continent: "Oceania",
        territory: "New Guinea",
        owner: "none",
        selected: false,
      },
      {
        continent: "Oceania",
        territory: "Sumatra",
        owner: "none",
        selected: false,
      },
      {
        continent: "South America",
        territory: "Argentina",
        owner: "none",
        selected: false,
      },
      {
        continent: "South America",
        territory: "Brazil",
        owner: "none",
        selected: false,
      },
      {
        continent: "South America",
        territory: "Peru",
        owner: "none",
        selected: false,
      },
      {
        continent: "South America",
        territory: "Venezuela",
        owner: "none",
        selected: false,
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

    //#region Set Territory Selected
    this.setTerritorySelected = (territory, type, owner) => {
      switch (type) {
        case "deselect":
          {
            for (let item in this.territoriesList) {
              this.territoriesList[item].selected = false;
            }
          }
          break;

        case "selectAll":
          {
            for (let item in this.territoriesList) {
              if (this.territoriesList[item]["owner"] === owner) {
                this.territoriesList[item].selected = true;
              }
            }
          }
          break;

        default:
          {
            for (let item in this.territoriesList) {
              if (this.territoriesList[item].territory === territory) {
                this.territoriesList[item].selected =
                  !this.territoriesList[item].selected;
              }
            }
          }
          break;
      }
    };
    //#endregion

    //#region Check Owner Territories
    this.checkOwnerTerritories = (owner, selected = false) => {
      let count = 0;
      let anySelected = false;

      for (let item in this.territoriesList) {
        if (this.territoriesList[item]["owner"] === owner) {
          count++;
        }
      }

      if (selected) {
        for (let item in this.territoriesList) {
          if (
            this.territoriesList[item]["owner"] === owner &&
            this.territoriesList[item]["selected"]
          ) {
            anySelected = true;
            break;
          }
        }
      }

      return { count: count, anySelected: anySelected };
    };
    //#endregion
  }
}
