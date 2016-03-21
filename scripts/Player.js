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

class PlayerHand extends Hand { // implement some sort cloning thing for setting and getting values!!!
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

  _isFourOfAKind() {

  }

  _isFullHouse() {

  }

  _isFlush(middleHand) { // broken
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

  _isStraight(middleHand) { // broken
    const cHand = this._combinedHand(middleHand);
    const diff = cHand.length - 5;
    if (diff < 0) {
      throw 'Not enough cards in hand to be a straight.';
    }

    var diffValue = 1;

    for (var i = 0; i < diff; i++) {
      for (var j = i; j < 4 + i; j++) { // implement while
        if (diffValue === 1) {
          diffValue = cHand._cards[j+1].value - cHand._cards[j].value;
          if (j === 3 + i) {
            break;
          }
        }
      }
    }

    return diffValue === 1;
  }

  _isThreeOfAKind(middleHand) {
    if (this.length === 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    for (var i = 0; i < cHand.length; i++) {
      for (var j = 0; j < cHand.length; j++) {
        for (var n = 0; n < cHand.length; n++) {
          if (cHand._cards[i].compare(cHand._cards[j]) === 0 && cHand._cards[j].compare(cHand._cards[n]) && i !== j && j !== n) {
            return [cHand._cards[i], cHand._cards[j], cHand._cards[n]];
          }
        }
      }
    }
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

    var hTwoPair = twoPairs[0];

    var hValue = hTwoPair[0][0].value + hTwoPair[0][1].value + hTwoPair[1][0].value + hTwoPair[1][1].value;

    // console.log(twoPairs)

    for (var i = 1; i < twoPairs.length - 1; i++) { // broken
      const pairsA = twoPairs[i];
      const pairsB = twoPairs[i + 1];
      const valueA = pairsA[0][0].value + pairsA[0][1].value + pairsA[1][0].value + pairsA[1][1].value;
      const valueB = pairsB[0][0].value + pairsB[0][1].value + pairsB[1][0].value + pairsB[1][1].value;

      if (valueA > hTwoPair && valueA > valueB) {
        hTwoPair = pairsA;
        hValue = valueA;
      } else if (valueB > hTwoPair && valueB > valueA) {
        hTwoPair = pairsA;
        hValue = valueA
      }
    }

    return hTwoPair;
  }

  _isOnePair(middleHand) {
    return this._highPair(middleHand) instanceof Array;
  }

  _highPair(middleHand) {
    if (this.length === 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    var pairs = []

    for (var i = 0; i < cHand.length - 1; i++) {
      if (cHand._cards[i].compare(cHand._cards[i + 1]) === CardValue['Equal']) {
        pairs.push([cHand._cards[i], cHand._cards[i + 1]]);
      }
    }

    var hPair = pairs[0];

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]
      if (pair[0].deepCompare(hPair[0]) === CardValue['Greater'] || pair[1].deepCompare(hPair[1] === CardValue['Greater'])) {
        hPair = pair;
      }
    }
    return hPair;
  }

  _highCard(middleHand) {
    if (this._cards.length === 0) {
      throw 'No cards in hand to get a high card.';
    }
    const cHand = this._combinedHand(middleHand);
    var hCard = cHand._cards[0];

    for (var i = 0; i < cHand.length; i++) {
      const c = cHand._cards[i].deepCompare(hCard);
      if (c > 0) {
        hCard = cHand._cards[i];
      }
    }
    return hCard;
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
