/**
 * globals.js
 *
 * https://github.com/petarov/sandbox/tree/master/game-jams/lightsoff
 */

var _Globals = {
    render: "Canvas",
    ScreenWidth: 627,
    ScreenHeight: 418,
    zbase: 1,
    qubeWidth: 35,
    qubeHeight: 35,
    playerAcc: 0.05,
    playerMaxSpeed: 2.5,
    enemyMinSpeed: 0.9,
    enemyMaxSpeed: 1.25,
    enemyIncSpeed: 0.025,
    dim: true,
    dimRadiusExit: 90,
    isAudio: true,
    isMusic: true,
    // DBG
    isDebug: false,
    debug: function() {
    	if (this.isDebug)
    		console.log(arguments);
    },

    /**
     * Utils
     */

    getDistance: function(x1, y1, x2, y2) {
    	var dx = x2 - x1;
    	var dy = y2 - y1;
    	return Math.sqrt(dx * dx + dy * dy);
    },

    interp: function(val, valMin, valMax, outMin, outMax) {
    	var range = valMax - valMin;
    	var outRange = outMax - outMin;
    	var result = (((val - valMin) * outRange) / range) + outMin;
    	return result;
    },

    interpAlpha: function(x1, y1, x2, y2, radius) {
    	radius = radius ? radius : this.ScreenHeight / 2.5
    	var dist = this.getDistance(x1, y1, x2, y2);
    	var result = this.interp(dist, 1, radius, 0.0, 1.0);
    	result = Math.min(result, 1.0);
    	result = 1.0 - result;
    	result = Math.max(result, 0.0);
    	return result;
    }
}; 

