// a person identified by name and email address

class Person {

  constructor(name, email) {
    this._name = name;
    this._email = email;
    this._observers = new Map();
  }

  _notifyObservers() {
    for (const [k, o] of this._observers) {
      //console.log(o);
      o.notify();
    }
  }

  attach(observer) {
    observer.subject = this;
    this._observers.set(observer.id, observer);
  }

  detach(observer) {
    observer.subject = null;
    this._observers.delete(observer.id);
  }

  get id() {
    return Symbol('person');
  }

  get address() {
    return this._name + ` <${this._email}>`;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this._notifyObservers();
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
    this._notifyObservers();
  }

}

module.exports = Person;