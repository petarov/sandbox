(function() {

  // --------------------------------------------------------------

  const $$ = (el) => el.indexOf('.') === 0 ? 
    document.getElementsByClassName(el)[0] : document.getElementById(el);
  const onClick = (el, fn) => $$(el).addEventListener('click', e => fn(e));
  const state = {
    lang: {}
  };

  // --------------------------------------------------------------

  const doLangCheck = function() {
    const text = $$('lang-input').value;
    console.log('Checking text : ', text);

    if (!state.lang.net) {
      const config = {
        iterations: 15000,
        log: true,
        logPeriod: 100,
        layers: [10],
      };
        
      const data = [
        { input: 'A lot of people invest in $TSLA for the first time, because they believe in Musk.', output: '$y'},
        { input: 'That was a great opening for $TGT last sunday with an up margin of 4%.', output: 'y'},
        { input: '$PG down 1.7% with a low cap bust on Sunday. Investors are angry af.', output: 'y'},
        { input: 'Looks like there is no hope for the $MMM ship sailing anytime soon. Investors keep their fingers crossed anyway.', output: 'y'},
        { input: 'Some brave people cashed out $TSLA and $JNJ stocks today. All went home happy!', output: 'y'},
        { input: 'As usual, $GOOG are killing it in the long run.', output: 'y'},
        { input: 'No more downtime for $AMZN, as they move even upper in the charts of stock success.', output: 'y'},
        { input: '$NFLX with astnoishing new series, invites new subscribers and ups their game.', output: 'y'},
        { input: '$SNAP out of it, if you have invested a ton of your hard earned money.', output: 'y'},
        { input: 'It is gonna be a dark day for $PLUG investors, as the stock plummets even more today.', output: 'y'},
        { input: 'Grab all the $GRAB you can get. Take out your wallet, drop the $GOOG and do $GRAB.', output: 'y'},

        { input: 'Grab all the stocks, no matter the price.', output: 'n'},
        { input: 'We are definitely making winnings this year. Just wait and see.', output: 'n'},
        { input: 'There are more open money slots and stocks to invest in, in the USA than any other place in the world.', output: 'n'},
        { input: 'No more downtime for Amazon, as they move even upper in the charts of stock success.', output: 'n'},
      ];

      const network = new brain.recurrent.LSTM();
      network.train(data, config);

      state.lang.net = network;  
    }

    const result = state.lang.net.run(text);
    console.log('result : ', result);

    $$('lang-result').innerHTML = result === 'yes' ? 'YES' : 'NO';
  };

  const doXor = function() {
    // provide optional config object (or undefined). Defaults shown.
    const config = {
      hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
      activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
    };
      
    // create a simple feed forward neural network with backpropagation
    const net = new brain.NeuralNetwork(config);

    net.train([{
        input: [0, 0],
        output: [0]
      },
      {
        input: [0, 1],
        output: [1]
      },
      {
        input: [1, 0],
        output: [1]
      },
      {
        input: [1, 1],
        output: [0]
      }
    ]);

    const output = net.run([1, 0]); // [0.987]

    $$('xor-result').innerHTML = output;
  };

  // --------------------------------------------------------------

  onClick('xor', doXor);
  onClick('lang-check', doLangCheck);
  

})();
