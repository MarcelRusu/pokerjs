'use strict';

var Face = {
  'Ace'   : 1,
  '2'     : 2,
  '3'     : 3,
  '4'     : 4,
  '5'     : 5,
  '6'     : 6,
  '7'     : 7,
  '8'     : 8,
  '9'     : 9,
  '10'    : 10,
  'Jack'  : 11,
  'Queen' : 12,
  'King'  : 13
};

var Suit = {
  'Clubs'    : 1,
  'Spades'   : 2,
  'Diamonds' : 3,
  'Hearts'   : 4
};

class Card {
  constructor(face, suit) {
    this._value = [face, Face[face]] // Change
    this._suit = [suit, Suit[suit]]
  }

  get value() {
    return this._value[1];
  }

  get suit() {
    return this._suit[1];
  }

  get str() {
    return '(' + this._value[0] + ', ' + this._suit[0] + ')';
  }

  compare(rs) {
    // if
  }

  equals(rs) {
    return this._value === rs._value && this._suit === rs._suit
  }
}

class Deck {
  constructor(cards) {
    cards = cards || null;
    if (cards) {
      this._cards = cards;
    } else {
      this._cards = new Array();
      for (var face in Face) {
        for (var suit in Suit) {
          this._cards.push(new Card(face, suit));
        }
      }
    }
    // this.shuffle()
  }

  get cards() {
    return R.clone(this._cards)
  }

  get front() {
    return R.clone(this._cards[this._cards.length - 1]);
  }

  get str() {
    var str = '';
    for (var i = 0; i < this._cards.length; i++) {
      str += this._cards[i].str + '\n'
    }
    return str
  }

  popCard() {
    return this._cards.pop();
  }

  addCard(card) {
    this._cards.push(card);
  }

  shuffle() {
    var new_deck = new Deck([]);
    var indices = new Array();
    var rand = 0;
    for (var i = 0; i < this._cards.length; i++) {
      if (indices.length !== 0) {
        while (indices.indexOf(rand) !== -1) {
          rand = Math.floor(Math.random() * this._cards.length);
        }
      } else {
        rand = Math.floor(Math.random() * this._cards.length);
      }
      indices.push(rand);
      new_deck.addCard(this._cards[rand]);
    }
    this._cards = new_deck.cards;
  }
}
