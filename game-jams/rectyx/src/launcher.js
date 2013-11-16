/**
 * launcher.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

var launcher = {

    init: function() {
        // Init Crafty Engine
        Crafty.init(_Globals.ScreenWidth, _Globals.ScreenHeight, 'cr-stage').canvas.init();
        Crafty.background('#000');
        launcher.load();
    },

    load: function() {
        // init game objects
        level.init();
        player.init();
        enemy.init();
            
        Crafty.scene('game');
    }
};