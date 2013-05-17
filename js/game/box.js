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

	function Box(cache) {
		var self = this;
		
		self.cache = cache;

		self.create = function(scene) {
			
			var texture = self.cache.getSet('texCrate', function() {
				console.log('load texture');
				return THREE.ImageUtils.loadTexture('tex/cratetex.png');
			});
			var mat = new THREE.MeshLambertMaterial({map: texture});
			
			var cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), mat);
			cube.position.y = 50;
			cube.position.z = 2050;
			scene.add(cube);
			
			self.cube = cube;
		};
	};

	Box.prototype = {

		rotate: function() {
		    this.cube.rotation.x += 0.05;
		    this.cube.rotation.y += 0.07;				
		}

	};

	return Box;

});