/**
 * launcher.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/lightsoff
 */

var launcher = {

    init: function() {
        // Init Crafty Engine
        Crafty.init(_Globals.ScreenWidth, _Globals.ScreenHeight, 'cr-stage').canvas.init();
        Crafty.background('#000');
        launcher.load();
    },

    load: function() {
        Crafty.scene('loading', function() {
            // see https://groups.google.com/forum/#!topic/craftyjs/h57GV5Lp0Sk
            Crafty.audio.canPlay();

            Crafty.load([
                'assets/BounceYoFrankie.mp3',
                'assets/BounceYoFrankie.ogg',
                'assets/jumpland.mp3',
                'assets/jumpland.ogg',
                'assets/sfx_push_boulder.mp3',
                'assets/sfx_push_boulder.ogg', 
                'assets/buildy.mp3',
                'assets/buildy.ogg'], 
            function() {

                Crafty.audio.add({
                    hit1: [
                        'assets/BounceYoFrankie.mp3',
                        'assets/BounceYoFrankie.ogg'],
                    hit2: [
                        'assets/jumpland.mp3',
                        'assets/jumpland.ogg'],
                    exit: [
                        'assets/sfx_push_boulder.mp3',
                        'assets/sfx_push_boulder.ogg'],
                    music: [
                        'assets/buildy.ogg',
                        'assets/buildy.mp3'],                        
                });
                // all loaded, start game
                $('#loading').hide();

                // init game objects
                level.init();
                player.init();
                enemy.init();
                Crafty.audio.play('music', -1);
                Crafty.scene('game');
            },
            function(e) {
                // progress
                $('#ld').html(Math.floor(e.percent));
            },
            function(e) {
                // error
                console.error(e);
            });

        });
        
        Crafty.scene('loading');
    }
};