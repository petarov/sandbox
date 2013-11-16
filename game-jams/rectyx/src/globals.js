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
    playerMaxSpeed: 3.0,
    enemyMinSpeed: 0.8,
    enemyMaxSpeed: 1.0,
    enemyIncSpeed: 0.025,
    dim: true,
    dimRadiusExit: 90,
    // DBG
    isDebug: true,
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

