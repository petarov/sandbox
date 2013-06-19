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
	
	var BoxConstants = {
		CUBE_SIZE: 100,
	};

	function Box(scene, color) {
		var self = this;
		
		self.cache = window._cache;
		self.scene = scene;
		
		var texture = self.cache.getSet('texCrate', function() {
			console.log('load texture');
			return THREE.ImageUtils.loadTexture('tex/cratetex.png');
		});
		
		var mat = new THREE.MeshLambertMaterial({map: texture, color: color.color});
		var cube = new THREE.Mesh(new THREE.CubeGeometry(BoxConstants.CUBE_SIZE, 
				BoxConstants.CUBE_SIZE, BoxConstants.CUBE_SIZE), mat);
		
		cube.position.y = -10;
		cube.position.z = -200;
		self.scene.add(cube);
		
		self.cube = cube;
	};

	Box.prototype = {

		rotate: function() {
		    this.cube.rotation.x += 0.05;
		    this.cube.rotation.y += 0.07;				
		}

	};

	return {
		create: function(scene, color) {
			return new Box(scene, color);
		}
	};	

});