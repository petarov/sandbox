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
        this.eMinSpeed = _Globals.enemyMinSpeed;
        this.eMaxSpeed = _Globals.enemyMaxSpeed;
    },

    nextLevel: function() {
        // remove exit
        if (this.exit) {
            this.exit.destroy();
            this.exit = null;
        }

        // increment level props
        this.current += 1;
        // this.eMinSpeed += _Globals.enemyIncSpeed;
        // this.eMaxSpeed += _Globals.enemyIncSpeed;

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

        player.create();

        switch(this.current) {
            case 1:
                enemy.add(enemy.positions.topLeft, this.getRandomSpeed());
                enemy.add(enemy.positions.bottomRight, this.getRandomSpeed());
            break;
            case 2:
                enemy.add(enemy.positions.topLeft, this.getRandomSpeed());
                enemy.add(enemy.positions.topRight, this.getRandomSpeed());
                enemy.add(enemy.positions.bottomRight, this.getRandomSpeed());
            break;
            default:
                this.eMinSpeed += _Globals.enemyIncSpeed;
                this.eMaxSpeed += _Globals.enemyIncSpeed;            
                enemy.add(enemy.positions.topLeft, this.getRandomSpeed());
                enemy.add(enemy.positions.topRight, this.getRandomSpeed());
                enemy.add(enemy.positions.bottomRight, this.getRandomSpeed());            
                enemy.add(enemy.positions.bottomLeft, this.getRandomSpeed());
            break;
        }
    },

    getRandomSpeed: function() {
        var vec = {
            x: Math.random() * (this.eMaxSpeed - this.eMinSpeed) + this.eMinSpeed,
            y: Math.random() * (this.eMaxSpeed - this.eMinSpeed) + this.eMinSpeed
        };
        if (Math.random() * 10 > 5) {
            vec.x = -vec.x;
        }
        if (Math.random() * 10 > 5) {
            vec.y = -vec.y;
        }         
        return vec;      
    },

    getLevel: function() {
        return this.current;
    }
};