#!/usr/local/bin/node
const WebSocket = require('ws');
const BattleMode = require('./battlemode');
const tools = require('./tools');
const config = require('./config.json');

const COMMANDS = {
  join: `{"n":"startData","d":{"name":"__NAME__","skin":"__SKIN__"}}`,
  ping: `{"n":"pong2","d":0}`
}

let teamId = 0, 
  pickles = 0,
  joined = 0,
  mode = '';

if (process.argv.length < 3) {
  console.log('Missing team id!');
  return;
} else if (process.argv.length < 4) {
  console.log('Missing pickles number!');
  return;
} else if (process.argv.length < 5) {
  console.log('Missing battle mode!');
  return;
} else {
  var args = process.argv.slice(2);
  teamId = parseInt(args[0]);
  pickles = parseInt(args[1]);
  mode = args[2];
}

for (let i = 0; i < pickles; i++) {

  const timeout = Math.floor((Math.random() * 500) + 250) ;

  setTimeout(() => {
    let socket = new WebSocket(config.servers.e1);
    let frame = 0;
    let id = -1;
    let bm;

    const isTeamOK = function(data) {
      if (data['n'] === 'clientId') {
        if (data['d']['team'] !== teamId) {
          console.log(`!!!WRONG BUGABUGA PARTY!!! id=${i}`);
          socket.close();
          return false;
        }
        id = data['d']['id'];
        bm = new BattleMode(id);
        socket.send(COMMANDS.ping);
      }

      return true;
    };
    
    socket.onopen = function() {
      console.log(`onopen called id=${id}`);
      socket.send(tools.getName(COMMANDS.join));
      joined += 1;
    };
    
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      //console.log(`recv ${i} = `, event.data);

      if (!isTeamOK(data) || !bm) {
        return;
      }

      frame += 1;

      switch(mode) {
        case 'rg1':
          bm.r_guard_g(frame, data);
          break;
        case 'bc1':
          bm.b_cap_1(frame, data); // dgnl
          break;
        case 'bc2':
          bm.b_cap_2(frame, data);
          break;
        case 'bg1':
            bm.b_guard_1(frame, data);
          break;
        default:
          throw 'unknown juice!';
      }
      
      var payload = {
        "n":"kp","d":
        [
          frame,
          bm.left,
          bm.right,
          bm.up,
          bm.down,
          bm.fire,
          -bm.phi,
          16,
          0,
          // repeat ---
          frame,
          bm.left,
          bm.right,
          bm.up,
          bm.down,
          bm.fire,
          -bm.phi,
          16,
          0
        ]
      };
      //console.log(payload);
      socket.send(JSON.stringify(payload));
    };

    socket.onclose = function(event) {
        joined -= 1;
        console.log(`onclose id=${id} | joined=${joined}`);
    };

    socket.onerror = function(error) {
        console.log(`onerror id=${id} | joined=${joined}`, error);
    };
  }, timeout);

  console.log(`new pickle ${i} | to=${timeout}...`);
}

console.log('----POOF!----');
