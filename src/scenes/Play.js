class Play extends Phaser.Scene {

    constructor() {

        super("playScene");

    }

    preload()  {

       this.load.image('starfield', 'assets/starfield.png');
       this.load.image('rocket', 'assets/rocket.png');
       this.load.image('spaceship', 'assets/spaceship.png');
       this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

    }

    create() {

        // starfield
        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, 'starfield'
        ).setOrigin(0, 0);

        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket');

        this.ship1 = new Ship(this, 100, 200, 'spaceship');
        this.ship2 = new Ship(this, 300, 300, 'spaceship');
        this.ship3 = new Ship(this, 450, 250, 'spaceship');

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({

            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30

        });

    }

    update() {

        this.starfield.tilePositionX -= 2;
        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        if(this.checkCollision(this.p1Rocket, this.ship1)) {

            this.p1Rocket.reset();
            this.shipExplode(this.ship1);

        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {

            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
            
        }
        if (this.checkCollision(this.p1Rocket, this.ship3)) {

            this.p1Rocket.reset();
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

    }

}