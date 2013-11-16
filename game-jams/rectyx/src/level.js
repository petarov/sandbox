/**
 * level.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

var level = {

    current: 0,

    init: function() {
        this.current = 0;
        this.exit = null;
    },

    nextLevel: function() {

        if (this.exit) {
            this.exit.destroy();
            this.exit = null;
        }

        this.current += 1;

        var size = 20;
        var pos = {
            x: Math.random() * (_Globals.ScreenWidth - size) + 5,
            y: Math.random() * (_Globals.ScreenHeight - size) + 5
        };

        this.exit = Crafty.e("2D, " + _Globals.render + ", goal, Color, Tint, Collision")
        .attr({
            move: {left: false, right: false, up: false, down: false},
            x: pos.x, 
            y: pos.y, 
            z: _Globals.zbase + 1,
            w: size, h: size,
        })
        .origin('center')
        .color("#EE1111")
        .bind("EnterFrame", function() {

            var hits = this.hit('player');
            if (hits) {
                var player = hits[0].obj;
                Crafty.trigger('nextLevel');
            }
        });

        //
        //
        player.create();

        enemy.add(enemy.positions.topLeft);
        enemy.add(enemy.positions.topRight, {x: 2.5, y: 2.5});
        enemy.add(enemy.positions.bottomRight, {x: 1.5, y: 2.5});
    },

    getLevel: function() {
        return this.current;
    }
};