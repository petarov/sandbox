/* the in game stuff*/
game.PlayScreen = me.ScreenObject.extend({

    "init" : function () {
        me.game.viewport.setBounds(768, 448);
        this.parent(true);
    },    
 
    onResetEvent: function() {
        // stuff to reset on state change
        // load a level
        me.levelDirector.loadLevel("map01");
        // 
        me.game.world.addChild(new game.Entity(50, 50, {
            "width" : 50,
            "height" : 50,
            "color" : "red"
        }));

                 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");        
        me.input.bindKey(me.input.KEY.X,     "jump", true);        
    },
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {
    }
 
});