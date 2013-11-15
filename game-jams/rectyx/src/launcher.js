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
        // Load assets
        // Crafty.scene("load", function() {
        //     Crafty.load([
        //         "assets/terrain.png", 
        //         "assets/RunningDood_Moosader.png",
        //         "assets/flames_0.png",
        //         "assets/zombie.png",
        //         ], 
        //     function() {
        //         // load gfx
        //         Crafty.sprite("assets/terrain.png", {
        //             terrain: [0, 0]
        //         });
        //         Crafty.sprite("assets/RunningDood_Moosader.png", {
        //             player: [0, 0, 80, 30],
        //         });
        //         Crafty.sprite("assets/flames_0.png", {
        //             flame: [0, 0, 16, 16],
        //         });
        //         Crafty.sprite("assets/zombie.png", {
        //             zombie: [0, 0, 32, 64],
        //         });
                
        //         $('#loading').hide();
        //         Crafty.scene('game');
        //     },
        //     // On Progress
        //     function(e) {
        //         $('#loading').html('Loaded: ' + e.percent.toFixed(0) + '%');
        //     },
        //     // On Error
        //     function(e) {
        //         $('#loading').html('Could not load: ' + e.src);
        //     });
        // });
        // load
        // Crafty.scene('load');
        Crafty.scene('game');
    }
 
};