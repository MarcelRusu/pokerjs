'use strict';

class Game { // incomplete
  constructor() {
    this._currentRound = null;
    this._players = []
    this._winner = null
  }

  play() {
    while(!this._winner) {
      newRound()
    }
  }

  newRound() {
    this._currentRound = new Round()
    this._currentRound.play()
  }
}

class Round {
  constructor(players, hand) {
    this._players = players || [];
    this._hand = hand;
    this._pot = 0;
    this._winner = null;
    // this._turn =
  }


  /*

  */
  get deck() {
    return R.clone(this._deck)
  }

  get player(i) {
    i = i || null
    if (i) {
      return R.clone(this._players[i]);
    } else {
      return R.clone(this._players)
    }
  }

  addToHand(card) {
    hand.addCard(card);
  }

  get pot() {
    return R.clone(this._pot)
  }

  fold(player) {
    this._players.pop(this._players.indexOf(player))
  }

  raise(player) {
    this._pot += player.raise;
  }

  get winner() {
    if (this._hand.length < 5) {
      throw 'Game not over'
    } else {
      for
    }
    // return this._winner
  }

  nextTurn() {
    if (this.hand.length === 5) {
      return this.winner
    }
    for (player in players) {
      var decision = player.makeDecision();

      switch decision {
        case 'fold'  : fold(player) break;
        case 'raise' : raise(player) break;
        case 'pass'  : break;
        default      : throw 'Not valid decision!';
      }
    }
  }
}
