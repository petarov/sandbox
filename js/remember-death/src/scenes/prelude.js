// Intro Scene
import { Flock, FlockConsts } from '../fx/flock.js';
import TWEEN from '@tweenjs/tween.js'

class Scene {

  constructor(defs) {
    this.defs = defs;
  }

  create(defs) {
    this.flock = new Flock(FlockConsts.TYPE_TRIA, FlockConsts.DIR_DOWN, this.defs.E_FACTOR);
    this.flock.radius = 10;

    this.flock2 = new Flock(FlockConsts.TYPE_CIRCA, FlockConsts.DIR_UP, this.defs.E_FACTOR);

    this.flock.create();
    this.flock2.create();

    this.textTitle = new PointText({
      point: new Point(0, 0),
      content: 'D E A T H',
      fillColor: 'white',
      font: this.defs.TEXT_FONT,
      fontWeight: 'normal',
      fontSize: 35
    });
    this.textTitle.position = view.center;
    this.textTitle.applyMatrix = false;
    //this.textTitle._scale = 40;
    this.textTitle.scaling = this.textTitle.scaling.add(200);

    this.textSubtitle = new PointText({
      point: new Point(0, 0),
      content: 'A digital poem by XYZ',
      fillColor: 'white',
      font: this.defs.TEXT_FONT,
      fontWeight: 'normal',
      fontSize: 15
    });
    this.textSubtitle.position = view.center;
    this.textSubtitle.position.y += 80;
    this.textSubtitle.opacity = 0;

    let scal = { x: 200 };
    let tweenTitle = new TWEEN.Tween(scal)
    .to({ x: 2 }, 5000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function() {
      this.textTitle.scaling.x = scal.x;
      this.textTitle.scaling.y = scal.x;
    }.bind(this))
    .onComplete(function () {
      this.textTitle.scaling.x = 2;
      this.textTitle.scaling.y = 2;
    }.bind(this));

    let opac = { x: 0 };
    let tweenSubtitle = new TWEEN.Tween(opac)
      .to({ x: 1 }, 5000)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function () {
        this.textSubtitle.opacity = opac.x;
      }.bind(this))
      .onComplete(function () {
        // TOOD
      }.bind(this));

    tweenTitle.chain(tweenSubtitle);
    tweenTitle.start();

  }

  update(event) {
    //this.textTitle._scale -= 0.05;

  }

  render() {
    this.flock.update();
    this.flock2.update();
  }
}

export default Scene;
