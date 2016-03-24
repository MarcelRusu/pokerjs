'use strict';

class Game { // incomplete
  constructor(players) {
    this._currentRound = null;
    this._players = players;
    this._winner = null;
  }

  newRound() {
    this._currentRound = new Round(this._players)
  }
}

class Round {
  constructor(players) {
    this._players = players || [];
    this._hand = new Hand();
    this._deck = new Deck();
    this._pot = 0;
    this._winner = null;
    this._turn = 0;

    this._deck.shuffle();

    for (var j = 0; j < 2; j++) {
      for (var i = 0; i < this._players.length; i++) {
        this._players[i].hand.addCard(this._deck.pop());
      }
    }
    for (var i = 0; i < 3; i++) {
      this._hand.addCard(this._deck.pop());
    }

    for (var i = 0; i < this._players.length; i++) {
      console.log(this._players[i].name + ' :' + this._players[i].hand.str)
    }

    console.log('Middle Hand: ' + this._hand.str)
  }


  /*

  */
  get deck() {
    return this._deck
  }

  get player() {
    return this._players[this._turn];
  }

  addToHand(card) {
    hand.addCard(card);
  }

  get pot() {
    return this._pot
  }

  fold() {
    this._players[this._turn] = undefined;
    var nPlayers = [];
    for (var i = 0; i < this._players.length; i++) {
      if (this._players[i]) {
        nPlayers.push(this._players[i]);
      }
    }
    this._players = nPlayers;
  }

  raise() {
    this._pot += this.player.raise; // player has a getter that resets raise to null
  }

  get winner() {
    if (this._hand.length < 5) {
      // throw 'Game not over'
    } else {
      var bestPlayer = this._players[0];
      for (var i = 0; i < this._players.length; i++) {
        if (this._players[i].compare(bestPlayer, this._hand) > 0) {
          bestPlayer = this._players[i];
          // console.log(bestPlayer); // get out
        }
      }
      for (var i = 0; i < this._players.length; i++) {
        this._players[i].newHand();
      }
      this._winner = bestPlayer;
      this._winner.win = this._pot;
      this._pot = 0;
      console.log(this._winner);
    }

    // console.log(this._winner);
    return this._winner;
  }



  nextTurn(move, raise) {
    if (this._hand.length === 5) {

      if (this._turn === this._players.length) {
        return this.winner; // lol do something else
      }
      this._turn += 1;
      if (move === 'raise') {
        this.player.raise = raise;
        this.raise();
        console.log(this.pot);
      } else if (move === 'fold') {
        this.fold();
        for (var i = 0; i < this._players.length; i++) {
          console.log(this._players[i].name + ' :' + this._players[i].money);
        }
      }
    } else {
      this._turn += 1;
      if (this._turn === this._players.length) {
        this._hand.addCard(this._deck.pop());
        this._turn = 0;
        console.log(this._hand.str);
      }

      if (move === 'raise') {
        this.player.raise = raise;
        this.raise();
        console.log(this.pot);
      } else if (move === 'fold') {
        this.fold();
        for (var i = 0; i < this._players.length; i++) {
          console.log(this._players[i].name + ' :' + this._players[i].money);
        }
      }

      console.log(this.player.name);
    }
  }
}
