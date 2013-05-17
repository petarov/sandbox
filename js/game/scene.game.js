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
define(['jquery', 'game/terrain', 'game/box'], function($, Terrain, Box) {
	
	function GameScene() {
		/*
		 * Private members
		 */
		var self = this;
		
		self.cache = new MicroCache();
		self.terrain = new Terrain(self.cache);
		self.box = new Box(self.cache);
		
		/*
		 * Privileged methods
		 */
		self.init = function(input, state) {
			
			self.input = input;
			self.gameState = state;
			
			self.scene = new THREE.Scene();
			self.terrain.create(self.scene);			
			
			// dir light
			var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
			light.position.set( 0, 1, 1 ).normalize();
			self.scene.add(light);
			
			self.createBox();
		};
	};
	
	/*
	 * Public methods
	 */
	
	GameScene.prototype = {
			
		createBox: function() {
			
			// add cube
			this.box.create(this.scene);			
		},
			
		/*
		 * Update logic
		 */
		updateLogic: function() {
			if (this.input.isMoveLeft()) {
				console.log('LEFT');
			}			
		},
		/*
		 * Update motion of objects
		 */
		updatePhysics: function() {
			this.box.rotate();
		},
		/*
		 * Render game scene
		 */	
		render: function(renderer) {
			renderer.render(this.scene);
		}
		
	};

	return GameScene;
	
});