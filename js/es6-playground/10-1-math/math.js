class MyMath {

  static sum(a, b) {
    return a + b;
  }

  static dist(x1, y1, x2, y2) {
    const p1 = x2 - x1;
    const p2 = y2 - y1;
    return Math.sqrt(p1*p1 + p2*p2);
  }
  
}

module.exports = MyMath;