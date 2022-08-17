export default class TerritoriesTrade {
  constructor() {
    const playersTradeFrom = [
      {
        playerId: "player1",
        active: true,
        selected: false,
      },
      {
        playerId: "player2",
        active: true,
        selected: false,
      },
      {
        playerId: "player3",
        active: true,
        selected: false,
      },
      {
        playerId: "player4",
        active: false,
        selected: false,
      },
      {
        playerId: "player5",
        active: false,
        selected: false,
      },
      {
        playerId: "player6",
        active: false,
        selected: false,
      },
      {
        playerId: "none",
        active: true,
        selected: true,
      },
    ];

    const playersTradeTo = [
      {
        playerId: "player1",
        active: true,
        selected: false,
      },
      {
        playerId: "player2",
        active: true,
        selected: false,
      },
      {
        playerId: "player3",
        active: true,
        selected: false,
      },
      {
        playerId: "player4",
        active: false,
        selected: false,
      },
      {
        playerId: "player5",
        active: false,
        selected: false,
      },
      {
        playerId: "player6",
        active: false,
        selected: false,
      },
      {
        playerId: "none",
        active: true,
        selected: false,
      },
    ];

    const getPlayersTradeId = (type, playerId) => {
      switch (type) {
        case "from": {
          for (let item in playersTradeFrom) {
            if (playersTradeFrom[item].playerId === playerId)
              return playersTradeFrom[item];
          }
        }
        case "to": {
          for (let item in playersTradeTo) {
            if (playersTradeTo[item].playerId === playerId)
              return playersTradeTo[item];
          }
        }
      }
    };

    this.getPlayersTrade = (type) => {
      let items = [];
      switch (type) {
        case "from": {
          for (let item in playersTradeFrom) {
            if (playersTradeFrom[item].active)
              items.push(playersTradeFrom[item]);
          }
          return items;
        }
        case "to": {
          for (let item in playersTradeTo) {
            if (playersTradeTo[item].active) items.push(playersTradeTo[item]);
          }
          return items;
        }
        default: {
          items.push(playersTradeFrom);
          items.push(playersTradeTo);
          return items;
        }
      }
    };

    this.loadPlayersTradeActive = (players) => {
      for (let player in players) {
        playersTradeFrom[player]["active"] = players[player]["active"];
      }
      for (let player in players) {
        playersTradeTo[player]["active"] = players[player]["active"];
      }
    };

    this.setPlayersTradeSelected = (playerId, type) => {
      switch (type) {
        case "from": {
          for (let item in playersTradeFrom) {
            if (playersTradeFrom[item].playerId === playerId) {
              playersTradeFrom[item].selected = true;
            } else playersTradeFrom[item].selected = false;
          }
          break;
        }
        case "to": {
          for (let item in playersTradeTo) {
            if (playersTradeTo[item].playerId === playerId) {
              playersTradeTo[item].selected = !playersTradeTo[item].selected;
            } else playersTradeTo[item].selected = false;
          }
          break;
        }
      }
    };

    this.checkPlayersTradeDuplicate = (playerId, type) => {
      let tradeTerritoryFrom = getPlayersTradeId("from", playerId);
      let tradeTerritoryTo = getPlayersTradeId("to", playerId);
      if (type === "from" && tradeTerritoryTo["selected"]) return true;
      if (type === "to" && tradeTerritoryFrom["selected"]) return true;
      return false;
    };

    this.checkPlayerSelected = () => {
      for (let item in playersTradeTo) {
        if (
          playersTradeTo[item]["active"] &&
          playersTradeTo[item]["selected"] === true
        ) {
          return false;
        }
      }
      return true;
    };

    this.switchPlayersTrade = () => {
      let newPlayerTradeFrom;
      let newPlayerTradeTo;

      for (let item in playersTradeTo) {
        if (playersTradeTo[item]["selected"])
          newPlayerTradeFrom = playersTradeTo[item]["playerId"];
      }
      for (let item in playersTradeFrom) {
        if (playersTradeFrom[item]["selected"])
          newPlayerTradeTo = playersTradeFrom[item]["playerId"];
      }

      this.setPlayersTradeSelected(newPlayerTradeFrom, "from");
      this.setPlayersTradeSelected(newPlayerTradeTo, "to");
    };
  }
}
