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
            yspeed: 0,
            acc: 0.05
        })
        .origin('center')
        .color("#FA5656")
        .tint("#00aaa2", 0.3)
        .bind("Moved", function(from) {
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
            var moving = this.move.up || this.move.down || this.move.left || this.move.right;
            if (this.move.up) {
                this.yspeed -= this.acc;
            } 
            if (this.move.down) {
                this.yspeed += this.acc;
            } 
            if (this.move.left) {
                this.xspeed -= this.acc;
            } 
            if (this.move.right) {
                this.xspeed += this.acc;
            }

            this.checkCollision();
        })
        .bind("KeyDown", function(e) {
            if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
                this.move.right = true;
            } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
                this.move.left = true;
            } else if(e.keyCode === Crafty.keys.UP_ARROW) {
                this.move.up = true;            
            } else if(e.keyCode === Crafty.keys.DOWN_ARROW) { 
                this.move.down = true;
            }
        })
        .bind("KeyUp", function(e) {
            if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
                this.move.right = false;
            } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
                this.move.left = false;
            } else if(e.keyCode === Crafty.keys.UP_ARROW) {
                this.move.up = false;            
            } else if(e.keyCode === Crafty.keys.DOWN_ARROW) { 
                this.move.down = false;
            }
        });

    },

    remove: function() {
        if (this.entity)
            this.entity.destroy();
    }
}
