/**
 * game.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

Crafty.scene("game", function() {

    var render = _Globals.render;

    level.init();
    player.init();
    enemy.init();
    
    // show FPS
    Crafty.e("2D, " + render + ", FPS").attr({maxValues:10})
    .bind("MessureFPS", function(fps) {
        $('#fps').text('FPS: ' + fps.value);
    });

    Crafty.bind("nextLevel", function() {
        player.remove();
        enemy.removeAll();
        level.nextLevel();
    });
    Crafty.trigger('nextLevel');
});
