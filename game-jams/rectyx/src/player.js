/**
 * player.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

var player = {

    entity: null,

    create: function() {

        var player = Crafty.e("2D, " + _Globals.render + ", Qube, player, Color, Tint, Multiway")
        .attr({
            move: {left: false, right: false, up: false, down: false},
            x: 304, 
            y: 209, 
            z: _Globals.zbase + 1,
            w: _Globals.qubeWidth, h: _Globals.qubeHeight,
            xspeed: 0,
            yspeed: 0
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
            this.checkCollision();

        })
        .multiway(2, {W: -90, S: 90, D: 0, A: 180});

        this.entity = player;
    },

    remove: function() {
        if (this.entity)
            this.entity.destroy();
    }
}
