export default class Players {
  constructor() {
    const players = [
      {
        playerId: "player1",
        playerName: "Blue",
        active: true,
      },
      {
        playerId: "player2",
        playerName: "Red",
        active: true,
      },
      {
        playerId: "player3",
        playerName: "Green",
        active: true,
      },
      {
        playerId: "player4",
        playerName: "Yellow",
        active: false,
      },
      {
        playerId: "player5",
        playerName: "White",
        active: false,
      },
      {
        playerId: "player6",
        playerName: "Black",
        active: false,
      },
    ];

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
    this.setPlayers = () => {};
  }
}
