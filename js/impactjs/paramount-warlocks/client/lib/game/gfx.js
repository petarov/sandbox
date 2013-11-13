/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/.
 * 
 * Copyright (c) 2013 Petar Petrov
 */

ig.module(
	'game.gfx'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
/**
 * Extended canvas drawing routines
 */	
Gfx = ig.Class.extend({
	
	init: function(screenWidth, screenHeight) {
		this.cwidth = screenWidth;
		this.cheight = screenHeight;
	},

	scribe: function(x, y, txt, style) {
        var ctx = ig.system.context;
 
        switch(style) {
            case 'h1':
                ctx.fillStyle  = '#fff';
                ctx.font = '20px Sans-Serif';          
                break;
            case 'h2':
                ctx.fillStyle  = '#fff';
                ctx.font = '15px Sans-Serif';
            break;
            case 'p':
                ctx.fillStyle  = '#fff';
                ctx.font = '12px Sans-Serif';
                break;
            default:
            	ctx.fillStyle  = '#fff';
            	ctx.font = '12px Sans-Serif';
            	break;
        }
        
        ctx.textAlign = 'center';
        ctx.fillText (txt, x, y);
    }		
	
});
//EOF
});