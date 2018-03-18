const Person = require('./person.js');

class Group {

  constructor(name) {
    this._name = name;
    this._persons = {};
  }

  get name() {
    return this._name;
  }

  add(person) {
    this._persons[person.email] = person;
  }

  get persons() {
    return this._persons;
  }

}

module.exports = Group;