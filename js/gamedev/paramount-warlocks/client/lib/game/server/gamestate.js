/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.server.gamestate'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
GameState = ig.Class.extend({
	
	onCreateGame: function() {
		
		var gameboard = [];
		
		var gameId = Math.floor(Math.random() * 100) + 1;
		
		return {id: gameId, pid: 1};
	},
	
	onMove: function(pid, cid, newX, newY) {
		// TODO move
		// TODO notify
	},
	
	onAttack: function(pid, cid, victimId) {
		// TODO attack
		// TODO notify
	},
	
	onCast: function(pid, cid, type) {
		// TODO: cast
		// TODO notify
	},
	
	onHeal: function(pid, cid) {
		// TODO
	}
	
	
	
	
	
});
//EOF
});