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
    this.length = this._cards.length;
  }

  addCard(card) {
    this._cards.push(card);
    this.length += 1;
  }

  pop(i) {
    if (this.length === 0) {
      throw 'No cards in hand.'
    }
    const c = this._cards.pop(i);
    this.length -= 1;
    return c;
  }

  get cards() {
    return R.clone(this._cards);
  }

  contains(card) {
    for (var i = 0; i < this._cards; i++) {
      if (this._cards[i].deepCompare(card) === 0) { // meaning they are equal
        return true;
      }
    }
    return false;
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

  contains(card) {
    return super.contains(card);
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

  _isThreeOfAKind(middleHand) {
    if (this._cards.length == 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    for (var i = 0; i < cHand.length; i++) {
      for (var j = 0; j < cHand.length; j++) {
        for (var n = 0; n < cHand.length; n++) {
          if (cHand[i].compare(cHand[j]) === 0 && cHand[j].compare(cHand[n]) && i !== j && j !== n) {
            return [cHand[i], cHand[j], cHand[n]];
          }
        }
      }
    }
  }

  _isTwoPair(middleHand) {
    if (this._cards.length == 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    var hands = [];

    for (var i = 0; i < cHand.length; i++) {
      for (var j = 0; j < cHand.length; j++) {
        const couple = [cHand[i], cHand[j]];
        var cond = cHand[i].compare(cHand[j]) === 0 && i !== j;
        if (hands.length > 0) {
          if (hands.length == 2) {
            return hands;
          }
          cond = cHand[i].compare(cHand[j]) === 0
          && i !== j && hands[0].indexOf(couple[0]) === -1
          && hands[0].indexOf(couple[1]) === -1;
        }
        if (cond) {
          hands.push(couple);
        }
      }
    }
  }

  _isOnePair(middleHand) {
    if (this._cards.length == 0) {
      throw 'No cards in hand.';
    }

    const cHand = this._combinedHand(middleHand);

    for (var i = 0; i < cHand.length; i++) {
      for (var j = 0; j < cHand.length; j++) {
        if (cHand[i].compare(cHand[j]) === 0 && i !== j) {
          return [cHand[i], cHand[j]];
        }
      }
    }
  }

  highCard(middleHand) {
    if (this._cards.length == 0) {
      throw 'No cards in hand to get a high card.';
    }
    const cHand = this._combinedHand(middleHand);
    var hCard = cHand[0];

    for (var i = 0; i < cHand.length; i++) {
      const c = cHand[i].deepCompare(hCard);
      if (c > 0) {
        hCard = cHand[i];
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
