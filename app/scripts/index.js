;(function() {
    'use strict';

    console.log(`${Phaser ? 'We are have the Phaser here' : 'Unfortunatelly we do not have Phaser here'}`);
    console.log(Phaser);

    let ball;
    let paddle;

    // To preload an assets
    function preload() {
        /* Scaling modes: 
            NO_SCALE - nothing is scaling
            EXACT_FIT - fill whole free space. Images can be skewed
            SHOW_ALL - fill free space with respect to both horizontal and vertical ratio 
            RESIZE - fill free space, objects can be placed dynamically. Advanced
            USER_SCALE - allow perform custom dynamic scaling. Advanced*/
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = '#eee';

        // Load the image of the ball and paddles
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('paddle', 'assets/img/paddle.png');
    }

    // Executed once when everything is loaded and ready
    function create() {
        // Initialize simple physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // set the ball and the paddle on the vorld's canvas
        ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
        paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
        // Set the anchor right on the middle of the paddle and ball
        paddle.anchor.set(0.5, 1);
        ball.anchor.set(0.5);
        // Plug the physics to the game objects (ball adn paddle)
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        game.physics.enable(paddle, Phaser.Physics.ARCADE);
        // Enable bounds sensitivity
        ball.body.collideWorldBounds = true;
        // Enable bouncing when collide bounds
        ball.body.bounce.set(1);
        // Set velocity to the ball
        ball.body.velocity.set(150, -150);
        // Make the paddle immovable
        paddle.body.immovable = true;
    }

    // Executed on every frame.
    function update() {
        game.physics.arcade.collide(ball, paddle);
        paddle.x = game.input.x || game.world.width * 0.5;
    }

    const game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
        preload: preload, create: create, update: update
    });

    console.log(game);
    
}());