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

define(['jquery'], function($) {

	var Constants = {
		TERRAIN_SIZE: 50,
		TERRAIN_SCALE: 10,
	};
		
	function Terrain(scene) {
		var self = this;
		
		self.cache = window._cache;
		
		/*
		 * Mapped floor 
		 */
		var textureFloor = self.cache.getSet('texFloor', function() {
			return THREE.ImageUtils.loadTexture('tex/synthetic_metal_04_diffuse.png');
		});
		var textureFloorSpec = self.cache.getSet('texFloorSpec', function() {
			return THREE.ImageUtils.loadTexture('tex/synthetic_metal_04_specular.png');
		});		
		
		textureFloor.wrapS = THREE.RepeatWrapping;
		textureFloor.wrapT = THREE.RepeatWrapping;
		textureFloor.repeat.set(2, 2);
		
		var matSolid = new THREE.MeshLambertMaterial({
			map: textureFloor,
			spectacularMap: textureFloorSpec});
		
		var plane = new THREE.PlaneGeometry(Constants.TERRAIN_SIZE, Constants.TERRAIN_SIZE);
		var floor = new THREE.Mesh(plane, matSolid);
		
		floor.rotation.x = - Math.PI / 2;
		floor.scale.set(Constants.TERRAIN_SCALE, Constants.TERRAIN_SCALE, Constants.TERRAIN_SCALE);
		scene.add(floor);
		
		/*
		 * Wireframe 
		 */
		var matWire = new THREE.MeshBasicMaterial({ color: 0xa00000, wireframe: true, wireframeLinewidth: 2});
		var planeTesselated = new THREE.PlaneGeometry(Constants.TERRAIN_SIZE, Constants.TERRAIN_SIZE, 25, 25);
		var frame = new THREE.Mesh(planeTesselated, matWire);
		
		frame.rotation.x = - Math.PI / 2;
		floor.position.y = -2;
		frame.scale.set(Constants.TERRAIN_SCALE, Constants.TERRAIN_SCALE, Constants.TERRAIN_SCALE);
//		scene.add(frame);
	}
	
	return {
		create: function(scene) {
			return new Terrain(scene);
		}
	};		
});