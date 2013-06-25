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
	
	function Renderer() {
		var self = this;
		
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
		var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
		
		// the camera starts at 0,0,0 so pull it back
		camera.position.set(0, 0, 300);
		camera.useQuaternion = true;

		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		$container.append(renderer.domElement);
		
		// set
		self.renderer = renderer;
		self.camera = camera;

		// defaults
		self.cameraRotateAngle = 0.0;
		self.cameraRotateDir = Globals.Directions.NONE;
	};

	Renderer.prototype = {

		render: function(scene) {
			this.renderer.render(scene, this.camera);	
		},

		getCamera: function() {
			return this.camera;
		},

		rotateCamera: function(direction) {
			this.cameraRotateDir = direction;
			console.log('camera rot');

			this.cameraRotateAngle = 0;
			this.cameraMovementMat = new THREE.Matrix4().identity();

			this.cameraRot = {
				x: this.camera.rotation.x,
				y: this.camera.rotation.y,
				z: this.camera.rotation.z,

			};

			console.log(this.cameraRot);

			// var quaternion = new THREE.Quaternion();

			// switch(this.cameraRotateDir) {
			// 	case Globals.Directions.NORTH:
			// 	//quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), Math.PI / 2 );
			// 	quaternion = quaternion.setFromEuler(new THREE.Vector3(0, Math.PI / 2, 0));
			// 	break;

			// 	case Globals.Directions.SOUTH:
			// 	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), -Math.PI / 2 );
			// 	break;

			// 	case Globals.Directions.EAST:
			// 	quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );



			// 	break;

			// 	case Globals.Directions.WEST:
			// 	quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), -Math.PI / 2 );
			// 	break;
			// }

			// this.destQuat = quaternion; //new THREE.Quaternion().multiplyQuaternions(quaternion, this.cube.quaternion);
		},

		updateCamera: function(delta) {
			if (this.cameraRotateDir != Globals.Directions.NONE) {

				this.cameraRot.x += delta * 0.8;
				this.cameraRot.y -= delta * 0.8;

				this.cameraRot.y = this.cameraRot.y > Globals.Maths.PI2 ? this.cameraRot.y - Globals.Maths.PI2 : this.cameraRot.y;
				this.cameraRot.y = this.cameraRot.y < -Globals.Maths.PI2 ? this.cameraRot.y + Globals.Maths.PI2 : this.cameraRot.y;

				var rotation = new THREE.Quaternion().setFromEuler(new THREE.Vector3(0, this.cameraRot.x , 0));
				var position = new THREE.Vector3(0.0, 0.0, 210).applyQuaternion(rotation);

				//console.log(rotation);
				//console.log(position);

				var mat = new THREE.Matrix4();
				this.camera.quaternion = rotation; //mat.makeRotationFromQuaternion(rotation);
				this.camera.position = position;

				this.camera.updateMatrix();

				//this.camera.quaternion.slerp(this.destQuat, delta);

				// this.cameraMovementMat.makeTranslation(Math.cos(this.cameraRotateAngle) * 210, 
				// 	0.0,
				// 	-Math.sin(this.cameraRotateAngle) * 210);

				// this.camera.position.x = Math.sin(this.cameraRotateAngle) * Math.sin(this.cameraRotateAngle) * 300;
				// this.camera.position.y = Math.cos(this.cameraRotateAngle) * 300 + 60;
				// this.camera.position.z = 60 + Math.sin(this.cameraRotateAngle) * Math.cos(this.cameraRotateAngle) * 300;

				this.cameraRotateAngle += delta * 0.5;
				if (this.cameraRotateAngle > Globals.Maths.PI)
					this.cameraRotateDir = Globals.Directions.NONE;

				//this.camera.applyMatrix(this.cameraMovementMat);
				//console.log(this.camera.position.z);
			}
		}
	};
	
	return {
		create: function() {
			var renderer = new Renderer();
			return renderer;
		}
	};
});