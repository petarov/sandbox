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

define(['jquery', 'game/conf'], function($, conf) {
	
	function init() {
		var self = this;
		
		self.init = function() {
			
			// set the scene size
			var WIDTH = conf.screen.width;
			var HEIGHT = conf.screen.height;


			// get the DOM element to attach to
			// - assume we've got jQuery to hand
			var $container = $(conf.screen.canvas_id);

			$container.css('width', WIDTH + 'px');
			$container.css('height',  HEIGHT + 'px');

			// set some camera attributes
			var VIEW_ANGLE = 45,
			    ASPECT = WIDTH / HEIGHT,
			    NEAR = 0.1,
			    FAR = 10000;

			// create a WebGL renderer, camera
			// and a scene
			var renderer = new THREE.WebGLRenderer();
			var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
			                                ASPECT,
			                                NEAR,
			                                FAR  );
			
			// the camera starts at 0,0,0 so pull it back
			camera.position.set(0, 0, 300);
			camera.lookAt(new THREE.Vector3(0, 80, 0));

			// start the renderer
			renderer.setSize(WIDTH, HEIGHT);

			// attach the render-supplied DOM element
			$container.append(renderer.domElement);
			
			// set
			self.renderer = renderer;
			self.camera = camera;
		};
		
		self.render = function(scene) {
			self.renderer.render(scene, self.camera);	
		};
	}
	
	return init;
});