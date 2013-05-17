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
define(['jquery'], function($) {
	
	function Terrain(scene) {
		var self = this;
		
		self.cache = window._cache;
		
		var floor;
		var frame;
			
		var plane = new THREE.PlaneGeometry(300, 300);
		var planeTesselated = new THREE.PlaneGeometry(300, 300, 25, 25);
		
		var matWire = new THREE.MeshBasicMaterial({ color: 0xa00000, wireframe: true, wireframeLinewidth: 2});
		var matSolid = new THREE.MeshBasicMaterial({ color: 0x999999});
		
		floor = new THREE.Mesh(plane, matSolid);
		floor.rotation.x = - Math.PI / 2;
		floor.position.y = -10;
		floor.scale.set(25, 25, 25);
		scene.add(floor);
		
		frame = new THREE.Mesh(planeTesselated, matWire);
		frame.rotation.x = - Math.PI / 2;
		frame.scale.set(25, 25, 25);
		scene.add(frame);
	}
	
	return {
		create: function(scene) {
			return new Terrain(scene);
		}
	};		
});