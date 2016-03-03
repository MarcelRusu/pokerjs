'use strict';

/*
  Decision <Object> to essential act like an enum for possible decisions for
  <Player> objects
*/
var Decision = {
  'Pass'  : 0,
  'Raise' : 1,
  'Fold'  : 2
};

class Hand {
  constructor(cards) {
    this._cards = cards || [];
  }

  addCard(card) {
    this._cards.push(card)
  }
}

class PlayerHand extends Hand {
  constructor(cards) {
    super(cards)
  }

  compare(hand) {
    if (hand instanceof PlayerHand) {
      for (card in cards) {
        const c = card.compare();

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
