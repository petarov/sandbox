/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */
ig.module(
	'game.entities.isomap'
)
.requires(
	'impact.entity'
)
.defines(function() {
	
IsoMap = ig.Entity.extend({
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 170, 66, 0.7)',	
	
	tileWidth: 100,
	tileHeight: 65,
	tilePadding: 15,
	
	mapOffsetX: 30,
	mapOffsetY: 220,
	mapWidth: 8,
	mapHeight: 7,
	
	selectedTile: {active: false, x: 0, y: 0},
	
	/*
	 * Load gfx
	 */
	tileGrass: new ig.Image( 'media/grass.png' ),
	tileSelect: new ig.Image( 'media/water.png' ),
	/**
	 * Init tilemap objects
	 */
	init: function() {
		
	},
	/**
	 * Update tilemap objects
	 */
	update: function() {
		this.parent();
		
	},
	/**
	 * Draw tilemap elements
	 */
	draw: function() {
		// Draw ground
		var x, y;
		var tw = this.tileWidth / 2;
		var th = (this.tileHeight - this.tilePadding) / 2;
		
		for (var i = 0; i < this.mapHeight; i++) {
			for (var j = this.mapWidth - 1; j >= 0; j--) {
				x = this.mapOffsetX + (j * tw) + (i * tw);
				y = this.mapOffsetY + (i * th) - (j * th);
				//y -= Math.random() * 2; //earth quake
				this.tileGrass.draw(x, y);
				
				if (ig.game.cfg.debug) {
					ig.game.scribe(i + ',' + j, 'h1', x + tw, y + th);
				}
			}
		}
		
		// Draw selection
		if (this.selectedTile.active) {
			x = this.mapOffsetX + (this.selectedTile.x * tw) + (this.selectedTile.y * tw);
			y = this.mapOffsetY + (this.selectedTile.y * th) - (this.selectedTile.x * th);
			this.tileSelect.draw(x, y);
		}
	},
	/**
	 * Select tile given map-tile position
	 * @param pos {x, y}
	 */
	selectTile: function(x, y) {
		x = x.limit(0, this.mapWidth - 1);
		y = y.limit(0, this.mapHeight - 1);
		
		this.selectedTile.active = true;
		this.selectedTile.x = x;
		this.selectedTile.y = y;
	},
	deselectTile: function() {
		this.selectedTile.active = false;
	},
	/**
	 * Translate pixel coordinates to isometric map tile position
	 * @param pixelPosition
	 * @returns {x, y}
	 */
	getTilePos: function(x, y) {
		var tw = this.tileWidth / 2;
		var th = (this.tileHeight - this.tilePadding) / 2;
		
		var dx = x - this.mapOffsetX;
		var dy = y - this.mapOffsetY;

		var tileY = (tw * dy + th * dx) / (2 * th * tw);
		var tileX = dx / tw - tileY;
		
		tileY -= 1;
		
		tileX = Math.round(tileX);
		tileY = Math.round(tileY);
		
		return {x: tileX, y: tileY};
	},
	getPixelPos: function(tileX, tileY) {
		var tw = this.tileWidth / 2;
		var th = (this.tileHeight - this.tilePadding) / 2;
		
		var x = this.mapOffsetX + (tileX * tw) + (tileY * tw);
		var y = this.mapOffsetY + (tileY * th) - (tileX * th);
		
		y -= th;
		x += tw / 2;
		
		return {x: x, y: y};
	}
});
//EOF
});