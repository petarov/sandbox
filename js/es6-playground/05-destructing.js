// 05 - Destructuring allows binding using pattern matching, with support for 
// matching arrays and objects.

// Basic assignment
var obj = {
  x: 50,
  y: 100,
  z: -25,
  w: 1
};

var {x, y, z, w} = obj;
console.log('Position:', x, y, z, w);

// Assignment without declaration
let a, b;
({a, b} = {a: 7, b: 17});
console.log('Assigned:', a, b);

// Assigning to new variable names
var consoles = {playstation: 100, xbox: 99, nintendo: true};
var {playstation: p, xbox: x, nintendo:n } = consoles;
console.log('Consoles:', p, x, n);

// Default values
var {aa = 10, bb = 5} = {aa: 3};
console.log('Defaults:', aa, bb);

// For of iteration and destructuring
var people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith'
    },
    age: 35
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones'
    },
    age: 25
  }
];

for (var {name: n, family: {father: f}} of people) {
  console.log('Name: ' + n + ', Father: ' + f);
}

// Unpacking fields from objects passed as function parameter
function userId({id}) {
  return id;
}

function whois({displayName, fullName: {lastName: name}}) {
  console.log(displayName + ' is ' + name);
}

var user = { 
  id: 42, 
  displayName: 'mitio',
  fullName: { 
    firstName: 'mitio',
    lastName: 'pistova'
  }  
};

console.log('userId: ' + userId(user));
whois(user);
