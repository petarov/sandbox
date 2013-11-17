/**
 * game.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/lightsoff
 */

Crafty.scene("game", function() {
    
    // show FPS
    if (_Globals.isDebug) {
        Crafty.e("2D, " + _Globals.render + ", FPS").attr({maxValues:10})
        .bind("MessureFPS", function(fps) {
            $('#fps').text('FPS: ' + fps.value);
        });
    }

    Crafty.e("Keyboard").bind('KeyDown', function() {
        if (this.isDown('M')) {
            _Globals.isMusic = !_Globals.isMusic;
            $('#music').html(_Globals.isMusic ? 'On' : 'Off');
            if (!_Globals.isMusic) {
                Crafty.audio.stop('music');
            } else {
                Crafty.audio.play('music', -1);
            }
        }
        if (this.isDown('N')) {
            _Globals.isAudio = !_Globals.isAudio;
            $('#sound').html(_Globals.isAudio ? 'On' : 'Off');
        }        
    });

    Crafty.bind("nextLevel", function() {
        player.remove();
        enemy.removeAll();
        level.nextLevel();
        $('#level').html(level.getLevel());
    });
    Crafty.trigger('nextLevel');
});
