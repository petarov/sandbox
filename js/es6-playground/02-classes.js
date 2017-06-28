// 02 - ES6 classes are a simple sugar over the prototype-based OO pattern.

class Vehicle {
  constructor(velocity, acceleration) {
    this.acceleration = acceleration;
    this.velocity = velocity;
  }

  timeStep(dt) {
    this.velocity = this.velocity + dt * this.acceleration;
  }

  velocity() {
    return this.velocity;
  }
  
  static normalize(v) {
    return Math.sqrt(v * v);
  }

}

class Jaguar extends Vehicle {
  constructor() {
    super(0, 33);
  }
}

class Skoda extends Vehicle {
  constructor() {
    super(0, 10);
  }
}

function race1() {
  console.log('--- RACE 1 ---');

  const jaguar = new Jaguar();
  const skoda = new Skoda();

  for (let i = 0; i < 10; i++) {
    jaguar.timeStep(i/10.0);
    skoda.timeStep(i/10.0);

    console.log('JAG: ' + Vehicle.normalize(jaguar.velocity));
    console.log('SKO: ' + Vehicle.normalize(skoda.velocity));
  }
}

race1();

// eof
