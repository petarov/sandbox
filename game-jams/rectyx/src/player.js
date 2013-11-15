/**
 * player.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

// create character
var player = Crafty.e("2D, " + render + ", player, Color, Tint, Multiway")
.attr({
    move: {left: false, right: false, up: false, down: false},
    x: 304, y: 209, z: _Globals.zbase + 1,
    moving: false,
    curAngle: 0,
    hp: 100,
    kills: 0,
    w: 50, h: 50
})
.origin('center')
.color("#FA5656")
.tint("#00aaa2", 0.3)
.bind("Moved", function(from) {
    this.moving = true;
    if (this.x < 0) {
        this.x = from.x;
    } else if (this.x + this.w > _Globals.ScreenWidth) {
        this.x = from.x;
    }
    if (this.y - 1 < 0) {
        this.y = from.y;
    } else if (this.y + this.h > _Globals.ScreenHeight) {
        this.y = from.y;
    }
})
.bind("EnterFrame", function() {
    // If moving, adjust the proper animation and facing
    // 
})
.multiway(2, {W: -90, S: 90, D: 0, A: 180})
.bind("damage", function(dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
        $('#instructions').html('YOU ARE DEAD!');
        Crafty.stop();
    }
});