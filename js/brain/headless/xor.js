const brain = require('brain.js');
const net = new brain.NeuralNetwork();
// const net = new brain.NeuralNetworkGPU();

const xorTrainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

console.time('training');

net.train(xorTrainingData);

console.timeEnd('training');

console.time('running');

for (let i = 0; i < 10_000; i++) {
  net.run([0, 0]);
  net.run([0, 1]);
  net.run([1, 0]);
  net.run([1, 1]);
}

console.timeEnd('running');
