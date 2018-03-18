// an all purpose observer object

class Observer {

  constructor(subject) {
    this._subject = subject;
  }

  get subject() {
    return this._subject;
  }

  set subject(value) {
    this._subject = value;
  }

  get id() {
    return Symbol('observer');
  }

  notify() {
    console.log(`${this._subject.name} has changed`);
  }
}

module.exports = Observer;