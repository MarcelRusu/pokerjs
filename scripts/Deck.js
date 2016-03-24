'use strict';

/*
  <Object> to attach value to the face of each card
*/
const Face = {
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
const Suit = {
  'Clubs'    : 1,
  'Spades'   : 2,
  'Diamonds' : 3,
  'Hearts'   : 4
};

const CardValue = { // #worth?
  'Less'    : -1,
  'Equal'   : 0,
  'Greater' : 1
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
    this._face = [face, Face[face]];
    this._suit = [suit, Suit[suit]];
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
    const val = this._face[1];
    return val;
  }

  diff(cardB) {
    if (cardB instanceof Card) {
      if ((cardB.value === 13 && this.value === 1) || (cardB.value === 1 && this.value === 13)) {
        return 1;
      } else {
        return Math.abs(cardB.value - this.value);
      }
    } else {
      throw cardB + ' is not of type <Card>.';
    }
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

  get isRoyal() {
    return this.value === Face['Jack'] || this.value === Face['Queen'] || this.value === Face['King'];
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
    const str = '(' + this._face[0] + ', ' + this._suit[0] + ')';
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
    var res;
    if (this.value > rs.value) {
      res = 1;
    } else if (this.value < rs.value) {
      res = -1;
    } else if (this.value === rs.value) { // this is needed if rs is undefined, find a proper solution !!
      res = 0;
    }
    return res;
  }

  /*
    Compare another <Card> with itself
    pre:
      rs <Card> - Card to be compared to
    post:
      res <Number> - if this > rs then 1, if this < rs then -1, else 0
  */
  deepCompare(rs) {
    var res;
    if (this.value > rs.value) {
      res = 1;
    } else if (this.value < rs.value) {
      res = -1;
    } else if (this.suit > rs.suit) {
      res = 1;
    } else if (this.suit < rs.suit) {
      res = -1;
    } else {
      res = 0;
    }

    return res;
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
      this._cards = [];
        for (var face in Face) { // does this work??
        for (var suit in Suit) {
          this._cards.push(new Card(face, suit));
        }
      }
    }
  }

  get length() {
    return this._cards.length;
  }

  /*
    Getter for _cards
    use: p.cards
    pre:
      N/A
    post:
      returns:
        copyCards <[Card]> - a cloned version of _cards
  */
  get cards() {
    const copyCards = this._cards;
    return copyCards;
  }

  /*
    Getter for last value in _cards ([<Card>])
    pre:
      N/A
    post:
      returns:
        copyFront <Card> - a cloned version of last value in _cards ([<Card>])
  */
  get front() {
    const copyFront = this._cards[this._cards.length - 1];
    return copyFront;
  }

  /*
    Getter a string representation of the Deck
    pre:
      N/A
    post:
      returns:
        str <String> - string representation of the Deck object
  */
  get str() {
    var str = '';
    for (var i = 0; i < this._cards.length; i++) {
      str += this._cards[i].str + '\n'
    }
    return str
  }

  /*
    Pops the last card off the deck
    pre:
      N/A
    post:
      returns:
        pCard <Card> - the last value in _cards
  */
  pop() {
    if (this.length === 0) {
      throw 'No cards in deck to pop.';
    }
    const pCard = this._cards.pop();
    return pCard;
  }

  /*
    Pushes on a Card to the top of the Deck
    pre:
      card <Card> - Card object to add on to the top of the deck
    post:
      pushes card to _cards
  */
  addCard(card) {
    this._cards.push(card);
  }

  addCards(cards) {
    for (var i = 0; i < cards.length; i++) {
      this.addCard(cards[i]);
    }
  }

  /*
    Randomly shuffles the Deck
    pre:
      N/A
    post:
      creates a new Deck, and puts in all the cards in original _cards, but in
      random order, then _cards is reassigned to a randomly shuffled deck cards
  */
  shuffle() {
    var new_deck = new Deck([]);
    var indices = [];
    var rand = Math.floor(Math.random() * this._cards.length);
    indices.push(rand);
    new_deck.addCard(this._cards[rand]);
    while (indices.length < this._cards.length) {
      while (indices.indexOf(rand) !== -1) {
        rand = Math.floor(Math.random() * this._cards.length);
      }
      new_deck.addCard(this._cards[rand]);
      indices.push(rand);
    }
    this._cards = new_deck.cards;
  }
}
