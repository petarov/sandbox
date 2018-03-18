// Mailin List - Entry point

const Person = require('./person.js');
const Group = require('./group.js');
const MailList = require('./maillist.js');

function test01() {
  const g1 = new Group('list-developers');
  g1.add(new Person('Katzuro Akata', 'katzuro@stringcraft.org'));
  g1.add(new Person('Makimoro Tateke', 'maki.tate@pebblestone.net'));
  g1.add(new Person('Bessimo Taichi', 'bessimo@smallspace.com'));

  const sender = new Person('Agata Selfborn', 'agata@selfborn.net');

  const ml = new MailList();
  ml.send(sender, g1, 'Hello guys! This is a test message. Greets');
  ml.report();

  const ml2 = new MailList();
  ml2.send(sender, new Person('Katzuro Akata', 'katzuro@stringcraft.org'), 
    'Hey Katzuro! How\'s it going? Cheeres!');
  ml2.report();

}

test01();

// eof