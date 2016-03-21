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

const HandValue = {
  'RoyalFlush'      : 10,
  'Straight Flush'  : 9,
  'Four of a Kind'  : 8,
  'Full House'      : 7,
  'Flush'           : 6,
  'Straight'        : 5,
  'Three of a Kind' : 4,
  'Two Pair'        : 3,
  'One Pair'        : 2,
  'High Card'       : 1
}

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

  print() {
    for (var i = 0; i < this.length; i++) {
      console.log(this._cards[i].str)
    }
  }

  containsCards(cards) {
    var contains = true;
    for (var i = 0; i < cards.length; i++) {
      if (!this.contains(cards[i])) {
        contains = false;
        break;
      }
    }

    return contains;
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

  containsCards(cards) {
    return super.containsCards(cards);
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

  containsCards(cards) {
    return super.containsCards(cards);
  }

  compare(hand) { // implement
    if (hand instanceof PlayerHand) {
      const value = hand.calcHand();
      if (value > this.calcHand) {
        return -1;
      } else if (value < this.calcHand)  {
        return 1;
      } else {
        return 0;
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
    if (this._isRoyalFlush(middleHand)) {
      return HandValue['Royal Flush'];
    } else if (this._isStraightFlush(middleHand)) {
      return HandValue['Straight Flush'];
    } else if (this._isFourOfAKind(middleHand)) {
      return HandValue['Four of a Kind'];
    } else if (this._isFullHouse(middleHand)) {
      return HandValue['Full House'];
    } else if (this._flush instanceof Hand) {
      return HandValue['Flush'];
    } else if (this._straight instanceof Hand) {
      return HandValue['Straight'];
    } else if (this._threeOfAKind instanceof Hand) {
      return HandValue['Three of a Kind'];
    } else if (this._twoPair instanceof Hand) {
      return HandValue['Two Pair'];
    } else if (this._highPair instanceof Hand) {
      return HandValue['One Pair'];
    } else {
      return HandValue['High Card'];
    }
  }

  _isRoyalFlush(middleHand) {
    var cHand = this._flush(middleHand);

    var isRoyal = false;
    if (cHand instanceof Hand) {
      isRoyal = true;
      for (var i = 0; i < cHand.length; i++) {
        if (!cHand.getCard(i).isRoyal()) {
          isRoyal = false;
          break;
        }
      }
    }
    return isRoyal;
  }

  _isStraightFlush(middleHand) {
    return this._flush(middleHand) instanceof Hand && this._straight(middleHand) instanceof Hand;
  }

  _isFourOfAKind(middleHand) {
    const cHand = this._combinedHand(middleHand);
    if (cHand.length < 4) {
      throw 'Not enough cards to be a four of a kind.';
    }

    for (var i = 0; i < cHand.length - 3) {
      if (cHand.getCard(i).compare(cHand.getCard(i + 1)) === CardValue['Equal']
        && cHand.getCard(i + 1).compare(cHand.getCard(i + 2)) === CardValue['Equal']
        && cHand.getCard(i + 2).compare(cHand.getCard(i + 3)) === CardValue['Equal']) { // will only have one possible
          return new Hand([cHand.getCard(i), cHand.getCard(i + 1), cHand.getCard(i + 2), cHand.getCard(i + 3)]);
      }
    }
  }

  _isFullHouse(middleHand) {
    const pairs = this._pairs(middleHand);
    const three = this._threeOfAKind(middleHand);
    if (!(three instanceof Hand && pairs instanceof Array)) {
      throw 'no pairs or three of kinds :(';
    }

    // console.log(three.getCard(0).str + ' ' + three.getCard(1).str + ' ' + three.getCard(2).str);

    for (var i = 0; i < pairs.length; i++) {
      if (!three.containsCards(pairs[i].cards)) {
        return true;
      }
    }
    return false;
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

    if (flushes.length > 0) {
      var hFlush = new Hand(flushes[flushes.length - 1]);
    }

    return hFlush;
  }

  _straight(middleHand) {
    const cHand = this._combinedHand(middleHand);
    if (cHand.length - 5 < 0) {
      throw 'Not enough cards in hand to be a straight.';
    }

    var straight = [];

    for (var i = 0; i < cHand.length - 1; i++) {
      var index = cHand.length - i - 1;
      var diff1 = cHand.getCard(index).diff(cHand.getCard(index - 1));
      var diff2 = cHand.getCard(index - 1).diff(cHand.getCard(index - 2));
      var diff3 = cHand.getCard(index - 2).diff(cHand.getCard(index - 3));
      var diff4 = cHand.getCard(index - 3).diff(cHand.getCard(index - 4));

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

    if (three.length > 0) {
      var highThree = new Hand(three[three.length - 1]);
    }

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
    const pairs = self._pairs(middleHand);
    return pairs[pairs.length - 1];
  }

  _pairs(middleHand) {
    if (this.length === 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    const pairs = []

    for (var i = 0; i < cHand.length - 1; i++) {
      if (cHand._cards[i].compare(cHand._cards[i + 1]) === CardValue['Equal']) {
        pairs.push(new Hand([cHand._cards[i], cHand._cards[i + 1]]));
      }
    }

    return pairs;
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
