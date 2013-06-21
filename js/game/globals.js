/*  
	TuxlaGL - HTML5/Javascript video game
    Copyright (C) 2013 Petar Petrov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Globals = {
	GameStates : {
		LOADING : 0,
		INTRO : 1,
		MENU : 2,
		LEADERBOARD : 3,
		GAMEPLAY : 4
	},
	
	CubeColors: [
		{color: 0xCC0000},	// dark red
		{color: 0x990099},	// violet
		{color: 0x009900},	// dark green 
		{color: 0xFF9900},	// orange
		{color: 0x3366FF},	// blue
		{color: 0x00FFFF},	// cyan
	],

	CUBE_SIZE: 100,
	Directions: {
		NONE: 0,
		NORTH: 1,
		SOUTH: 2,
		EAST: 3,
		WEST: 4
	}

};
