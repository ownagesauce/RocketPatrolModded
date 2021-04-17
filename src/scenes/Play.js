class Play extends Phaser.Scene {

    constructor() {

        super("playScene");

    }

    preload()  {

       this.load.image('starfield', './assets_custom/starfield.png');
       this.load.image('rocket', './assets_custom/torpedo.png');
       this.load.image('enterprise', './assets_custom/ship.png');
       this.load.image('spaceship', './assets_custom/enemyship.png');
       this.load.image('spark', './assets_custom/spark.png');
       this.load.spritesheet('explosion', './assets_custom/explosion.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 8});

    }

    create() {

        // starfield
        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, 'starfield'
        ).setOrigin(0, 0);

        this.p1Sprite = this.add.sprite(0, 400, 'enterprise').setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding - 75, 'rocket', 0, this.p1Sprite, game.settings.ammoCount);

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
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.anims.create({

            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8, first: 0}),
            frameRate: 30

        });

        this.p1Score = 0;
        this.timeLeft = game.settings.gameTimer;

        this.statusConfig = {

            fontFamily: 'pixelfont7',
            fontSize: '28px',
            color: '#4D8F41',
            align: 'left',

            shadow: {

                offsetX: 0,
                offsetY: 0,
                color: '#4D8F41',
                blur: 4,
                stroke: 20,
                fill: '#4D8F41'
            
            },

            padding: {
              top: 5,
              bottom: 5,
            },

            fixedWidth: 200

        }

        this.scoreText = this.add.text(borderUISize + borderPadding + 27, borderUISize + borderPadding * 2 + 17,"score:", this.statusConfig);
        this.ammoText = this.add.text(borderUISize + borderPadding + 429, borderUISize + borderPadding * 2 + 17, "torpedoes:", this.statusConfig);
        this.timeText = this.add.text(borderUISize + borderPadding + 230, borderUISize + borderPadding * 2 + 17, "time:", this.statusConfig);

        this.statusConfig.color = '#6FCF5E'
        this.statusConfig.shadow = {

            offsetX: 0,
            offsetY: 0,
            color: '#6FCF5E',
            blur: 4,
            stroke: 20,
            fill: '#6FCF5E'
  
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding + 110, borderUISize + borderPadding * 2 + 17, this.p1Score, this.statusConfig);
        this.ammoRight = this.add.text(borderUISize + borderPadding + 575, borderUISize + borderPadding * 2 + 17, this.p1Rocket.ammo, this.statusConfig);
        this.timeCenter = this.add.text(borderUISize + borderPadding + 290, borderUISize + borderPadding * 2 + 17, this.timeLeft, this.statusConfig);

        this.statusConfig.fontSize = '20px'
        this.ammoGain = this.add.text(-1000, -1000, '+0 TORPEDOES', this.statusConfig).setOrigin(0.5);

        this.gameOver = false;

        this.statusConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {

            if (!this.gameOver) {

                if (this.p1Score > 200) {

                    this.statusConfig.fontSize = '32px'
                    this.statusConfig.color = "#6FCF5E";
                    this.statusConfig.shadow = {

                        offsetX: 0,
                        offsetY: 0,
                        color: '#6FCF5E',
                        blur: 4,
                        stroke: 20,
                        fill: '#6FCF5E'
              
                    };
                    this.add.text(game.config.width/2, game.config.height/2, 'MISSION ACCOMPLISHED', this.statusConfig).setOrigin(0.5);
                    this.statusConfig.fontSize = '20px'
                    this.statusConfig.color = "#4D8F41";
                    this.statusConfig.shadow = {

                        offsetX: 0,
                        offsetY: 0,
                        color: '#4D8F41',
                        blur: 4,
                        stroke: 20,
                        fill: '#4D8F41'
              
                    };
                    this.add.text(game.config.width/2, game.config.height/2 + 30, 'PRESS R TO RESTART', this.statusConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 60, 'PRESS ESC TO RETURN TO MENU', this.statusConfig).setOrigin(0.5);

                } else if (this.p1Score <= 200) {

                    this.statusConfig.color = "#EA8175";
                    this.statusConfig.shadow = {

                        offsetX: 0,
                        offsetY: 0,
                        color: '#EA8175',
                        blur: 4,
                        stroke: 20,
                        fill: '#EA8175'
              
                    };
                    this.statusConfig.fontSize = '26px'
                    this.add.text(game.config.width/2, game.config.height/2, 'MISSION FAILED, INSUFFICIENT SCORE', this.statusConfig).setOrigin(0.5);
                    this.statusConfig.color = "#EA5475";
                    this.statusConfig.shadow = {

                        offsetX: 0,
                        offsetY: 0,
                        color: '#EA5475',
                        blur: 4,
                        stroke: 20,
                        fill: '#EA5475'
              
                    };
                    this.statusConfig.fontSize = '20px'
                    this.add.text(game.config.width/2, game.config.height/2 + 30, 'PRESS R TO RESTART', this.statusConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 60, 'PRESS ESC TO RETURN TO MENU', this.statusConfig).setOrigin(0.5);

                }

                this.gameOver = true;

                if (this.p1Score > highScore) {

                    highScore = this.p1Score;
    
                }

            }

        }, null, this);

        this.statusConfig.fontSize = '26px'
        this.statusConfig.color = "#EA8175";
                    this.statusConfig.shadow = {

                        offsetX: 0,
                        offsetY: 0,
                        color: '#EA8175',
                        blur: 4,
                        stroke: 20,
                        fill: '#EA8175'
              
                    };
        this.torpedoFailText1 = this.add.text(game.config.width / 2, game.config.height/2, '', this.statusConfig).setOrigin(0.5);
        this.statusConfig.fontSize = '20px'
        this.statusConfig.color = "#EA5475";
                    this.statusConfig.shadow = {

                        offsetX: 0,
                        offsetY: 0,
                        color: '#EA5475',
                        blur: 4,
                        stroke: 20,
                        fill: '#EA5475'
              
                    };
        this.torpedoFailText2 = this.add.text(game.config.width / 2, game.config.height/2 + 30, '', this.statusConfig).setOrigin(0.5);
        this.torpedoFailText3 = this.add.text(game.config.width/2, game.config.height/2 + 60, '', this.statusConfig).setOrigin(0.5);
        
    }

    update() {

        if (!this.gameOver) {

            this.timeLeft = ((game.settings.gameTimer - this.clock.getElapsed()) / 1000).toFixed(0);
            this.timeCenter.text = this.timeLeft;
            
        }

        this.ammoRight.text = this.p1Rocket.ammo;

        if (this.p1Rocket.ammo < 1) {

            this.gameOver = true;

            this.torpedoFailText1.text = 'TORPEDOES EXPENDED, MISSION FAILED'
            this.torpedoFailText2.text = 'PRESS R TO RESTART'
            this.torpedoFailText3.text = 'PRESS ESC TO RETURN TO MENU'
            this.gameOver = true;

            if (this.p1Score > highScore) {

                highScore = this.p1Score;

            }

        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            this.scene.start("menuScene");
        }
        
        if (!this.gameOver) {       

            this.p1Rocket.update(this.starfield);
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();

        }

        if (this.checkCollision(this.p1Rocket, this.ship1)) {

            this.p1Rocket.reset();
            this.p1Rocket.alpha = 0;
            this.p1Rocket.ammo += 3;
            this.ammoGain.x = this.ship1.x;
            this.ammoGain.y = this.ship1.y - 60;
            this.ammoGain.text = "+3 TORPEDOES";
            this.shipExplode(this.ship1);

        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {

            this.p1Rocket.reset();
            this.p1Rocket.alpha = 0;
            this.p1Rocket.ammo += 2;
            this.ammoGain.x = this.ship2.x;
            this.ammoGain.y = this.ship2.y - 60;
            this.ammoGain.text = "+2 TORPEDOES";
            this.shipExplode(this.ship2);
            
        }
        if (this.checkCollision(this.p1Rocket, this.ship3)) {

            this.p1Rocket.reset();
            this.p1Rocket.alpha = 0;
            this.p1Rocket.ammo += 1;
            this.ammoGain.x = this.ship3.x;
            this.ammoGain.y = this.ship3.y - 60;
            this.ammoGain.text = "+1 TORPEDOES";
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

        let particle = this.add.particles('spark');

        particle.createEmitter({

            x: ship.x - 30,
            y: ship.y,
            angle: { min: 0, max: 360 },
            speed: 5000,
            accelerationX: -500,
            accelerationY: -500,
            gravityY: 100,
            lifespan: { min: 10, max: 15},
            blendMode: 'ADD'

        });

        let boom = this.add.sprite(ship.x - 75, ship.y - 50, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {

            ship.reset();
            ship.alpha = 1;
            boom.destroy();
            particle.destroy();
            this.ammoGain.text = "";

        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');

    }

}