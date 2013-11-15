/**
 * enemy.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

Crafty.c('Enemy', {
    Enemy: function(playerEntity) {
        //setup animations 96x256
        this.requires("SpriteAnimation, Collision, Grid")
        .animate("walk_left", [ [0, 64], [32, 64], [64, 64] ])
        .animate("walk_right", [ [0, 128], [32, 128], [64, 128] ])
        .animate("walk_up", [ [0, 196], [32, 196], [64, 196] ])
        .animate("walk_down", [ [0, 0], [32, 0], [64, 0] ]);
        
        this.attr({x: 32, y: 20 + Math.random() * 25});
        this.playerEntity = playerEntity;
        //this.newTarget();
        return this;
    },
    init: function() {
        this.requires("2D " + _Globals.render);
    },
    // get new target/carrot position or go to random location of no targets exist
    newTarget: function(anywhere) {
        // TODO
        return this;
    }
});

var enemy = {

    add: function() {

    },

    removeAll: function() {

    }
};