;(function() {
    'use strict';

    console.log(`${Phaser ? 'We are have the Phaser here' : 'Unfortunatelly we do not have Phaser here'}`);
    console.log(Phaser);

    let ball;
    let paddle;
    let bricks; // To create a group of bricks
    let scoreText;
    let score = 0;
    // To store all the data that we need
    let brickConfig = {
        width: 50,
        height: 20,
        count: {
            row: 3,
            col: 7
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };

    const congrats = () => {
        alert('You won the game, congratulations!');
        location.reload();
    };

    const ballHitBrick = (ball, brick) => {
        let countAlive = 0;
        brick.kill();
        score += 10;
        scoreText.setText(`Points: ${score}`);

        console.log(bricks);

        bricks.children.forEach(b => countAlive += Number(b.alive));
        if (countAlive === 0) {
            setTimeout(congrats, 200);
        }
    };

    const createBricks = (c, r, config) => {
        let newBrick; // New object to add to bricks group
        let brickX = (c * (config.width + config.padding)) + config.offset.left;
        let brickY = (r * (config.height + config.padding)) + config.offset.top;
        newBrick = game.add.sprite(brickX, brickY, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
    };

    const initBricks = (fn, cfg) => {
        bricks = game.add.group();
        new Array(cfg.count.col).fill(1).forEach((t, i) => new Array(cfg.count.row)
            .fill(1).forEach((p, k) => fn(i, k, cfg)));
        console.dir(bricks);
    };

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

        // Load the image of the ball, paddle and bricks
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('paddle', 'assets/img/paddle.png');
        game.load.image('brick', 'assets/img/brick.png');
    }

    // Executed once when everything is loaded and ready
    function create() {
        //Initialize breacks
        initBricks(createBricks, brickConfig);
        // Initialize simple physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Disable collisions with the bottom edge of the screen
        game.physics.arcade.checkCollision.down = false;
        // set the ball and the paddle on the vorld's canvas
        ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
        paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
        // Set the anchor right on the middle of the paddle and ball
        paddle.anchor.set(0.5, 1);
        ball.anchor.set(0.5);
        // Enable checking the world bounds for ball
        ball.checkWorldBounds = true;
        // Enable executing action on onOutOfBound event
        ball.events.onOutOfBounds.add(() => {
            alert('Game Over!');
            location.reload();
        }, this);
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
        // Add text to the game. Args of the text method:
        // .text(<x coord, integer>, <y coord, integer>, <text content, string>, <styles, object>)
        scoreText = game.add.text(5, 5, 'Points: 0', { font: '18px Arial', fill: '#0095DD' });
    }

    // Executed on every frame.
    function update() {
        // Detect collisions between ball and paddle
        game.physics.arcade.collide(ball, paddle);
        // Detect collisions between ball and bricks
        game.physics.arcade.collide(ball, bricks, ballHitBrick);
        // Move paddle by X coords. Input is mouse. In the start of 
        // game paddle sets in the middle of bottom line of the world
        paddle.x = game.input.x || game.world.width * 0.5;
    }

    const game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
        preload: preload, create: create, update: update
    });

    console.log(game);
    
}());