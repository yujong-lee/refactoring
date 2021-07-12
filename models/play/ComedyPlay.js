const Play = require('./Play');

class TragedyPlay extends Play {
  #audienceCount;

  constructor(audienceCount) {
    super();
    this.#audienceCount = audienceCount;
  }

  calculatePrice() {
    let thisAmount = 40000;

    if (this.#audienceCount > 30) {
      thisAmount += 1000 * (this.#audienceCount - 30);
    }

    return thisAmount;
  }
}

module.exports = TragedyPlay;
