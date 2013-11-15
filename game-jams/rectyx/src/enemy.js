/**
 * enemy.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

Crafty.c('Enemy', {
    Enemy: function(playerEntity) {
        //setup animations 96x256
        this.requires("SpriteAnimation, Collision, Grid")
        .animate("walk_left", [ [0, 64], [32, 64], [64, 64] ])
        .animate("walk_right", [ [0, 128], [32, 128], [64, 128] ])
        .animate("walk_up", [ [0, 196], [32, 196], [64, 196] ])
        .animate("walk_down", [ [0, 0], [32, 0], [64, 0] ]);
        
        this.attr({x: 32, y: 20 + Math.random() * 25});
        this.playerEntity = playerEntity;
        //this.newTarget();
        return this;
    },
    init: function() {
        this.requires("2D " + _Globals.render);
    },
    // get new target/carrot position or go to random location of no targets exist
    newTarget: function(anywhere) {
        // TODO
        return this;
    }
});

var enemy = {

    positions: {
        topLeft: 'topleft',
        topRight: 'topRight',
        bottomLeft: 'bottomLeft',
        bottomRight: 'bottomRight'
    },

    enemies: [],

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

        var entity = Crafty.e("2D, " + _Globals.render + ", qube, enemy, Color, Tint, Collision")
        .attr({
            x: vPos.x, 
            y: vPos.y, 
            z: _Globals.zbase + 1,
            w: 50, h: 50,
            xspeed: vSpeed.x,
            yspeed: vSpeed.y
        })
        .origin('center')
        .color("#00aaa2")
        .bind("EnterFrame", function() {
            this.x += this.xspeed;
            this.y += this.yspeed;

            if (this.x < 0) {
                this.xspeed = -this.xspeed;
            } else if (this.x + this.w > _Globals.ScreenWidth) {
                this.xspeed = -this.xspeed;
            }
            if (this.y - 1 < 0) {
                this.yspeed = -this.yspeed;
            } else if (this.y + this.h > _Globals.ScreenHeight) {
                this.yspeed = -this.yspeed;
            }

            var hits = this.hit('qube');
            if (hits) {
                var e = hits[0].obj;
                var tmpx = this.xspeed;
                var tmpy = this.yspeed;
                this.xspeed = e.xspeed;
                this.yspeed = e.yspeed;
                e.xspeed = tmpx;
                e.yspeed = tmpy;
            }
        })
        .bind("damage", function(dmg) {
            this.hp -= dmg;
            if (this.hp <= 0) {
                $('#instructions').html('YOU ARE DEAD!');
                Crafty.stop();
            }
        });

        this.enemies.push(entity);
    },

    removeAll: function() {
        for (var i = enemies.length - 1; i >= 0; i--) {
            this.enemies[i].destory();
        }
    }
};