/**
 * game.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

// main scene
Crafty.scene("game", function() {

	var render = _Globals.render;
    
    // show FPS
    Crafty.e("2D, " + render + ", FPS").attr({maxValues:10})
    .bind("MessureFPS", function(fps) {
        $('#fps').text('FPS: ' + fps.value);
    });
    
    var zbase = 2;

    // create character
    var player = Crafty.e("2D, " + render + ", player, Color, Multiway")
    .attr({
        move: {left: false, right: false, up: false, down: false},
        x: 304, y: 209, z: zbase + 1,
        moving: false,
        curAngle: 0,
        hp: 100,
        kills: 0,
        w: 50, h: 50
    })
    .origin('center')
    .color("#FA5656")
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

});
