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
define(['jquery', 'game/world'], function($, World) {
	
	function GameScene() {
		/*
		 * Private members
		 */
		var self = this;
		
		self.cache = new MicroCache();
		window._cache = self.cache;
		
		/*
		 * Privileged methods
		 */
		self.init = function(input, state) {
			
			self.input = input;
			self.gameState = state;
			
			self.scene = new THREE.Scene();
			
			// create gameplay terrain
			self.world = World.create(this.scene);
		};
	};
	
	/*
	 * Public methods
	 */
	
	GameScene.prototype = {
						
		/*
		 * Update logic
		 */
		updateLogic: function() {
			if (this.input.isRotateLeft()) {
				this.world.rotate(Globals.Directions.EAST);
			} 
			if (this.input.isRotateRight()) {
				this.world.rotate(Globals.Directions.WEST);	
			}
		},
		/*
		 * Update motion of objects
		 */
		updatePhysics: function(delta) {
			this.world.update(delta);
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