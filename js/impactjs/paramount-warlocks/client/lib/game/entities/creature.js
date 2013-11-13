/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.entities.creature'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
Creature = ig.Entity.extend({
	
	init: function(x, y, settings) {
		
		
	},
	
	update: function() {
		this.parent();
		
	},
	
	draw: function() {
		
	}
	
});
//EOF
});