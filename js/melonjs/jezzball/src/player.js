/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(1, 1);

        this.renderable.animationspeed = 75;
        this.renderable.addAnimation('walk_up', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.renderable.addAnimation('walk_left', [9, 10, 11, 12, 13, 14, 15, 16, 17]);
        this.renderable.addAnimation('walk_down', [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.renderable.addAnimation('walk_right', [27, 28, 29, 30, 31, 32, 33, 34, 35]);

        // this.setCurrentAnimation("walk_left");
        // this.animationpause = true;
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
 
        if (me.input.isKeyPressed('left')) {
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;

            if (!this.renderable.isCurrentAnimation('walk_left'))
                this.renderable.setCurrentAnimation("walk_left");
        } else if (me.input.isKeyPressed('right')) {
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation('walk_right'))
                this.renderable.setCurrentAnimation("walk_right");
        } else {
            this.vel.x = 0;
            //this.renderable.animationpause = true;
        }

        if (me.input.isKeyPressed('up')) {
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
            if (!this.renderable.isCurrentAnimation('walk_up'))
                this.renderable.setCurrentAnimation("walk_up");
        } else if (me.input.isKeyPressed('down')) {
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
            if (!this.renderable.isCurrentAnimation('walk_down'))
                this.renderable.setCurrentAnimation("walk_down");
        } else {
            this.vel.y = 0;
            //this.renderable.animationpause = true;
        }        

        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            // if (!this.jumping && !this.falling) {
            //     // set current vel to the maximum defined value
            //     // gravity will then do the rest
            //     this.vel.y = -this.maxVel.y * me.timer.tick;
            //     // set the jumping flag
            //     this.jumping = true;
            // }
 
        }
 
        // check & update player movement
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
 
});

game.RectEntity = me.Renderable.extend({

    init: function(pos, w, h, color) {
        this.parent(pos, w, h);
        this.z = 10;
        this.color = color;
    },

    draw: function(context) {
        // this.parent(context, rect);
        context.fillStyle = 'green';
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

});

game.Entity = me.ObjectEntity.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);
        this.z = 1;
        this.renderable = new me.ObjectContainer(0, 0, 50, 50);
        this.renderable.addChild(new game.RectEntity(
            new me.Vector2d(50, 50),
            50,
            50,
            settings.color
        ));
    }
});