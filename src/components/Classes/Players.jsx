export default class Players {
  constructor() {
    //#region Players List
    const players = [
      {
        playerId: 'player1',
        playerName: 'Blue',
        active: true,
        selected: false,
      },
      {
        playerId: 'player2',
        playerName: 'Red',
        active: true,
        selected: false,
      },
      {
        playerId: 'player3',
        playerName: 'Green',
        active: true,
        selected: false,
      },
      {
        playerId: 'player4',
        playerName: 'Yellow',
        active: false,
        selected: false,
      },
      {
        playerId: 'player5',
        playerName: 'White',
        active: false,
        selected: false,
      },
      {
        playerId: 'player6',
        playerName: 'Black',
        active: false,
        selected: false,
      },
    ];
    //#endregion

    //#region Error Messages
    const error = {
      emptyName: 'Name field cannot be empty.',
      minimumPlayers: 'At least one player must be active.',
      duplicatedName: 'There can be no identical names.',
    };
    //#endregion

    //#region Get Player Info by Id
    this.getPlayer = (playerId) => {
      for (let item in players) {
        if (players[item]['playerId'] === playerId) {
          return players[item];
        }
      }
    };
    //#endregion

    //#region Get Players List by (Current Active) or Everyone
    this.getPlayers = (active) => {
      if (active === 'active') {
        let playersActive = [];
        for (let item in players) {
          if (players[item]['active']) playersActive.push(players[item]);
        }
        return playersActive;
      }
      return players;
    };
    //#endregion

    //#region Change Players List
    this.setPlayers = (playersList) => {
      const error = checkValidPlayers(playersList);
      if (error) return error;
      else {
        for (let item in playersList) {
          let playerListId = playersList[item]['playerId'];
          let playerListName = playersList[item]['playerName'];
          let playerListActive = playersList[item]['active'];

          if (players[item]['playerId'] === playerListId) {
            players[item]['playerName'] = playerListName;
            players[item]['active'] = playerListActive;
          }
        }
      }
    };

    //Check for Player Name duplicates
    const checkDuplicate = (array) => {
      return new Set(array).size !== array.length;
    };

    //Check Valid Input for Player Name
    const checkValidPlayers = (playersList) => {
      let playersListNames = [];
      let playersActiveCount = 0;

      for (let item in playersList) {
        let playerActive = playersList[item]['active'];
        let playerName = playersList[item]['playerName'];

        if (playerActive) {
          if (playerName === '' || playerName.replaceAll(/\s/g, '') === '')
            return error.emptyName;

          playersActiveCount++;
          playersListNames.push(playersList[item]['playerName']);
        }
      }

      if (playersActiveCount === 0) {
        return error.minimumPlayers;
      }
      if (checkDuplicate(playersListNames)) {
        return error.duplicatedName;
      }
    };
    //#endregion
  }
}
