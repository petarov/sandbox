// a journey ends, or rather just begins
import paper from 'paper';
import TWEEN from '@tweenjs/tween.js'

import './css/styles.css';
import Prelude from './scenes/prelude.js';

paper.install(window);
paper.setup('paravan');

const Defs = {
  E_FACTOR: view.size.width / 13,
  TEXT_FONT: 'Belgrano'
};

const prelude = new Prelude(Defs);
prelude.create();

let state = prelude;

view.onResize = function (event) {
  // TODO restart
}

view.onFrame = (event) => {
  // ~30fps
  if (event.count % 2 === 0) {
    state.render();
  }

  state.update(event);

  // kind of hacky, but let's not mess with requestAnimationFrame()
  // when paper does that already

  // TODO: pause?
  TWEEN.update(event.time * 1000);
}
