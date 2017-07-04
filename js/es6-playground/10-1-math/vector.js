class MyVector {
  constructor(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get z() {
    return this._z;
  }

  magnitude() {
    let {x, y, z} = this;
    return Math.sqrt(x * x +y * y + z * z);
  }

  normalize() {
    let mag = this.magnitude();
    this._x /= mag;
    this._y /= mag;
    this._z /= mag;
  }
  
}

module.exports = MyVector;