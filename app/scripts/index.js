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
        ball = game.add.sprite(50, 50, 'ball');
    }

    // Executed on every frame.
    function update() {
        ball.x += 1;
        ball.y += 1;
    }

    const game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
        preload: preload, create: create, update: update
    });

    console.log(game);
    
}());