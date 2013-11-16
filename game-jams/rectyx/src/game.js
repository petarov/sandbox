/**
 * game.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

Crafty.scene("game", function() {
    
    // show FPS
    if (_Globals.isDebug) {
        Crafty.e("2D, " + _Globals.render + ", FPS").attr({maxValues:10})
        .bind("MessureFPS", function(fps) {
            $('#fps').text('FPS: ' + fps.value);
        });
    }

    Crafty.bind("nextLevel", function() {
        player.remove();
        enemy.removeAll();
        level.nextLevel();
        $('#level').html(level.getLevel());
    });
    Crafty.trigger('nextLevel');
});
