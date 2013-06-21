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
			if (this.input.isPressed('up')) {
				this.world.rotate(Globals.Directions.NORTH);
			}
			if (this.input.isPressed('down')) {
				this.world.rotate(Globals.Directions.SOUTH);
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