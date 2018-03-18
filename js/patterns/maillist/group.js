// a group - a bundle of persons

const Person = require('./person.js');

class Group {

  constructor(name) {
    this._name = name;
    this._persons = new Map();
  }

  get name() {
    return this._name;
  }

  add(person) {
    this._persons.set(person.id, person);
  }

  remove(person) {
    this._persons.delete(person.id);
  }

  get persons() {
    return this._persons;
  }

}

module.exports = Group;