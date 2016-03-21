'use strict';

/*
  Decision <Object> to essential act like an enum for possible decisions for
  <Player> objects
*/
const Decision = {
  'Pass'  : 0,
  'Raise' : 1,
  'Fold'  : 2
};

class Hand {
  constructor(cards) {
    this._cards = [];
    this.addCards(cards);
  }

  get length() {
    const l = this._cards.length;
    return l;
  }

  addCard(card) {
    if (!this.contains(card)) {
      // finds first index where inserted card is less than some card in the hand
      for (var i = 0; i < this.length; i++) {
        if (card.deepCompare(this._cards[i]) === CardValue['Less']) {
          break;
        }
      }
      const index = i;
      const nCards = [];
      // pushes original cards before the inserted card index
      for (var i = 0; i < index; i++) {
        nCards.push(this._cards[i]);
      }
      nCards.push(card);
      // pushes rest of original cards
      for (var i = index; i < this.length; i++) {
        nCards.push(this._cards[i]);
      }
      this._cards = nCards;
    }
  }

  addCards(cards) {
    for (var i = 0; i < cards.length; i++) {
      this.addCard(cards[i]);
    }
  }

  pop() {
    if (this.length === 0) {
      throw 'No cards in hand.'
    }

    const c = this._cards.pop();
    return c;
  }

  get cards() {
    const cardsCopy = [];
    for (var i = 0; i < this.length; i++) {
      cardsCopy.push(new Card(this._cards[i]._face[0], this._cards[i]._suit[0]))
    }
    return cardsCopy;
  }

  contains(card) {
    for (var i = 0; i < this.length; i++) {
      if (this._cards[i].deepCompare(card) === CardValue['Equal']) {
        return true;
      }
    }
    return false;
  }

  get str() {
    var str = '(';

    for (var i = 0; i < this.length; i++) {
      str += this._cards[i].str;
      if (i !== this.length - 1) {
        str += ', ';
      }
    }

    return str + ')';
  }
}

class PlayerHand extends Hand { // implement some sort cloning thing for setting and getting values!!! // do in depth testing
  constructor(cards) {
    super(cards);
  }

  addCard(card) {
    super.addCard(card);
  }

  addCards(cards) {
    super.addCards(cards);
  }

  get length() {
    return super.length;
  }

  get cards() {
    return super.cards;
  }

  contains(card) {
    return super.contains(card);
  }

  compare(hand) { // implement
    if (hand instanceof PlayerHand) {
      for (card in cards) {

      }
    }
  }

  get str() {
    return super.str;
  }

  pop() {
    return super.pop();
  }

  _combinedHand(middleHand) {
    const cHand = new Hand(middleHand.cards);
    cHand.addCards(this.cards);
    return cHand;
  }

  calcHand(middleHand) {
    const cHand = this._combinedHand(middleHand);

    console.log(cHand)

    if (_isRoyalFlush(middleHand)) {

    }
  }

  _isRoyalFlush(middleHand) {
    var cHand = this._combinedHand(middleHand);

    var isRoyal = false;

    for (var i = 0; i < cHand.length - 5; i++) {
      for (var j = i; j < cHand.length - 5 - i; j++) {
        if (!cHand.isRoyal) {
          break;
        } else if (j === cHand.length - i - 6) {
          isRoyal = true;
        }
      }
    }

    return isRoyal;
  }

  _isStraightFlush(middleHand) { // broken
    return this._isFlush(middleHand) && this._isStraight(middleHand);
  }

  _isFourOfAKind() { // not finished

  }

  _isFullHouse() { // not finished

  }

  _flush(middleHand) { // broken
    const cHand = this._combinedHand(middleHand);
    const diff = cHand.length - 5;
    if (diff < 0) {
      throw 'Not enough cards in hand to be a straight.';
    }

    var diffSuit = 0;

    for (var i = 0; i < diff; i++) {
      for (var j = i; j < 4 + i; j++) { // implement while
        if (diffSuit === 0) {
          diffSuit = cHand._cards[j+1].suit - cHand._cards[j].suit;
          if (j === 3 + i) {
            break;
          }
        }
      }
    }

    return diffSuit === 0;
  }

  _straight(middleHand) {
    const cHand = this._combinedHand(middleHand);
    if (cHand.length - 5 < 0) {
      throw 'Not enough cards in hand to be a straight.';
    }

    const cards = cHand.cards;

    var straight = [];

    for (var i = 0; i < cHand.length - 5; i++) {
      var index = cHand.length - i - 1;
      if (cards[index].value - cards[index - 1].value === 1 // messy af
        && cards[index - 1].value - cards[index - 2].value === 1
        && cards[index - 2].value - cards[index - 3].value === 1
        && cards[index - 3].value - cards[index - 4].value === 1) {
        straight.push([cards[index], cards[index - 1], cards[index - 2], cards[index - 3], cards[index - 4]]);
      }
    }

    const highStraight = straight[0]; // since loop started at the end of the hand of cards

    return highStraight;
  }

  _threeOfAKind(middleHand) {
    if (this.length === 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    var three = []

    for (var i = 0; i < cHand.length - 2; i++) {
      if (cHand._cards[i].compare(cHand._cards[i + 1]) === CardValue['Equal']
      && cHand._cards[i + 1].compare(cHand._cards[i + 2]) === CardValue['Equal']) {
        three.push([cHand._cards[i], cHand._cards[i + 1], cHand._cards[i + 2]]);
      }
    }

    const highThree = three[three.length - 1];

    return highThree;
  }

  _twoPair(middleHand) {
    if (this.length === 0) {
      throw 'No cards in hand.';
    }
    const cHand = this._combinedHand(middleHand);

    const pairs = [];

    for (var i = 0; i < cHand.length - 1; i++) {
      if (cHand._cards[i].compare(cHand._cards[i + 1]) === CardValue['Equal']) {
        pairs.push([cHand._cards[i], cHand._cards[i + 1]]);
      }
    }

    const twoPairs = [];

    for (var i = 0; i < pairs.length - 1; i++) {
      if (pairs[i][0].compare(pairs[i + 1][0]) !== CardValue['Equal']) {
        twoPairs.push([pairs[i], pairs[i + 1]]);
      }
    }

    const highTwoPair = twoPairs[twoPairs.length - 1];

    return hTwoPair;
  }

  _highPair(middleHand) {
    if (this.length === 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    const pairs = []

    for (var i = 0; i < cHand.length - 1; i++) {
      if (cHand._cards[i].compare(cHand._cards[i + 1]) === CardValue['Equal']) {
        pairs.push([cHand._cards[i], cHand._cards[i + 1]]);
      }
    }

    const highPair = pairs[pairs.length - 1];

    return highPair;
  }

  _highCard(middleHand) {
    if (this.length === 0) {
      throw 'No cards in hand to get a high card.';
    }

    // getting last card in the combinded hand
    const highCard = this._combinedHand(middleHand)._cards[this.length + middleHand.length - 1];
    return highCard;
  }
}


class Player { // incomplete
  constructor(money, hand) {
    this._hand = hand || null;
    this._totalMoney = money;
    this._raise = null;
  }

  makeDecision() {
    // do stuff
  }

  set raise(r) {
    this._raise = r;
  }

  set hand(h) {
    this._hand = h;
  }

  get hand() {
    return this._hand;
  }

  get raise() {
    if (this._raise) {
      const val = this._raise;
      this._totalMoney -= val;
      this._raise = null;
    } else {
      throw 'No raise!';
    }
    return val;
  }
}
