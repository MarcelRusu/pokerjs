'use strict';

/*
  <Object> to attach value to the face of each card
*/
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

/*
  <Object> to attach value to the suit of each card
*/
var Suit = {
  'Clubs'    : 1,
  'Spades'   : 2,
  'Diamonds' : 3,
  'Hearts'   : 4
};

/*
  Card class to manage card objects
*/
class Card {
  /*
    Constructor for Card class
    pre:
      face <String> - face of card
      suit <String> - suit of card
    post:
      sets interal _face and _suit variable arrays for storing the string and
      integer representation of the face and suit
  */
  constructor(face, suit) {
    this._face = [face, Face[face]]
    this._suit = [suit, Suit[suit]]
  }

  /*
    Getter for _face
    pre:
      N/A
    post:
      returns:
        val <Number> - the integer value for the the face of the card
  */
  get value() {
    const val = this._face[1]
    return val;
  }

  /*
    Getter for _suit
    pre:
      N/A
    post:
      returns:
        val <Number> - integer value for the the suit of the card
  */
  get suit() {
    const suit = this._suit[1];
    return suit;
  }

  /*
    Getter for the string representation of the Card Object
    pre:
      N/A
    post:
      returns:
        str <String> - string representation of the object
  */
  get str() {
    const str = '(' + this._face[0] + ', ' + this._suit[0] + ')'
    return str;
  }

  /*
    Compare another <Card> with itself
    pre:
      rs <Card> - Card to be compared to
    post:
      res <Number> - if this > rs then 1, if this < rs then -1, else 0
  */
  compare(rs) {
    // if
  }


  equals(rs) { // replace with compare
    return this._value === rs._value && this._suit === rs._suit
  }
}

/*
  Deck Class for storing and managing an Array of Card objects
*/
class Deck {
  /*
    Constructor for Deck class
    pre:
      cards <[Card]> - list of Card objects to be put in deck
    post:
      sets the value of _cards based off if cards is  undefined or not
  */
  constructor(cards) {
    cards = cards || null;
    if (cards) {
      this._cards = cards;
    } else {
      // Initiallizes the deck with a standard set of 52 cards
      this._cards = new Array();
      for (var face in Face) {
        for (var suit in Suit) {
          this._cards.push(new Card(face, suit));
        }
      }
    }
  }

  /*
    Getter for _cards
    pre:
      N/A
    post:
      returns:
        c_cards <[Card]> - a cloned version of _cards
  */
  get cards() {
    const c_cards = R.clone(this._cards);
    return c_cards;
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
