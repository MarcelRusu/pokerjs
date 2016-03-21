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

  getCard(i) {
    // console.log('j')
    if (i < 0) {
      return this._cards[this.length + i];
    } else {
      return this._cards[i];
    }
  }

  addCard(card) {
    if (!this.contains(card)) {
      // finds first index where inserted card is less than some card in the hand
      for (var i = 0; i < this.length; i++) {
        if (card.deepCompare(this._cards[i]) === CardValue['Less']) {
          break;
        }
      }
      // console.log(i)
      const index = i;
      var nCards = [];
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

class HandBySuit extends Hand { // ehhhhh do we need this???
  constructor(cards) {
    super(cards);
  }

  get length() {
    return super.length;
  }

  getCard(i) {
    return super.getCard(i);
  }

  addCards(cards) {
    for (var i = 0; i < cards.length; i++) {
      this.addCard(cards[i]);
    }
  }

  addCard(card) {
    if (!this.contains(card)) {
      // finds first index where inserted card is less than some card in the hand
      for (var i = 0; i < this.length; i++) {
        if (card.suit < this._cards[i].suit) {
          break;
        }
      }
      // console.log(i)
      const index = i;
      var nCards = [];
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

  pop() {
    return super.pop();
  }

  get cards() {
    return super.cards;
  }

  contains(card) {
    return super.contains(card);
  }

  get str() {
    return super.str;
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


  getCard(i) {
    super.getCard(i);
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

  _flush(middleHand) {
    const cHand = new HandBySuit(this._combinedHand(middleHand).cards);
    if (cHand.length - 5 < 0) {
      throw 'Not enough cards in hand to be a straight.';
    }

    const flushes = [];

    for (var i = 0; i < cHand.length - 4; i++) {
      if (cHand.getCard(i).suit === cHand.getCard(i + 1).suit
      && cHand.getCard(i + 1).suit === cHand.getCard(i + 2).suit
      && cHand.getCard(i + 2).suit === cHand.getCard(i + 3).suit
      && cHand.getCard(i + 3).suit === cHand.getCard(i + 4).suit) {
        flushes.push([cHand.getCard(i), cHand.getCard(i + 1), cHand.getCard(i + 2), cHand.getCard(i + 3), cHand.getCard(i + 4)]);
      }
    }

    const hFlush = flushes[flushes.length - 1];

    return hFlush;
  }

  _straight(middleHand) {
    const cHand = this._combinedHand(middleHand);
    if (cHand.length - 5 < 0) {
      throw 'Not enough cards in hand to be a straight.';
    }

    var straight = [];

    for (var i = 0; i < cHand.length - 1; i++) { // CLEAN UP PLZZZ
      var index = cHand.length - i - 1;
      // console.log(index - 4);
      // console.log(cHand.getCard(index).str + ' '
      // + cHand.getCard(index - 1).str + ' '
      // + cHand.getCard(index - 2).str + ' '
      // + cHand.getCard(index - 3).str + ' '
      // + cHand.getCard(index - 4).str);
      var diff1 = cHand.getCard(index).diff(cHand.getCard(index - 1));
      var diff2 = cHand.getCard(index - 1).diff(cHand.getCard(index - 2));
      var diff3 = cHand.getCard(index - 2).diff(cHand.getCard(index - 3));
      var diff4 = cHand.getCard(index - 3).diff(cHand.getCard(index - 4));

      // console.log(diff1, diff2, diff3, diff4);

      if (diff1 === 1 && diff2 === 1 && diff3 === 1 && diff4 === 1) {
        straight.push([cHand.getCard(index), cHand.getCard(index - 1),
                      cHand.getCard(index - 2), cHand.getCard(index - 3),
                      cHand.getCard(index - 4)]);
      }
    }

    const highStraight = new Hand(straight[0]); // since loop started at the end of the hand of cards

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

    const highThree = new Hand(three[three.length - 1]);

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

    const handTwoPair = new Hand(twoPairs[0].concat(twoPairs[0]));

    return handTwoPair;
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

    const highPair = new Hand(pairs[pairs.length - 1]);

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
