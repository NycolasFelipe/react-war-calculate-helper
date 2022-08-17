export default class Players {
  constructor() {
    const players = [
      {
        playerId: "player1",
        playerName: "Blue",
        active: true,
        selected: false,
      },
      {
        playerId: "player2",
        playerName: "Red",
        active: true,
        selected: false,
      },
      {
        playerId: "player3",
        playerName: "Green",
        active: true,
        selected: false,
      },
      {
        playerId: "player4",
        playerName: "Yellow",
        active: false,
        selected: false,
      },
      {
        playerId: "player5",
        playerName: "White",
        active: false,
        selected: false,
      },
      {
        playerId: "player6",
        playerName: "Black",
        active: false,
        selected: false,
      },
    ];

    const error = {
      emptyName: "Name field cannot be empty.",
      minimumPlayers: "At least one player must be active.",
      duplicatedName: "There can be no identical names.",
    };

    this.getPlayer = (playerId) => {
      for (let item in players) {
        if (players[item]["playerId"] === playerId) {
          return players[item];
        }
      }
    };

    this.getPlayers = () => {
      return players;
    };

    this.setPlayers = (playersList) => {
      const error = checkValidPlayers(playersList);
      if (error) return error;
      else {
        for (let item in playersList) {
          let playerListName = playersList[item]["playerName"];
          let playerListActive = playersList[item]["active"];

          if (players[item]["playerName"] === playerListName) {
            players[item]["playerName"] = playerListName;
          }
          if (players[item]["active"] === playerListActive) {
            players[item]["active"] = playerListActive;
          }
        }
      }
    };

    const checkDuplicate = (array) => {
      return new Set(array).size !== array.length;
    };

    const checkValidPlayers = (playersList) => {
      let playersListNames = [];
      let playersActiveCount = 0;

      for (let item in playersList) {
        let playerActive = playersList[item]["active"];
        let playerName = playersList[item]["playerName"];

        if (playerActive) {
          if (playerName === "" || playerName.replaceAll(/\s/g, "") === "")
            return error.emptyName;

          playersActiveCount++;
          playersListNames.push(playersList[item]["playerName"]);
        }
      }

      if (playersActiveCount === 0) {
        return error.minimumPlayers;
      }
      if (checkDuplicate(playersListNames)) {
        return error.duplicatedName;
      }
    };
  }
}
