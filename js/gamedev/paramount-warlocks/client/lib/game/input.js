/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.input'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
Input = ig.Class.extend({
	
	init: function() {
		ig.input.initMouse();
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
	},
	
	bind: function($elem, $func) {
		$($elem).bind('click touchstart', $func);
	}
	
});
//EOF
});