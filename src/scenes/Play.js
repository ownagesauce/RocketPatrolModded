class Play extends Phaser.Scene {

    constructor() {

        super("playScene");

    }

    preload()  {

       this.load.image('starfield', './assets_custom/starfield.png');
       this.load.image('rocket', './assets_custom/torpedo.png');
       this.load.image('enterprise', './assets_custom/ship.png');
       this.load.image('spaceship', './assets_custom/enemyship.png');
       this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

    }

    create() {

        // starfield
        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, 'starfield'
        ).setOrigin(0, 0);

        this.p1Sprite = this.add.sprite(0, 400, 'enterprise').setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding - 75, 'rocket', 0, this.p1Sprite);

        this.ship1 = new Ship(this, (Math.random() * (590 - 50) + 50), 215 - 75, 'spaceship', 0, 30);
        this.ship2 = new Ship(this, (Math.random() * (590 - 50) + 50), 215, 'spaceship', 0, 50);
        this.ship3 = new Ship(this, (Math.random() * (590 - 50) + 50), 215 + 75, 'spaceship', 0, 70);

        /*
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        */

        // yellow inner border

        this.add.rectangle(0, 0, game.config.width, borderUISize * 3, 0xFFC759).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize - 8, game.config.width, borderUISize * 3, 0xFFC759).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize * 3, game.config.height, 0xFFC759).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize - 8, 0, borderUISize * 3, game.config.height, 0xFFC759).setOrigin(0, 0);

        // red middle border

        this.add.rectangle(0, 0, game.config.width, borderUISize * 2, 0xDB3E40).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize - 4, game.config.width, borderUISize * 2, 0xDB3E40).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize * 2, game.config.height, 0xDB3E40).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize - 4, 0, borderUISize * 2, game.config.height, 0xDB3E40).setOrigin(0, 0);

        // blue outer border

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x3972C9).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x3972C9).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x3972C9).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x3972C9).setOrigin(0, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({

            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30

        });

        this.p1Score = 0;

        let scoreConfig = {

            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',

            padding: {
              top: 5,
              bottom: 5,
            },

            fixedWidth: 100

        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding + 20, borderUISize + borderPadding * 2 + 20, this.p1Score, scoreConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {

        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
        this.gameOver = true;

        }, null, this);

    }

    update() {

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 1;
        this.p1Rocket.update();
        
        if (!this.gameOver) {       

            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();

        }

        if(this.checkCollision(this.p1Rocket, this.ship1)) {

            this.p1Rocket.reset();
            this.p1Rocket.alpha = 0;
            this.shipExplode(this.ship1);

        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {

            this.p1Rocket.reset();
            this.p1Rocket.alpha = 0;
            this.shipExplode(this.ship2);
            
        }
        if (this.checkCollision(this.p1Rocket, this.ship3)) {

            this.p1Rocket.reset();
            this.p1Rocket.alpha = 0;
            this.shipExplode(this.ship3);

        }

    }

    checkCollision(rocket, ship) {

        if (rocket.x > ship.x - 30 &&
            rocket.x < ship.x + ship.width - 30 &&
            rocket.y > ship.y &&
            rocket.y < ship.y + ship.height) {

            ship.alpha = 0;
            rocket.reset();
            return true;

        } else {

            return false;

        }

    }

    shipExplode(ship) {

        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {

            ship.reset();
            ship.alpha = 1;
            boom.destroy();

        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  

        this.sound.play('sfx_explosion');

    }

}