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
define(['jquery', 'game/terrain'], function($, Terrain) {
	
	function GameScene() {
		var self = this;
		
		var cube;
		
		self.create = function(renderer) {
			
			var scene = new THREE.Scene();
			
			var terrain = new Terrain();
			terrain.create(scene);			
			
			// dir light
			var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
			light.position.set( 0, 1, 1 ).normalize();
			scene.add(light);			
			
			// add cube
			
			var cube = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), new THREE.MeshNormalMaterial() );
			cube.position.y = 50;
			cube.position.z = 2050;
			scene.add(cube);
			self.cube = cube;
			
			this.scene = scene;
		};

		/*
		 * Update logic
		 */
		self.updateLogic = function() {
			
		};
		/*
		 * Update motion of objects
		 */
		self.updatePhysics = function() {
		    self.cube.rotation.x += 0.05;
		    self.cube.rotation.y += 0.07;		
		};
		/*
		 * Render game scene
		 */	
		self.render = function(renderer) {
			renderer.render(this.scene);
		};
		
	}
	
	return GameScene;
	
});