/**
 * game.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

Crafty.scene("game", function() {

	var render = _Globals.render;
    
    // show FPS
    Crafty.e("2D, " + render + ", FPS").attr({maxValues:10})
    .bind("MessureFPS", function(fps) {
        $('#fps').text('FPS: ' + fps.value);
    });

 

    enemy.add(enemy.positions.topLeft);
    enemy.add(enemy.positions.topRight, {x: 2.5, y: 2.5});
    enemy.add(enemy.positions.bottomRight, {x: 1.5, y: 2.5});

});
