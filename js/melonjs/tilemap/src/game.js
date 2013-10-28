/* game namespace */
var game = {
    // Run on page load.
    onload: function () {
        // Initialize the video.
        if (!me.video.init("screen", _Globals.screenWidth, _Globals.screenHeight, true, 
            me.device.isMobile ? 2.0 : null)) {
            
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.sys.preRender = true;
        me.sys.gravity = 0;
         
        // add "#debug" to the URL to enable the debug Panel
        // if (document.location.hash === "#debug") {
        //     window.onReady(function () {
        //         me.plugin.register.defer(debugPanel, "debug");
        //     });
        // }
 
        // Initialize the audio.
        me.audio.init("mp3,ogg");
 
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
      
        // Load the resources.
        me.loader.preload(game.resources);
 
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
 
    // Run on game resources loaded.
    loaded: function () {
        //me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
     
        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", game.PlayerEntity);
                 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");        
        me.input.bindKey(me.input.KEY.X,     "jump", true);
          
        // start the game 
        me.state.change(me.state.PLAY);        
    }
};