/**
 * globals.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/rectyx
 */

var _Globals = {
    render: "Canvas",
    ScreenWidth: 627,
    ScreenHeight: 418,
    zbase: 1,
    qubeWidth: 35,
    qubeHeight: 35,
    playerAcc: 0.05,
    enemyMinSpeed: 0.8,
    enemyMaxSpeed: 1.0,
    enemyIncSpeed: 0.025,
    // DBG
    isDebug: true,
    debug: function() {
    	if (this.isDebug)
    		console.log(arguments);
    }
}; 