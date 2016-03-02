'use strict';

var Decision = {
  'Pass'  : 0,
  'Raise' : 1,
  'Fold'  : 2
};

var HandType = {
  'Player' : 0,
  'Middle' : 1
};


class Hand { // Abstract
  constructor(cards) {
    this._cards = cards || [];
  }

  addCard() {}

  compare() {}
}

class MiddleHand extends Hand {

}

class PlayerHand extends Hand {
  constructor(cards) {
    super(cards)
  }

  compare(hand) {
    if (hand instanceof PlayerHand) {
      for (card in cards) {
        if card.equals()
      }
    }
  }

  calcHand(middleHand) {
    if () {
      if (_isRoyalFlush(middleHand)) {

      }
    }
  }

  _isRoyalFlush(middleHand) {

  }

  _isStraightFlush() {

  }

  _isFourOfAKind() {

  }

  _isFullHouse() {

  }

  _isFlush() {

  }

  _isStraight() {

  }

  _isThreeOfAKind() {

  }

  _isTwoPair() {

  }

  _isOnePair() {

  }

  _isHighCard() {

  }
}


class Player {
  constructor(money, hand) {
    this._hand = hand || null;
    this._totalMoney = money;
    this._raise = null;
  }

  makeDecision() {
    // do stuff
  }

  set raise(r) {
    this._raise = R.clone(r);
  }

  set hand(h) {
    this._hand = R.clone(h);
  }

  get hand() {
    return R.clone(this._hand);
  }

  get raise() {
    if (this._raise) {
      var val = this._raise;
      this._totalMoney -= val;
      this._raise = null;
    } else {
      throw 'No raise!';
    }
    return val;
  }
}
