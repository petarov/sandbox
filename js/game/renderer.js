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
define(['jquery'], function($) {
	
	function init() {
		var self = this;
		
		self.init = function() {
			
			// set the scene size
			var WIDTH = 800,
			    HEIGHT = 470;

			// set some camera attributes
			var VIEW_ANGLE = 45,
			    ASPECT = WIDTH / HEIGHT,
			    NEAR = 0.1,
			    FAR = 10000;

			// get the DOM element to attach to
			// - assume we've got jQuery to hand
			var $container = $('#container');

			// create a WebGL renderer, camera
			// and a scene
			var renderer = new THREE.WebGLRenderer();
			var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
			                                ASPECT,
			                                NEAR,
			                                FAR  );
			
			// the camera starts at 0,0,0 so pull it back
			camera.position.set(0, 185, 2500);

			// start the renderer
			renderer.setSize(WIDTH, HEIGHT);

			// attach the render-supplied DOM element
			$container.append(renderer.domElement);
			
			// set
			self.renderer = renderer;
			self.camera = camera;
		};
		
		self.render = function(scene) {
			// draw!
//			self.mesh = mesh;
//			self.ptlight = ptlight;
			
			self.renderer.render(scene, self.camera);	
		};
		
//		self.animate = function() {
//	        // note: three.js includes requestAnimationFrame shim
//			requestAnimationFrame( self.animate );
//			
//	        self.mesh.rotation.x += 0.01;
//	        self.mesh.rotation.y += 0.02;		
//	        self.ptlight.position.z -= 0.1;
//	        self.render(self.mesh, self.ptlight);
//		};
	}

	
	return init;
	
});