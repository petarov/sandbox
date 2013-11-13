/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

Globals = {
		
	Gamestates: {
		SPLASH: 0,
		MENU: 100,
		MENU_NEWGAME: 200, // list of new game options
		MENU_NEWGAME_AI: 202, // list of v.s. AI options
		MENU_NEWGAME_WAITING_SERVER: 203, // waits server to create game
		MENU_LIST_WAIT: 204, // waits for game list
		MENU_NEWGAME_JOIN: 206, // list of network games
		MENU_NEWGAME_WAIT_TO_JOIN: 208,
		
		GAME_WAIT_FOR_TURN: 250,
		GAME_START: 252,
		GAME_PLAY: 254,
	},
		
	Client: {
		/*
		 * Request: Send a ping packet to the server to determine if connection is still in-tact
		 * Response: Time of response created on server side
		 */
		PING: 1,
		/*
		 * Client asks server for a list of all empty games slots
		 */
		LIST_GAMES: 101,
		/*
		 * Ask the server to create a new game.
		 * Player passes his profile info - name, email, desired game type ...
		 */
		CREATE_GAME: 102,
		/*
		 * Player joins the game. He sends some basic Profile info to server.
		 * Server updates the game state and creates game.
		 */
		JOIN_GAME: 103,
		/*
		 * Player has moved a creature, cast a spell or attacked.
		 * Server verifies it is the correct player's turn, updates game state and emits UPDATE_GAME event.
		 */
		ACTION: 104,
		/*
		 * Client sends chat message
		 */
		CHAT: 150,
		/*
		 * Player quits or surrenders
		 */
		SURRENDER: 199,
	},
	
	Server: {
		/*
		 * Server waits for 2nd player to join in.
		 */
		WAITING_FOR_PLAYERS: 203,		
		/*
		 * Server returns a Game ID and Player session ID to each connected player. 
		 * TODO: (Session/Room name handled by Socket.IO?)
		 * Returns a list of creatures, positions, items. All game properties required to start the game. 
		 * Determines who will start first.
		 */
		GAME_CREATED: 204,
		/*
		 * Server sends info to player that the first player has made an action.
		 * Server sends about next turn.
		 */
		UPDATE_GAME: 205,
		/*
		 * Server received chat message from a player and propagates it to the other player.
		 */
		CHAT: 250,
		/*
		 * A player has won or quit the game. In eiter case the game is over.
		 * Server game state must be updated. Server emits this message to clients.
		 */
		GAME_OVER: 299,
	},
	
	Opponents: {
		AI: 1,
		HUMAN: 2,
	},
	
	Warlocks: {
		Azslazar: 1,
	},
	
	/*
	 * Possible player actions
	 */
	Actions: {
		MOVE: 1,
		ATTACK: 2,
		CAST_HEAL: 3,
	},
	
	/*
	 * Game creatures
	 */
	Creatures: {
		GRIFFIN: 1,
		CENTAUR: 2,
	}
		
};