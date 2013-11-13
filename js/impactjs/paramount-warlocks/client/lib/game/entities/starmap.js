/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */
ig.module(
	'game.entities.starmap'
)
.requires(
	'impact.system',
	'impact.game',
	'impact.entity'
)
.defines(function() {
	
StarMap = ig.Entity.extend({
	
	minSpeed: 0.05,
	maxSpeed: 0.55,
	maxStars: 120,
	
	stars: [],
	starImg: null,
	
	/**
	 * Generate star map
	 */
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		
		for(var i = 0; i < this.maxStars; i++) {
			var star = {
				x: Math.random() * ig.game.cfg.screenWidth + 1,
				y: Math.random() * ig.game.cfg.screenHeight + 1,
				speed: this.minSpeed + Math.random() * this.maxSpeed
			};
			
			this.stars.push(star);
		}
	},
	/**
	 * Update stars movement
	 */
	update: function() {
		this.parent();
		
		for(var i = 0; i < this.maxStars; i++) {
			this.stars[i].x -= this.stars[i].speed;
			if (this.stars[i].x < 0) {
				this.stars[i].x = ig.game.cfg.screenWidth;
				this.stars[i].y = Math.random() * ig.game.cfg.screenHeight + 1;
			}
		}		
	},
	/**
	 * Draw stars on screen
	 */
	draw: function() {
		var ctx = ig.system.context;
		
		if (!this.starImg) {
			this.starImg = ctx.createImageData(2, 2); 
			var d  = this.starImg.data;
			for (var i = 0; i < 4*4; i++) {
				d[i] = 255;
			}
		}
		
		for(var i = 0; i < this.maxStars; i++) {
			ctx.putImageData(this.starImg, 
					this.stars[i].x,
					this.stars[i].y);     	
		}			
	}
	
});
//EOF
});