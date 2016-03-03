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
    this._cards.push(card);
  }

  get cards() {
    return R.clone(this._cards);
  }
}

class PlayerHand extends Hand {
  constructor(cards) {
    super(cards);
  }

  addCard(card) {
    super.addCard(card);
  }

  get cards() {
    return super.cards;
  }

  compare(hand) {
    if (hand instanceof PlayerHand) {
      for (card in cards) {

      }
    }
  }

  _combinedHand(middleHand) {
    var cHand = [];
    for (var i = 0; i < this._cards.length; i++) {
      cHand.push(this._cards[i]);
    }
    if (middleHand) {
      for (var i = 0; i < middleHand._cards.length; i++) {
        cHand.push(middleHand._cards[i]);
      }
    }
    return cHand;
  }

  calcHand(middleHand) {
    const cHand = this._combinedHand(middleHand);

    console.log(cHand)

    if (_isRoyalFlush(middleHand)) {

    }
  }

  _isRoyalFlush(middleHand) {
    const cHand = this._combinedHand(middleHand);

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

  highCard(middleHand) {
    if (this._cards.length == 0) {
      throw 'No cards in hand to get a high card.';
    }
    const cHand = this._combinedHand(middleHand);
    var hCard = cHand[0];

    for (var i = 0; i < cHand.length; i++) {
      var card = this._cards[i];
      const c = card.compare(hCard);
      if (c > 0) {
        hCard = card;
      }
    }
    return hCard;
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
