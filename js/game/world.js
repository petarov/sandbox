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
		
		self.cube = cube;

		// defaults
		self.rotateDir = Globals.Directions.NONE;
		//self.rotationMatrix = new THREE.Matrix4().identity();
	};

	World.prototype = {

		rotate: function(direction) {
			this.rotateDir = direction;
			console.log('rot');
		},

		update: function(delta) {

			var rot = true;
			var rotationMatrix;
			var rotateAngle = Math.PI / 2 * delta;

			switch(this.rotateDir) {
				case Globals.Directions.NORTH:
				rotationMatrix = new THREE.Matrix4().makeRotationX(rotateAngle);
				break;

				case Globals.Directions.SOUTH:
				rotationMatrix = new THREE.Matrix4().makeRotationX(-rotateAngle);
				break;

				case Globals.Directions.EAST:
				rotationMatrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
				break;

				case Globals.Directions.WEST:
				rotationMatrix = new THREE.Matrix4().makeRotationY(rotateAngle);
				break;

				case Globals.Directions.NONE:
				default:
				rot = false;
				break;
			}


			if (rot) {
				//var rotationMatrix = THREE.Matrix4().identity();
				this.cube.matrix.multiply(rotationMatrix);
				this.cube.rotation.setEulerFromRotationMatrix(this.cube.matrix);
			}			
		}

	};

	return {
		create: function(scene) {
			return new World(scene);
		}
	};	

});