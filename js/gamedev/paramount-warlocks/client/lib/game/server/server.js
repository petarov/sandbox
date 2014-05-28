/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.server.server'
)
.requires(
	'impact.entity',
	
	'game.server.gamestate'
)
.defines(function(){
	
Server = ig.Class.extend({
	
	init: function($client) {
		this.gamestate = new GameState();
		
		this.client = $client;
	},
	
	/*
	 * Receives data from client and dispatches to game state routines
	 */
	onReceive: function(data) {
		var type = data[0];
		var response = {
				status: Globals.response.OK,
				message: 'OK',
				data: {},
				};
		
		switch(type) {
		case Globals.Client.CREATE_GAME:
			//TODO 
			var game = this.gamestate.onCreateGame(data[1]);
			response.data.gameId = game.id;
			response.data.pid = game.pid;
			break;
			
		default:
			response.status = Globals.response.ERROR;
			response.message = 'Unknown request message!';
			break;
		}
		
		return response;
	},
	
});
//EOF
});