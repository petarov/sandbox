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
	
	function GameScene(renderer, input, state) {
		/*
		 * Private members
		 */
		var self = this;
		
		self.cache = new MicroCache();
		window._cache = self.cache;

		self.renderer = renderer;
		
			
		self.input = input;
		self.gameState = state;
			
		self.scene = new THREE.Scene();
			
		// create gameplay terrain
		self.world = World.create(this.scene);
	};
	
	/*
	 * Public methods
	 */
	
	GameScene.prototype = {
						
		/*
		 * Update logic
		 */
		updateLogic: function() {
			if (this.input.isPressed('d')) {
				this.world.rotate(Globals.Directions.EAST);
			} 
			if (this.input.isPressed('a')) {
				this.world.rotate(Globals.Directions.WEST);	
			}
			if (this.input.isPressed('w')) {
				this.world.rotate(Globals.Directions.NORTH);
			}
			if (this.input.isPressed('s')) {
				this.world.rotate(Globals.Directions.SOUTH);
			}

			if (this.input.isPressed('up')) {
				this.renderer.rotateCamera(Globals.Directions.NORTH);
			}
			if (this.input.isPressed('down')) {
				this.renderer.rotateCamera(Globals.Directions.SOUTH);
			}				
		},
		/*
		 * Update motion of objects
		 */
		updatePhysics: function(delta) {
			this.world.update(delta);

			this.renderer.updateCamera(delta);
			this.renderer.getCamera().lookAt(this.world.getPosition());
		},
		/*
		 * Render game scene
		 */	
		render: function() {
			this.renderer.render(this.scene);
			
		}
		
	};

	return {
		create: function(renderer, input, state) {
			var scene = new GameScene(renderer, input, state);
			return scene;
		}
	};
	
});