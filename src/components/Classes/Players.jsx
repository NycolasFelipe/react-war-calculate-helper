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
    };

    this.getPlayer = (playerId) => {
      for (let item in players) {
        if (players[item].playerId === playerId) {
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
          if (players[item].playerName === playersList[item].playerName) {
            players[item].playerName = playersList[item].playerName;
          }
          if (players[item].active === playersList[item].active) {
            players[item].active = playersList[item].active;
          }
        }
      }
    };

    const checkValidPlayers = (playersList) => {
      let playersActiveCount = 0;

      for (let item in playersList) {
        if (playersList[item].active && playersList[item].playerName === "") {
          return error.emptyName;
        }
        if (playersList[item].active) playersActiveCount++;
      }
      if (playersActiveCount === 0) {
        return error.minimumPlayers;
      }
    };
  }
}
