team = {
    _players: [
      {
        firstName: 'Ken',
        lastName: 'Sanchez',
        age: 11
      },
      {
        firstName: 'Kenny',
        lastName: 'Pablo',
        age: 12
      },
      {
        firstName: 'Tommy',
        lastName: 'Sanblo',
        age: 10
      }
    ],
    _games: [
      {
        opponent: 'Broncos',
        teamPoints: 43,
        opponentPoints: 42
      },
      {
        opponent: 'Broncos',
        teamPoints: 33,
        opponentPoints: 52
      },
      {
        opponent: 'Broncos',
        teamPoints: 23,
        opponentPoints: 15
      }
    ],
      get games () {
      return this._games;
    },
    get players () {
      return this._players;
    },
    addPlayer (firstName, lastName, age) {
      let player = {
        firstName: firstName,
        lastName: lastName,
        age: age
      };
      this.players.push(player);
    },
    addGame (opponent, teamPoints, opponentPoints) {
      let game = {
        opponent: opponent,
        teamPoints: teamPoints,
        opponentPoints: opponentPoints
      };
      this.games.push(game);
    }
  };
  
  team.addPlayer('Steph', 'Curry', 28);
  team.addPlayer('Lisa', 'Leslie', 44);
  team.addPlayer('Bugs', 'Bunny', 76);
  
  console.log(team.players);
  
  team.addGame('Gay', 34, 28);
  team.addGame('Yay', 44, 28);
  team.addGame('Tay', 14, 58);
  
  console.log(team.games);