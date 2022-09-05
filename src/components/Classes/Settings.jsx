export default class Settings {
  constructor() {
    //#region Minimum Bonus Settings
    const minBonus = {
      active: false,
      values: [
        {
          continent: 'Africa',
          value: 4,
          bonus: 2,
        },
        {
          continent: 'Asia',
          value: 7,
          bonus: 4,
        },
        {
          continent: 'Europe',
          value: 4,
          bonus: 2,
        },
        {
          continent: 'North America',
          value: 5,
          bonus: 3,
        },
        {
          continent: 'Oceania',
          value: 2,
          bonus: 1,
        },
        {
          continent: 'South America',
          value: 2,
          bonus: 1,
        },
      ],
    };
    //#endregion

    //#region Total Bonus Settings
    const totalBonus = [
      {
        continent: 'Africa',
        value: 6,
        bonus: 3,
      },
      {
        continent: 'Asia',
        value: 12,
        bonus: 7,
      },
      {
        continent: 'Europe',
        value: 7,
        bonus: 5,
      },
      {
        continent: 'North America',
        value: 9,
        bonus: 5,
      },
      {
        continent: 'Oceania',
        value: 4,
        bonus: 2,
      },
      {
        continent: 'South America',
        value: 4,
        bonus: 2,
      },
    ];
    //#endregion

    //#region Error Messages
    const error = {
      fieldEmpty: 'Field cannot be empty.',
      negativeValue: 'Value cannot be negative.',
      invalidMinBonus: 'Min value cannot be greater than total value.',
    };
    //#endregion

    //#region Get Min/Total Bonus and if Min Bonus is currently active
    this.getMinBonus = () => minBonus.values;
    this.getTotalBonus = () => totalBonus;
    this.minBonusActive = () => minBonus.active;
    //#endregion

    //#region Set Min/Total Bonus Settings (expect total value)
    this.setBonus = (newMinBonus, newTotalBonus, newMinBonusActive) => {
      const error = checkValidSettings(
        newMinBonus,
        newTotalBonus,
        newMinBonusActive
      );
      if (error) return error;

      for (let item in newMinBonus) {
        minBonus.values[item].value = newMinBonus[item].value;
        minBonus.values[item].bonus = newMinBonus[item].bonus;
      }
      for (let item in newTotalBonus) {
        totalBonus[item].value = newTotalBonus[item].value;
        totalBonus[item].bonus = newTotalBonus[item].bonus;
      }
      minBonus.active = newMinBonusActive;
    };

    //Check valid settings before applying
    const checkValidSettings = (
      newMinBonus,
      newTotalBonus,
      newMinBonusActive
    ) => {
      //Checking if data is valid before saving it
      for (let item in newTotalBonus) {
        if (newTotalBonus[item]['bonus'] === '') {
          return error.fieldEmpty;
        } else if (newTotalBonus[item]['bonus'] < 0) {
          return error.negativeValue;
        }
      }
      if (newMinBonusActive) {
        for (let item in newMinBonus) {
          if (
            newMinBonus[item]['value'] === '' ||
            newMinBonus[item]['bonus'] === ''
          ) {
            return error.fieldEmpty;
          } else if (
            newMinBonus[item]['value'] > newTotalBonus[item]['value']
          ) {
            return error.invalidMinBonus;
          } else if (newMinBonus[item]['value'] < 0) {
            return error.negativeValue;
          }
          if (newMinBonus[item]['bonus'] < 0) {
            return error.negativeValue;
          }
        }
      }
      return false;
    };
    //#endregion

    //#region Set Total Value Settings
    this.setTotalValue = (territoryContinent, total) => {
      for (let item in totalBonus) {
        if (totalBonus[item].continent === territoryContinent) {
          totalBonus[item].value = total;
        }
      }
    };
    //#endregion

    //#region Calculate number of territories per continent (Total)
    /* 
    Calculate number of territories per continent and return continents with
    total ownership by the player
    */
    this.checkTerritoriesTotality = (territoriesOwned) => {
      let africa = {
        continent: 'Africa',
        totality: false,
        minTotality: false,
        count: 0,
      };
      let asia = {
        continent: 'Asia',
        totality: false,
        minTotality: false,
        count: 0,
      };
      let europe = {
        continent: 'Europe',
        totality: false,
        minTotality: false,
        count: 0,
      };
      let northAmerica = {
        continent: 'North America',
        totality: false,
        minTotality: false,
        count: 0,
      };
      let oceania = {
        continent: 'Oceania',
        totality: false,
        minTotality: false,
        count: 0,
      };
      let southAmerica = {
        continent: 'South America',
        totality: false,
        minTotality: false,
        count: 0,
      };

      //Determining the number of territories per player's continent
      for (let item in territoriesOwned) {
        let itemContinent = territoriesOwned[item]['continent'];
        switch (itemContinent) {
          case 'Africa':
            africa['count']++;
            break;
          case 'Asia':
            asia['count']++;
            break;
          case 'Europe':
            europe['count']++;
            break;
          case 'North America':
            northAmerica['count']++;
            break;
          case 'Oceania':
            oceania['count']++;
            break;
          case 'South America':
            southAmerica['count']++;
            break;
          default:
            break;
        }
      }

      if (minBonus['active']) {
        for (let item in minBonus['values']) {
          let minContinent = minBonus['values'][item]['continent'];
          let minValue = minBonus['values'][item]['value'];

          switch (minContinent) {
            case 'Africa':
              africa['minTotality'] = minValue <= africa['count'];
              break;
            case 'Asia':
              asia['minTotality'] = minValue <= asia['count'];
              break;
            case 'Europe':
              europe['minTotality'] = minValue <= europe['count'];
              break;
            case 'North America':
              northAmerica['minTotality'] = minValue <= northAmerica['count'];
              break;
            case 'Oceania':
              oceania['minTotality'] = minValue <= oceania['count'];
              break;
            case 'South America':
              southAmerica['minTotality'] = minValue <= southAmerica['count'];
              break;
          }
        }
      }

      /*
      Determines if the player owns the entire continent if its count is equal
      to the required one determined in settings
      */
      for (let item in totalBonus) {
        let totalContinent = totalBonus[item]['continent'];
        let totalValue = totalBonus[item]['value'];

        switch (totalContinent) {
          case 'Africa':
            africa['totality'] = totalValue === africa['count'];
            break;
          case 'Asia':
            asia['totality'] = totalValue === asia['count'];
            break;
          case 'Europe':
            europe['totality'] = totalValue === europe['count'];
            break;
          case 'North America':
            northAmerica['totality'] = totalValue === northAmerica['count'];
            break;
          case 'Oceania':
            oceania['totality'] = totalValue === oceania['count'];
            break;
          case 'South America':
            southAmerica['totality'] = totalValue === southAmerica['count'];
            break;
          default:
            break;
        }
      }

      let territoriesTotality = [];
      if (africa['totality'] || africa['minTotality']) {
        territoriesTotality.push(africa);
      }
      if (asia['totality'] || asia['minTotality']) {
        territoriesTotality.push(asia);
      }
      if (europe['totality'] || europe['minTotality']) {
        territoriesTotality.push(europe);
      }
      if (northAmerica['totality'] || northAmerica['minTotality']) {
        territoriesTotality.push(northAmerica);
      }
      if (oceania['totality'] || oceania['minTotality']) {
        territoriesTotality.push(oceania);
      }
      if (southAmerica['totality'] || southAmerica['minTotality']) {
        territoriesTotality.push(southAmerica);
      }

      return territoriesTotality;
    };
    //#endregion
  }
}
