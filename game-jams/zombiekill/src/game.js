/**
 * Mom vs. Zombies
 * 
 * Game entry for http://0hgame.eu/ 
 */

$(document).ready(function() {
    var render = _Globals.render;
    // Init Crafty Engine
    Crafty.init(_Globals.ScreenWidth, _Globals.ScreenHeight).canvas.init();
    Crafty.background('#000');
    // Load assets
    Crafty.scene("load", function() {
        Crafty.load([
            "assets/terrain.png", 
            "assets/RunningDood_Moosader.png",
            "assets/flames_0.png",
            "assets/zombie.png",
            ], 
        function() {
            // load gfx
            Crafty.sprite("assets/terrain.png", {
                terrain: [0, 0]
            });
            Crafty.sprite("assets/RunningDood_Moosader.png", {
                player: [0, 0, 80, 30],
            });
            Crafty.sprite("assets/flames_0.png", {
                flame: [0, 0, 16, 16],
            });
            Crafty.sprite("assets/zombie.png", {
                zombie: [0, 0, 32, 64],
            });
            
            $('#loading').hide();
            Crafty.scene('game');
        },
        // On Progress
        function(e) {
            $('#loading').html('Loaded: ' + e.percent.toFixed(0) + '%');
        },
        // On Error
        function(e) {
            $('#loading').html('Could not load: ' + e.src);
        });
    });
    
    // main scene
    Crafty.scene("game", function() {
        
        // show FPS
        Crafty.e("2D, " + render + ", FPS").attr({maxValues:10})
        .bind("MessureFPS", function(fps) {
            $('#fps').text('FPS: ' + fps.value);
        });
        
        var zbase = 2;
        // background
        Crafty.e("2D, " + render + ", Image")
        .attr({x: 0, y:0, z: zbase})
        .image("assets/terrain.png", "no-repeat");
        // character animation 
        Crafty.c('CharAnims', {
            CharAnims: function() {
                // setup animations sequences
                this.requires("SpriteAnimation, Grid")
                .animate("walk", [ [0, 90], [0, 60], [0, 30], [0, 0] ]);
                return this;
            }
        });     
        // create character
        var player = Crafty.e("2D, " + render + ", player, CharAnims, Multiway, MouseFace")
        .attr({
            move: {left: false, right: false, up: false, down: false},
            x: 304, y: 209, z: zbase + 1,
            moving: false,
            curAngle: 0,
            hp: 100,
            kills: 0,
        })
        .origin('center')  // rotate origin
        .MouseFace({x: 40, y: 15})
        .CharAnims()
        .bind("Moved", function(from) {
            this.moving = true;
            if (this.x < 0) {
                this.x = from.x;
            } else if (this.x + 75 > _Globals.ScreenWidth) {
                this.x = from.x;
            }
            if (this.y -5 < 0) {
                this.y = from.y;
            } else if (this.y + 45 > _Globals.ScreenHeight) {
                this.y = from.y;
            }
        })
        .bind("EnterFrame", function() {
            // If moving, adjust the proper animation and facing
            if (this.moving) {
                if (!this.isPlaying('walk'))
                    this.stop().animate('walk', 8, -1); 
                this.moving = false;
            } else {
                this.stop();
            } 
        })
        .multiway(2, {W: -90, S: 90, D: 0, A: 180})
        .bind("MouseMoved", function(e) {
            // adjust player sprite facing
            // we add +90, since initially sprite is facing PI/2
            this.curAngle = (e.grad) + 90;
            this.rotation = this.curAngle;
        })
        .bind("MouseUp", function(data) {
            if (data.mouseButton == Crafty.mouseButtons.LEFT) {
                // shoot - create bullet
                Crafty.e("2D, " + render + ", Collision, Color")
                .attr({
                    x: this.x + 40, y: this.y + 15, z: zbase + 1,
                    w: 3, h: 3,
                    speed: 5,
                    angle: this._dirAngle + Math.PI 
                })
                .color("#FA5656")
                .bind("EnterFrame", function(frame) {
                    this.x += Math.cos(this.angle) * this.speed;
                    this.y += Math.sin(this.angle) * this.speed;

                    var hits = this.hit('zombie');
                    if (hits) {
                        this.destroy();
                        var zombie = hits[0].obj;
                        zombie.trigger('dmg', 1.9);
                    }
                    if (this.x > Crafty.viewport.width || this.x < 0) {
                        this.destroy();
                    }
                });
            }
        })
        .bind("damage", function(dmg) {
            this.hp -= dmg;
            if (this.hp <= 0) {
                $('#instructions').html('YOU ARE DEAD!');
                Crafty.stop();
            }
        });

        /**
         * GAMEPLAY
         */
        var gameTick = 0;
        var turnPeriod = 1000;
        var gameTurnTimeLeft = Date.now() + turnPeriod;
        var currentEnemies = 0;
    
        Crafty.bind("EnterFrame",function(frame) {
        
            var currentTime = Date.now();

            $('#hp').html(player.hp);
            $('#kills').html(player.kills);

            // game turn passed ?
            if (currentTime > gameTurnTimeLeft) {
                gameTurnTimeLeft = Date.now() + turnPeriod; 
                if (currentEnemies < 50) {
                    currentEnemies += 1;
                    // create character
                    Crafty.e("2D, " + render + ", Enemy, zombie")
                    .attr({
                        x: 304, y: 209, z: zbase + 1,
                        speed: 0.5,
                        moving: false,
                        move: {left: false, right: false, up: false, down: false},
                        animSpeed: 10,
                        hp: 10,
                    })
                    .Enemy(player)
                    .bind("EnterFrame", function(frame) {

                        var cx = this.x + 16;
                        var cy = this.y + 32;
                        var px = player.x + 30;
                        var py = player.y + 15;

                        if (cx < px) {
                            this.moving = true;
                            this.move.right = true;
                            this.x += this.speed;
                        } else if (this.x > px) {
                            this.moving = true;
                            this.move.left = true;
                            this.x -= this.speed;
                        }
                        if (cy < py) {
                            this.moving = true;
                            this.move.down = true;
                            this.y += this.speed;
                        } else if (cy > py) {
                            this.moving = true;
                            this.move.up = true;
                            this.y -= this.speed;
                        }

                        if (this.move.left) {
                            if (!this.isPlaying("walk_left"))
                                this.stop().animate("walk_left", this.animSpeed, -1);                   
                        } else if (this.move.right) {
                            if (!this.isPlaying("walk_right"))
                                this.stop().animate("walk_right", this.animSpeed, -1);                
                        } else if (this.move.down) {
                            if (!this.isPlaying("walk_down"))
                                this.stop().animate("walk_down", this.animSpeed, -1);                
                        } else if (this.move.up) {
                            if (!this.isPlaying("walk_up"))
                                this.stop().animate("walk_up", this.animSpeed, -1);   
                        } else {
                            this.stop();
                        }
                        this.move.left = false;
                        this.move.right = false;
                        this.move.up = false;
                        this.move.down = false;

                        if (this.hit('player')) {
                            player.trigger('damage', 0.25);
                        }
                    })
                    .bind('dmg', function(dmg) {
                        this.hp -= dmg;
                        if (this.hp <= 0) {
                            this.destroy();
                            player.kills += 1;
                            if (player.kills >= 50) {
                                $('#instructions').html('YUP! ALL DEAD. YOU WON!');
                                Crafty.stop(); 
                            }                   
                        }
                    });
                } // new enemy-if
            }
        });

    });
    // start
    Crafty.scene('load');
});
