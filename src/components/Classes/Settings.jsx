export default class Settings {
  constructor() {
    const minBonus = {
      active: false,
      values: [
        {
          continent: "Africa",
          value: 4,
          bonus: 2,
        },
        {
          continent: "Asia",
          value: 7,
          bonus: 4,
        },
        {
          continent: "Europe",
          value: 4,
          bonus: 2,
        },
        {
          continent: "North America",
          value: 5,
          bonus: 3,
        },
        {
          continent: "Oceania",
          value: 2,
          bonus: 1,
        },
        {
          continent: "South America",
          value: 2,
          bonus: 1,
        },
      ],
    };
    const totalBonus = [
      {
        continent: "Africa",
        value: 6,
        bonus: 3,
      },
      {
        continent: "Asia",
        value: 12,
        bonus: 7,
      },
      {
        continent: "Europe",
        value: 7,
        bonus: 5,
      },
      {
        continent: "North America",
        value: 9,
        bonus: 5,
      },
      {
        continent: "Oceania",
        value: 4,
        bonus: 2,
      },
      {
        continent: "South America",
        value: 4,
        bonus: 2,
      },
    ];

    this.getMinBonus = () => minBonus.values;
    this.getTotalBonus = () => totalBonus;
    this.minBonusActive = () => minBonus.active;

    this.setMinBonusActive = (bool) => {
      minBonus.active = bool;
    };

    this.setBonus = (newMinBonus, newTotalBonus) => {
      for (let item in newMinBonus) {
        minBonus.values[item].value = newMinBonus[item].value;
        minBonus.values[item].bonus = newMinBonus[item].bonus;
      }
      for (let item in newTotalBonus) {
        totalBonus[item].value = newTotalBonus[item].value;
        totalBonus[item].bonus = newTotalBonus[item].bonus;
      }
    };

    this.setTotalValue = (territoryContinent, total) => {
      for (let item in totalBonus) {
        if (totalBonus[item].continent === territoryContinent) {
          totalBonus[item].value = total;
        }
      }
    };
  }
}
