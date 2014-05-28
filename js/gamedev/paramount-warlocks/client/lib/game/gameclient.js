/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.gameclient'
)
.requires(
	'impact.entity',
	
	'game.server.server'
)
.defines(function(){
	
GameClient = ig.Class.extend({
	
	connect: function($host, $port) {
		// connection params
		this.server = new Server();
		this.server.init($host, $port);
	},
	
	pingServer: function(callback) {
		this.sendPing();
		
		callback();
	},
	
	/**
	 * Send packet to server
	 * @param data
	 */
	send: function(data) {
		var json = JSON.stringify(data);
		console.log(json);
		
		var response = this.server.onReceive(json);
		
		// handle server response
		this.onReceive(response);
	},
	
	/**
	 * Parse back server packet response
	 */
	onReceive: function(response) {
		console.log(response);
		
	},
	
	sendPing: function() {
		this.send([Globals.request.PING]);
	},
	
	sendCreateGame: function(player, opponent) {
		this.send([Globals.Client.CREATE_GAME, player.name, opponent]);
	},
	
});
//EOF
});