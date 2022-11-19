// Fx: flock of objects

import paper from 'paper';

const Consts = {
  TYPE_CIRCA: '_cir',
  TYPE_TRIA: '_tri',
  DIR_UP: '_dup',
  DIR_DOWN: '_down',
  DEFAULT_SPEED: 10
};

class Flock {

  constructor(type, direction, count = 50) {
    this.type = type;
    this.count = count;
    this.direction = direction;
  }

  get Consts() {
    return Consts;
  }

  set radius(value) {
    this._radius = value;
  }

  set speed(value) {
    this._speed = value;
  }

  create() {
    let path;

    switch (this.direction) {
      case Consts.DIR_UP:
        this.vector = new Point({
          angle: -90,
          length: this._speed || Consts.DEFAULT_SPEED
        });
        break;

      case Consts.DIR_DOWN:
        this.vector = new Point({
          angle: 90,
          length: this._speed || Consts.DEFAULT_SPEED
        });
        break;

      default:
        throw 'Invalid direction!';
    }

    switch (this.type) {
      case Consts.TYPE_CIRCA:
        path = new Path.Circle({
          center: [0, 0],
          radius: this._radius || 5,
          fillColor: 'white',
          strokeColor: 'black'
        });
      break;

      case Consts.TYPE_TRIA:
        path = new Path.RegularPolygon({
          center: [0, 0],
          radius: this._radius || 12,
          sides: 3,
          fillColor: 'white',
          strokeColor: 'black'
        });
      break;

      default:
        throw 'Invalid flock type!';
    }

    let symbol = new paper.Symbol(path);

    this.layer = new Layer();
    this.layer.activate();

    for (let i = 0; i < this.count; i++) {
      // The center position is a random point in the view:
      let center = Point.random().multiply(view.size);
      let placed = symbol.place(center);
      placed.scale(i / this.count + 0.001);
      placed.data.vector = new Point({
        angle: 90, //Math.random() * 360,
        length : (i / this.count) * Math.random() / 5
      });

      placed.rotate(Math.random() * 360);
    }
  }

  update() {
    // let point = new Point(50, 120);
    // point = view.center.subtract(point);

    //this.vector = this.vector.add(point.subtract(this.vector).divide(30));
    //console.log(this.vector, typeof this.vector);

    this.layer.activate();

    for (let i = 0; i < this.count; i++) {
      let item = project.activeLayer.children[i];
      const size = item.bounds.size;
      const length = this.vector.length / 10 * size.width / 10;
      item.position = item.position.add(
        this.vector.normalize(length).add(item.data.vector));

      this._keepInView(item);
    }
  }

  _keepInView(item) {
    let position = item.position;
    const viewBounds = view.bounds;

    if (position.isInside(viewBounds))
      return;

    var itemBounds = item.bounds;

    if (position.x > viewBounds.width + 5) {
      position.x = -item.bounds.width;
    }

    if (position.x < -itemBounds.width - 5) {
      position.x = viewBounds.width;
    }

    if (position.y > viewBounds.height + 5) {
      position.y = -itemBounds.height;
    }

    if (position.y < -itemBounds.height - 5) {
      position.y = viewBounds.height
    }
  }

}

export { Flock, Consts as FlockConsts };
