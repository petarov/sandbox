
class Person {

  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  get address() {
    return this._name + ` <${this._email}>`;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = email;
  }

}

module.exports = Person;