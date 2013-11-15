/**
 * enemy.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

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
            this.checkCollision();

        });

        this.enemies.push(entity);
    },

    removeAll: function() {
        for (var i = enemies.length - 1; i >= 0; i--) {
            this.enemies[i].destory();
        }
    }
};