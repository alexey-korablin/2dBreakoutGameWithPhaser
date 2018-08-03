;(function() {
    'use strict';

    console.log(`${Phaser ? 'We are have the Phaser here' : 'Unfortunatelly we do not have Phaser here'}`);
    console.log(Phaser);

    let ball;

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

        // Load the image of the ball
        game.load.image('ball', 'assets/img/ball.png');
    }

    // Executed once when everything is loaded and ready
    function create() {
        // Initialize simple physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        ball = game.add.sprite(50, 50, 'ball');
        // Plug the physics to the game object
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        // Enable bounds sensitivity
        ball.body.collideWorldBounds = true;
        // Enable bouncing when collide bounds
        ball.body.bounce.set(1);
        // Set velocity to the ball
        ball.body.velocity.set(150, 150);
    }

    // Executed on every frame.
    function update() {
    }

    const game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
        preload: preload, create: create, update: update
    });

    console.log(game);
    
}());