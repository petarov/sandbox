/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */
ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	
	'game.config',
	'game.gfx',
	'game.game'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Global client defaults
	cfg: new Config(),
	// Global extended drawing routines
	gfx: new Gfx(),
	
	/**
	 * Load game scenes
	 */
	init: function() {
		
		this.game = new Game();
		
		// Test Player Info
		var playerInfo = {
				name: 'Testie', 
				warlock: Globals.Warlocks.Azslazar,
				server: {address: 'localhost', port: 8080}
		};
		
		this.game.init(playerInfo);
	},
	/**
	 * Update scene logic
	 */
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		this.game.update();
	},
	/**
	 * Blit all scene graphics
	 */
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		this.game.draw();
	}
	
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 800, 478, 1);

});
