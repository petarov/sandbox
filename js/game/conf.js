/*
 * The MIT License
 * 
 * Copyright (c) 2013 Petar Petrov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
define([], function() {
    var config = {
    		
    		server: {
    			baseUrl: location.protocol+'//'+location.hostname+(location.port ? ':' + location.port: '') + '/',
    		},
    		build: {
    			env: 'dev',
    			scene: ''
    		},
    		
    		forceDebug: true,
//    		debug: (build.env === 'dev') || forceDebug,
    		showStats: true,
    		
    		/*
    		 * Define game gfx, logic & physics update intervals 
    		 */
    		intervals: {
    			render: {id: null, fps: 16},	// 60 FPS
    			logic: {id: null, fps: 20},		// 50 FPS
    			physics: {id: null, fps: 20}	// 50 FPS
    		},
    		
    };
    
    return config;
});