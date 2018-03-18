// mailing list - sends messages from persons to groups or single persons

const Person = require('./person.js');
const Group = require('./group.js');

class MailList {

  constructor() {
    this.pipeline = [];
  }

  send(from, to, msg) {
    if (!from instanceof Person) {
      throw 'from is not of a Person type!';
    }
    this.pipeline.push({ from, to, msg });
  }

  report() {
    for (const entry of this.pipeline) {
      const { from, to, msg } = entry;
      console.log('--------------------------------');
      console.log('From: ' + from.address);
      if (to instanceof Group) {
        console.log('To: ' + `<${to.name}>`);
        let recipients = '';
        to.persons.forEach((v, k) => {
          if (recipients !== '')
            recipients += ', ';
          recipients += v.email;
        });
        console.log('Recipients: ' + recipients);
      } else {
        console.log('To: ' + to.address);
      }
      console.log('\n' + msg);
    }
  }

}


module.exports = MailList;