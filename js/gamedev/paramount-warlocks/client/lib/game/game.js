/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.game'
)
.requires(
	'impact.entity',
		
	'game.input',
	'game.gameclient',
		
	'game.entities.isomap',
	'game.entities.starmap'	
)
.defines(function(){
	
Game = ig.Class.extend({
	
	// test sprite
	dragon: new ig.Image( 'media/griffin_vect_small.1.png' ),	
	
	/**
	 * Initialize game client state
	 */
	init: function($player) {
		var self = this;
		
		// Game session
		this.sessionID = null;
		this.playerID = null;
		this.client = null;
		this.player = $player;
		
		// Game state
		this.state = Globals.Gamestates.MENU;
		this.tilemap = null;
		this.mapitems = null;
		this.creatures = {};
		
		// Gfx objects
		this.isomap = new IsoMap();
		this.starmap = new StarMap();
		
		this.starmap.init();
		
		// Input
		this.input = new Input();
		this.input.init();
		
		this.input.bind('#newgame', function() {
			self.createAIGame();
		});
	},
	/**
	 * Update game client logic
	 */
	update: function() {
		
		if (this.state === Globals.Gamestates.GAMEPLAY) {
			this.starmap.update();
			
			if (ig.input.released('click')) {
				ig.log('mouse %d %d', ig.input.mouse.x, ig.input.mouse.y);
				tilePos = this.isomap.getTilePos(ig.input.mouse.x, ig.input.mouse.y);
				ig.log('tile %s %s', tilePos.x, tilePos.y);
				this.isomap.selectTile(tilePos.x, tilePos.y);
			}			
		}
	},
	/**
	 * Draw client game state objects
	 */
	draw: function() {
		
		switch(this.state) {
		case Globals.Gamestates.MENU:
			ig.game.gfx.scribe(50, 50, 'MENU');
			break;
			
		case Globals.Gamestates.GAMEPLAY:
			// Draw environment
			this.starmap.draw();
			this.isomap.draw();
			
			// Add your own drawing code here
			var x = ig.system.width/2,
				y = ig.system.height/2;
			
			var pos = this.isomap.getPixelPos(5,5);
			this.dragon.draw(pos.x, pos.y);		
			
			ig.game.gfx.scribe(50, 50, 'Turns: 0');
			
			break;
			
		case Globals.Gamestates.CONNECTING:
			ig.game.gfx.scribe(50, 50, 'CONNECTING ...');
			break;
			
		default:
			console.log('invalid game state');
		break;
		}
	},
	
	getServersList: function(callback) {
		//FIXME: dummy data
		var servers = [
		               {name: 'entersky', ip: '127.0.0.1', port: 8080},
		               {name: 'brokenwings', ip: '127.0.0.1', port: 8081},
		               ];
		
		callback(servers);
	},
	
	createAIGame: function($server) {
		var self = this;
		
		this.state = Globals.Gamestates.MENU_NEWGAME_WAITING_SERVER;
		
		this.client = new GameClient($server.address, $server.port);
		this.client.connect(function() {
			self.client.sendCreateGame();
		});
		
	},
	
	createPvPGame: function() {
		
	},
	
	/**
	 * Events
	 */
	
	onConnected: function() {
		// create game
		this.client.sendCreateGame('player name', Globals.opponents.AI);
	},
	
});
//EOF
});