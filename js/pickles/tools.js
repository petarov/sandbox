const NameGenerator = require('./node_modules/nodejs-randomnames/NameGenerator.js');

const RAD = Math.PI / 180;

class Tools {
    
  static rnd(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

  static rad(deg) {
    return deg * RAD;
  }

  static getName(command) {
    return  command.replace('__NAME__', NameGenerator.getRandomName())
    .replace('__SKIN__', 'h' + this.rnd(2, 7));
  }

  static getMe(id, p) {
    let me = false;
    if (p.n === 'np') {
      const d = p.d;
      if (d.pl && d.pl.length > 0) {
        if (d.pl[0][0] === id) {
          me = {
            phi: d.pl[0][2],
            x: d.pl[0][3],
            y: d.pl[0][4]
          };
        }
      }
    }
    return me;
  }
    
};

module.exports = Tools;