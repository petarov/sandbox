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
        iterations: 5000,
        log: true,
        logPeriod: 100,
        layers: [7],
      };
        
      const data = [
        { input: 'A lot of people invest in $TSLA for the first time, because they believe in Musk.', output: '$TSLA'},
        { input: 'That was a great opening for $TGT last sunday with an up margin of 4%.', output: '$TGT'},
        { input: '$PG down 1.7% with a low cap bust on Sunday. Investors are angry af.', output: '$PG'},
        { input: 'Looks like there is no hope for the $MMM ship sailing anytime soon. Investors keep their fingers crossed anyway.', output: '$MMM'},
        { input: 'Some brave people cashed out $TSLA and $JNJ stocks today. All went home happy!', output: '$TSLA $JNJ'},
        { input: 'As usual, $GOOG are killing it in the long run.', output: '$GOOG'},
        { input: 'No more downtime for $AMZN, as they move even upper in the charts of stock success.', output: '$AMZN'},
        { input: '$NFLX with astnoishing new series, invites new subscribers and ups their game.', output: '$NFLX'},
        { input: '$SNAP out of it, if you have invested a ton of your hard earned money.', output: '$SNAP'},
        { input: 'It is gonna be a dark day for $PLUG investors, as the stock plummets even more today.', output: '$PLUG'},
        { input: 'Grab all the $GRAB you can get. Take out your wallet, drop the $GOOG and do $GRAB.', output: '$GRAB $GOOG'}
      ];

      const network = new brain.recurrent.LSTM();
      network.train(data, config);

      state.lang.net = network;  
    }

    const result = state.lang.net.run(text);
    console.log('result : ', result);

    $$('lang-result').innerHTML = result;
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
