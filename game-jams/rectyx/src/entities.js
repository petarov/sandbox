/**
 * entities.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

Crafty.c('Qube', {
    Qube: function() {
        return this;
    },
    init: function() {
        this.requires('Collision');
    },
    doPhysics: function() {
        this.x += this.xspeed;
        this.y += this.yspeed;

        if (this.x + this.w < 0) {
            //this.xspeed = -this.xspeed;
            this.x = _Globals.ScreenWidth;
        } else if (this.x > _Globals.ScreenWidth) {
            // this.xspeed = -this.xspeed;
            // this.x = _Globals.ScreenWidth - this.w;
            this.x = -this.w;
        }
        if (this.y + this.h < 0) {
            // this.yspeed = -this.yspeed;
            // this.y = 1;
            this.y = _Globals.ScreenHeight;
        } else if (this.y > _Globals.ScreenHeight) {
            // this.yspeed = -this.yspeed;
            // this.y = _Globals.ScreenHeight - this.h;
            this.y = -this.h;
        }

        var hits = this.hit('Qube');
        if (hits) {
            var e = hits[0].obj;
            var tmpx = this.xspeed;
            var tmpy = this.yspeed;
            this.xspeed = e.xspeed;
            this.yspeed = e.yspeed;
            e.xspeed = tmpx;
            e.yspeed = tmpy;
        }       
    }
});
/**
 * Player Entity
 */
var player = {

    entity: null,

    init: function() {
        //TODO
    },

    create: function() {

        var player = Crafty.e("2D, " + _Globals.render + ", Qube, player, Color, Tint, Multiway")
        .attr({
            move: {left: false, right: false, up: false, down: false},
            x: _Globals.ScreenWidth / 2 - _Globals.qubeWidth / 2, 
            y: _Globals.ScreenHeight / 2 - _Globals.qubeHeight /2, 
            z: _Globals.zbase + 1,
            w: _Globals.qubeWidth, h: _Globals.qubeHeight,
            xspeed: 0,
            yspeed: 0,
            acc: _Globals.playerAcc
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

            this.doPhysics();
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

        this.entity = player;
    },

    remove: function() {
        if (this.entity)
            this.entity.destroy();
    },

    getX: function() {
        return this.entity.x;
    },

    getY: function() {
        return this.entity.y;
    }

};
/**
 * Enemy Entity
 */
var enemy = {

    positions: {
        topLeft: 'topleft',
        topRight: 'topRight',
        bottomLeft: 'bottomLeft',
        bottomRight: 'bottomRight'
    },

    enemies: null,

    init: function() {
        this.enemies = [];
    },

    add: function(where, vSpeed) {

        var vPos = {};
        switch(where) {
            case this.positions.topLeft:
                vPos.x = 5; vPos.y = 5;
            break;
            case this.positions.topRight:
                vPos.x = _Globals.ScreenWidth - 55; vPos.y = 5;
            break;
            case this.positions.bottomLeft:
                vPos.x = 5; vPos.y = _Globals.ScreenHeight - 50 - 5;
            break;
            case this.positions.bottomRight:
                vPos.x = _Globals.ScreenWidth - 55; vPos.y = _Globals.ScreenHeight - 50 - 5;
            break;
        }

        if (typeof vSpeed === 'undefined') {
            vSpeed = {x: 0.5, y: 0.5};
        }

        var entity = Crafty.e("2D, " + _Globals.render + ", Qube, enemy, Color, Tint")
        .attr({
            x: vPos.x, 
            y: vPos.y, 
            z: _Globals.zbase + 1,
            w: _Globals.qubeWidth, h: _Globals.qubeHeight,
            xspeed: vSpeed.x,
            yspeed: vSpeed.y
        })
        .origin('center')
        .color("#00aaa2")
        .bind("EnterFrame", function() {
            this.doPhysics();

        });

        this.enemies.push(entity);
    },

    removeAll: function() {
        for (var i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].destroy();
        }
    }
};
