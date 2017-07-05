// 12 - Proxies enable creation of objects with the full range of behaviors 
// available to host objects.

// Proxying a normal object

var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${receiver.name}!`;
  }
};

var p = new Proxy(target, handler);
p.name = 'kesten';
console.log(p.name);

// Proxying a function object

var target = function () { 
  return 'I am the target'; 
};
var handler = {
  apply: function (receiver, ...args) {
    return `I am the crosshair and ... ${receiver()}`;
  }
};

var p = new Proxy(target, handler);
console.log(p());

// eof