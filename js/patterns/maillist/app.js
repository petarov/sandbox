// Mailin List - Entry point
const Observer = require('./observer.js');
const Person = require('./person.js');
const Group = require('./group.js');
const MailList = require('./maillist.js');

const people = new Map();
people.set('akata', new Person('Katzuro Akata', 'katzuro@stringcraft.org'));
people.set('tateke', new Person('Makimoro Tateke', 'maki.tate@pebblestone.net'));
people.set('taichi', new Person('Bessimo Taichi', 'bessimo@smallspace.com'));
people.set('agata', new Person('Agata Selfborn', 'agata@selfborn.net'));
people.set('bianka', new Person('Bianka Saturo', 'saturo.b@realtasks.it'));
people.set('marvin', new Person('Marvin Banks', 'banks.marvin@graysheet.br'));

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

function test02() {
  const g1 = new Group('list-marketing');
  g1.add(people.get('bianka'));
  g1.add(people.get('marvin'));

  const sender = people.get('taichi');
  const bianka = people.get('bianka');
  const o = new Observer();
  o.notify = function() {
    console.log('--- ! NOTICE ! ---')
    console.log(`${this._subject.name} had their email changed to ${this._subject.email}`);
  };
  bianka.attach(o);

  const ml = new MailList();
  ml.send(sender, g1, 'Hello everyone! Let us proceed to execution of plan A tomorrow. Greets');
  ml.report();

  // later change
  bianka.email = 'saturo.bianka@faketasks.it';
}

//test01();
test02();

// eof