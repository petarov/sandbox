/**
 * entities.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/lightsoff
 */

Crafty.c('Qube', {
    Qube: function() {
        return this;
    },
    init: function() {
        this.requires('Collision');
    },
    doPhysics: function() {
        var isHit = false;

        this.x += this.xspeed;
        this.y += this.yspeed;

        var hits = this.hit('Qube');
        if (hits) {
            var e = hits[0].obj;
            var tmpx = this.xspeed;
            var tmpy = this.yspeed;
            this.xspeed = e.xspeed;
            this.yspeed = e.yspeed;
            e.xspeed = tmpx;
            e.yspeed = tmpy;
            isHit = true;
            
            // play sound
            if (_Globals.isAudio) {
                if (this.isPlayer) {
                    Crafty.audio.play('hit1');
                } else if (e.isPlayer) {
                    Crafty.audio.play('hit2');
                }
            }
        }

        var warped = false;
        if (this.x + this.w < 0) {
            //this.xspeed = -this.xspeed;
            this.x = _Globals.ScreenWidth;
            warped = true;
        } else if (this.x > _Globals.ScreenWidth) {
            // this.xspeed = -this.xspeed;
            // this.x = _Globals.ScreenWidth - this.w;
            this.x = -this.w;
            warped = true;
        }
        if (this.y + this.h < 0) {
            // this.yspeed = -this.yspeed;
            // this.y = 1;
            this.y = _Globals.ScreenHeight;
            warped = true;
        } else if (this.y > _Globals.ScreenHeight) {
            // this.yspeed = -this.yspeed;
            // this.y = _Globals.ScreenHeight - this.h;
            this.y = -this.h;
            warped = true;
        }

        if (warped) {
            var hitsb = this.hit('Qube');
            if (hitsb) {
                var plr = hitsb[0].obj;
                if (this.x < plr.x) {
                    this.x = plr.x - this.w - 2;
                    this.y = plr.y - this.h - 2;
                } else {
                    this.x = plr.x + plr.w + 2;
                    this.y = plr.y + plr.h + 2;
                }
            }
        }

        // dim if distance from player is too much
        if (_Globals.dim) {
            this.alpha = _Globals.interpAlpha(player.getX(), player.getY(), this.x, this.y);
        }

        return isHit;
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
            acc: _Globals.playerAcc,
            isPlayer: true
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

            this.xspeed = Math.min(this.xspeed, _Globals.playerMaxSpeed);
            this.yspeed = Math.min(this.yspeed, _Globals.playerMaxSpeed);

            this.doPhysics();
        })
        .bind("KeyDown", function(e) {
            if (e.keyCode === Crafty.keys.RIGHT_ARROW || e.keyCode === Crafty.keys.D) {
                this.move.right = true;
            } else if(e.keyCode === Crafty.keys.LEFT_ARROW || e.keyCode === Crafty.keys.A) {
                this.move.left = true;
            } else if(e.keyCode === Crafty.keys.UP_ARROW || e.keyCode === Crafty.keys.W) {
                this.move.up = true;            
            } else if(e.keyCode === Crafty.keys.DOWN_ARROW || e.keyCode === Crafty.keys.S) { 
                this.move.down = true;
            }
        })
        .bind("KeyUp", function(e) {
            if (e.keyCode === Crafty.keys.RIGHT_ARROW || e.keyCode === Crafty.keys.D) {
                this.move.right = false;
            } else if(e.keyCode === Crafty.keys.LEFT_ARROW || e.keyCode === Crafty.keys.A) {
                this.move.left = false;
            } else if(e.keyCode === Crafty.keys.UP_ARROW || e.keyCode === Crafty.keys.W) {
                this.move.up = false;            
            } else if(e.keyCode === Crafty.keys.DOWN_ARROW || e.keyCode === Crafty.keys.S) { 
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
        bottomRight: 'bottomRight',
        Random: 'random'
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
        if (where == this.positions.Random) {
            var i = 0;
            do {
                vPos.x = Math.random() * (_Globals.ScreenWidth);
                vPos.y = Math.random() * (_Globals.ScreenHeight);
                ok = !(_Globals.getDistance(vPos.x, vPos.y, player.getX(), player.getY()) < _Globals.dimRadiusExit);
                if (++i > 15) {
                    console.debug("spawning enemy anyway");
                    ok = true;
                }
            } while(!ok);            
        }

        // if (typeof vSpeed === 'undefined') {
        //     vSpeed = {x: 0.5, y: 0.5};
        // }

        var entity = Crafty.e("2D, " + _Globals.render + ", Qube, enemy, Color, Tint")
        .attr({
            x: vPos.x, 
            y: vPos.y, 
            z: _Globals.zbase + 1,
            w: _Globals.qubeWidth, h: _Globals.qubeHeight,
            xspeed: vSpeed.x,
            yspeed: vSpeed.y,
            isPlayer: false
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
        this.enemies.length = 0;
    }
};
