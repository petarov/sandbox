/*  
	TuxlaGL - HTML5/Javascript video game
    Copyright (C) 2013 Petar Petrov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

"use strict"; // jshint ;_;
require.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.	
    paths: {
    	game: '../game',
    	plugin: '../plugins',
    	// libs
    	jquery: "http://code.jquery.com/jquery-1.9.1.min",
        tree: 'three.min',
        stats: 'stats.min',
        underscore: 'underscore-min',
        modernizr: 'modernizr.custom.65167',
        // require.js plugins
        goog: '../plugins/goog',
        async: '../plugins/async',
        propertyParser: '../plugins/propertyParser',
    },
    shim: {
    	'underscore': {
    		exports: '_'
    	}
    },
    waitSeconds: 10,
    urlArgs: "bust=" +  (new Date()).getTime()
});
    
(function() {
	if (!Modernizr.webgl) {
		var msg = 'With a different browser you’ll get to see the WebGL experience here: get.webgl.org.';
		document.getElementById('#notice').innerHTML = msg;
	}	
	
});

require(['game/conf', 'game/renderer', 'game/scene.game', 'game/input', 
         'jquery', 'tree', 'stats', 'microcache', 'plugin/domReady!'], 
		function(conf, Renderer, GameScene, Input, $) {
	
	var renderer = new Renderer();
	renderer.init();
	
	var gameState = Globals.GameStates.GAMEPLAY;
	var input = Input.create();
	var clock = new THREE.Clock();
	
	var gameScene = new GameScene();
	gameScene.init(input, gameState);
	
	
	if (conf.showStats) {
		var stats = new Stats();
		stats.setMode(0); // FPS
		
		// Align top-left
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		document.body.appendChild( stats.domElement );
		
		setInterval(function() {
		    stats.update();
		}, 1000 / 60 );		
	}
	
	/*
	 * Loop: Render graphics
	 */
	function blit() {
		gameScene.render(renderer);
		requestAnimationFrame(blit);
	}	
	/*
	 * Loop: Positions, Collisions, Movement, etc.
	 */
	conf.intervals.physics.id = setInterval(function() {
		var delta = clock.getDelta();
		gameScene.updatePhysics(delta);
	}, conf.intervals.physics.fps );
	/*
	 * Loop: Game logic
	 */
	conf.intervals.logic.id = setInterval(function() {
		gameScene.updateLogic();
	}, conf.intervals.logic.fps );
	
	blit();
});
