/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.config'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
/**
 * Client defaults
 */	
Config = ig.Class.extend({
	
	debug: false,
	
	screenWidth: 800,
	screenHeight: 480,
	
});
//EOF
});