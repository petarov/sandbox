const tools = require('./tools');

class BattleMode {

  constructor(id) {
    this._id = id;
    this._last = [];
    this._left = 0;
    this._right = 0;
    this._up = 0;
    this._down = 0;
    this._fire = 0;
    this._phi = 0;
  }

  get left() {
    return this._left;
  }
  get right() {
    return this._right;
  }
  get up() {
    return this._up;
  }
  get down() {
    return this._down;
  }
  get fire() {
    return this._fire;
  }
  get phi() {
    return this._phi;
  }
  
  r_guard_g(frame, data) {
    this._phi = tools.rad(tools.rnd(0, 360));
    this._fire = 1;

    if (frame < 35) {
      this._down = 1;
    } else if (frame < 75) {
      this._left = 1;
      this._down = 0;
    } else {
      this._left = 0;
      this._down = 0;
      let me = tools.getMe(this._id, data);
      if (me) {
        if (me.y < 3200) {
          this._right = 1;
          this._down = 1;
          if (me.x > 4100) {
            this._right = 0;
            this._left = 1;
          }
        } else {
          this._down = 0;
          if (me.x > 3300) {
            this._left = 1;
            this._right = 0;
          } else if (me.x < 3200) {
            this._left = 0;
            this._right = 1;
          } else {
            this._left = 0;
            this._right = 0;
          }
        }
      }
    }
  }

  b_cap_1(frame, data) {
    this._phi = tools.rad(tools.rnd(0, 360));
    this._fire = 1;

    let me = tools.getMe(this._id, data);
    if (me) {
      if (me.y > 3300) {
        if (me.x > 9050) {
          this._right = 0;
          this._left = 1;
          this._up = 1;
        } else if (me.x < 8800) {
          this._right = 1;
          this._left = 0;
          this._up = 1;
        } else {
          this._right = 0;
        }
      } else {
        this._right = 0;
        this._left = 1;
        this._up = 0;

        if (me.x < 3200) {
          this._left = 0;
        }
      }
    }
  }

  b_guard_1(frame, data) {
    this._phi = tools.rad(tools.rnd(0, 360));
    this._fire = 1;

    if (frame < 50) {
      this._up = 1;
    } else if (frame < 70) {
      this._left = 1;
    } else if (frame < 270) {
      this._left = 1;
      this._up = 0;
    } else if (frame < 450) {
      this._up = 1;
      this._left = 0;
    } else {
      // this._up = 0;
      // this._down = 0;
      // this._left = 0;
      // this._right = 0;

      let me = tools.getMe(this._id, data);
      if (me) {
        if (me.x < 9200) {
          this._right = 1;
          this._left = 0;
        } else {
          this._right = 0;
          this._left = 1;
        }
        if (me.y > 10000) {
          this._up = 1;
          this._down = 0;
        } else if (me.y < 15000) {
          this._up = 0;
          this._down = 1;
        } else {
          this._up = 0;
          this._down = 0;
        }
      }
    }
  }

  b_cap_2(frame, data) {
      this._fire = 1;
      this._phi = tools.rad(tools.rnd(0, 360));
      this._left = 1;
      this._up = 1;

      if (frame > 900 && frame < 1200) {
        this._down = 1;
        this._up = 0;
      }
      if (frame > 1280) {
        this._down = 0;
        this._up = 1;
        this._left = 0;
        this._right = 0;
      }
  }
    
};

module.exports = BattleMode;