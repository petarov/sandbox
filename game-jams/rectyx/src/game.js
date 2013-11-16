/**
 * game.js
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

        if (this.x < 0) {
            this.xspeed = -this.xspeed;
            this.x = 1;
        } else if (this.x + this.w > _Globals.ScreenWidth) {
            this.xspeed = -this.xspeed;
            this.x = _Globals.ScreenWidth - this.w;
        }
        if (this.y - 1 < 0) {
            this.yspeed = -this.yspeed;
            this.y = 1;
        } else if (this.y + this.h > _Globals.ScreenHeight) {
            this.yspeed = -this.yspeed;
            this.y = _Globals.ScreenHeight - this.h;
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

Crafty.scene("game", function() {

	var render = _Globals.render;
    
    // show FPS
    Crafty.e("2D, " + render + ", FPS").attr({maxValues:10})
    .bind("MessureFPS", function(fps) {
        $('#fps').text('FPS: ' + fps.value);
    });


	player.create(); 

    enemy.add(enemy.positions.topLeft);
    enemy.add(enemy.positions.topRight, {x: 2.5, y: 2.5});
    enemy.add(enemy.positions.bottomRight, {x: 1.5, y: 2.5});

});
