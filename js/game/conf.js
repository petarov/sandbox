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

define([], function() {

    var config = {

		server : {
			baseUrl : location.protocol + '//' + location.hostname
					+ (location.port ? ':' + location.port : '') + '/',
		},
		build : {
			env : 'dev',
			scene : ''
		},

		screen: {
			canvas_id: '#container',
			width: 1024,
			height: 768
		},

		forceDebug : true,
		// debug: (build.env === 'dev') || forceDebug,
		showStats : true,

		/*
		 * Define game gfx, logic & physics update intervals
		 */
		intervals : {
			render : {
				id : null,
				fps : 16	// 60 FPS
			},
			logic : {
				id : null,
				fps : 20	// 50 FPS
			},
			physics : {
				id : null,
				fps : 20	// 50 FPS
			}
		}

	};

    return config;
});