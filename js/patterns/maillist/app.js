// Mailin List - Entry point

const Person = require('./person.js');
const Group = require('./group.js');
const MailList = require('./maillist.js');

const people = new Map();
people.set('akata', new Person('Katzuro Akata', 'katzuro@stringcraft.org'));
people.set('tateke', new Person('Makimoro Tateke', 'maki.tate@pebblestone.net'));
people.set('taichi', new Person('Bessimo Taichi', 'bessimo@smallspace.com'));
people.set('agata', new Person('Agata Selfborn', 'agata@selfborn.net'));

function test01() {
  const g1 = new Group('list-developers');
  g1.add(people.get('akata'));
  g1.add(people.get('tateke'));
  g1.add(people.get('taichi'));

  const sender = people.get('agata');

  const ml = new MailList();
  ml.send(sender, g1, 'Hello guys! This is a test message. Greets');
  ml.report();

  const ml2 = new MailList();
  ml2.send(sender, people.get('akata'), 'Hey Katzuro! How\'s it going? Cheeres!');
  ml2.report();
}

test01();

// eof