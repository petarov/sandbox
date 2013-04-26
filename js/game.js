/*
 * The MIT License
 * 
 * Copyright (c) 2013 Petar Petrov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
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
    	},
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

require(['game/conf', 'game/renderer', 'game/scene.game', 'jquery', 'tree', 'stats', 'plugin/domReady!'], 
		function(conf, Renderer, GameScene, $) {
	
	var renderer = new Renderer();
	renderer.init();
	
	var gameScene = new GameScene();
	gameScene.create();
	
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
	
//	// create the sphere's material
//	var sphereMaterial = new THREE.MeshLambertMaterial(
//	{
//	    color: 0xFCFF00
//	});	
//	
//	// set up the sphere vars
//	var radius = 50, segments = 16, rings = 16;
//
//	// create a new mesh with sphere geometry -
//	// we will cover the sphereMaterial next!
//	var sphere = new THREE.Mesh(
//	   new THREE.SphereGeometry(radius, segments, rings),
//	   sphereMaterial);
//
//	// add the sphere to the scene
//	init.scene.add(sphere);
//
//	// and the camera
//	init.scene.add(init.camera);

	
//	// create a point light
//	var pointLight = new THREE.PointLight( 0xFFFFFF );
//	pointLight.position.x = 10;
//	pointLight.position.y = 50;
//	pointLight.position.z = 230;
//	init.scene.add(pointLight);

	gameScene.render(renderer);
});
