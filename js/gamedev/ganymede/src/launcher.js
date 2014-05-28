(function () {

    var game = new Phaser.Game(640, 360, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
    var background;
    var ship;

    var xacc = 0;
    var yacc = 0;
    var speed = 0.2;
    var dec = speed / 2.0;

    function preload() {
        game.load.image('backgorund', 'assets/background.png');
        game.load.image('ship', 'assets/spaceship_engine.png');
    }

    function create() {

        background = game.add.tileSprite(0, 104, 640, 360, 'backgorund');
        ship = game.add.sprite(0, 48, 'ship');

    }

    function update() {

        background.tilePosition.x -= 2;

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            xacc -= speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            xacc += speed;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            yacc -= speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            yacc += speed;
        }

        if (xacc > 0)
            xacc -= dec;
        if (xacc < 0)
            xacc += dec;
       if (yacc > 0)
            yacc -= dec;
        if (yacc < 0)
            yacc += dec;        

        ship.x += xacc;
        ship.y += yacc;
    }

})();
