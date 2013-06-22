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

define([], function() {
	
	function World(scene) {
		var self = this;
		
		self.cache = window._cache;
		self.scene = scene;

		var materialArray = [];
		for (var i = 1; i <= 6; i++) {
			var texture = self.cache.getSet('texCrate' + i, function() {
				return THREE.ImageUtils.loadTexture('tex/face' + i + '.png');
			});

			materialArray.push(new THREE.MeshPhongMaterial({map: texture, color: 0xaabbff}));
		}

		var mat = new THREE.MeshFaceMaterial(materialArray);
		var geometry = new THREE.CubeGeometry(Globals.CUBE_SIZE, 
			Globals.CUBE_SIZE, Globals.CUBE_SIZE);

		/*
		This is how textures are applied:
			  3
			5 1 6 2
			  4

			Euler rotation around Y-axis of (-PI/2) sends us to world => 1	
		*/
		geometry.applyMatrix( new THREE.Matrix4().makeRotationY( -Globals.Maths.PI / 2) ); 			
		var cube = new THREE.Mesh(geometry, mat);

		// LIGHT
		var light = new THREE.PointLight(0xffffff);
		light.position.set(0, 150, 80);

		// ambient light
		var light2 = new THREE.AmbientLight(0x333333);
		light2.position.set( light.position );
		self.scene.add(light2);
		self.scene.add(light);

		// var lightbulbGeometry = new THREE.SphereGeometry( 10, 16, 8 );
		// var lightbulbMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true,  opacity: 0.8, blending: THREE.AdditiveBlending } );
		// var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
		// var materialArray = [lightbulbMaterial, wireMaterial];
		// var lightbulb = THREE.SceneUtils.createMultiMaterialObject( lightbulbGeometry, materialArray );	
		// lightbulb.position = light.position;
		// self.scene.add(lightbulb);

		
		// dir light
		//var light = new THREE.DirectionalLight( 0x1212ff, 1.5 );
		//light.position.set( 0, 80, -10 ).normalize();
		//self.scene.add(light);
		
		cube.position.y = 60;
		cube.position.z = -10;
		self.scene.add(cube);

		cube.useQuaternion = true;
		
		self.cube = cube;

		// defaults
		self.rotateDir = Globals.Directions.NONE;
		self.destQuat = null;
		//self.rotationMatrix = new THREE.Matrix4().identity();
	};

	World.prototype = {

		rotate: function(direction) {
			this.rotateDir = direction;
			console.log('rot');

			var quaternion = new THREE.Quaternion();

			switch(this.rotateDir) {
				case Globals.Directions.NORTH:
				quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), Math.PI / 2 );
				break;

				case Globals.Directions.SOUTH:
				quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI / 2 );
				break;

				case Globals.Directions.EAST:
				quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
				break;

				case Globals.Directions.WEST:
				quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), -Math.PI / 2 );
				break;
			}

			this.destQuat = new THREE.Quaternion().multiplyQuaternions(quaternion, this.cube.quaternion);

			//this.cube.quaternion.slerp(this.destQuat, 0.2);
		},

		update: function(delta) {

			// var rot = true;
			// var rotationMatrix;
			// var rotateAngle = Math.PI / 2 * delta;

			// switch(this.rotateDir) {
			// 	case Globals.Directions.NORTH:
			// 	rotationMatrix = new THREE.Matrix4().makeRotationX(rotateAngle);
			// 	break;

			// 	case Globals.Directions.SOUTH:
			// 	rotationMatrix = new THREE.Matrix4().makeRotationX(-rotateAngle);
			// 	break;

			// 	case Globals.Directions.EAST:
			// 	rotationMatrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
			// 	break;

			// 	case Globals.Directions.WEST:
			// 	rotationMatrix = new THREE.Matrix4().makeRotationY(rotateAngle);
			// 	break;

			// 	case Globals.Directions.NONE:
			// 	default:
			// 	rot = false;
			// 	break;
			// }


			if (this.rotateDir != Globals.Directions.NONE) {
				this.cube.quaternion.slerp(this.destQuat, delta);

				// this.cube.matrix.multiply(rotationMatrix);
				// this.cube.rotation.setEulerFromRotationMatrix(this.cube.matrix);
			}			
		}

	};

	return {
		create: function(scene) {
			return new World(scene);
		}
	};	

});