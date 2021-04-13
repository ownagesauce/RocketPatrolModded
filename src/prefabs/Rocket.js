class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, ship) {

        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 1;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_torpedo');
        this.sfxRocket.volume = 0.5;
        this.ship = ship;
        this.shipX = this.x;
        this.alpha = 0;

    }

    update() {
        if(this.isFiring) {

            this.y -= this.movementSpeed * 4;
            this.alpha = 1;
            if(this.y < borderUISize * 1.5) {

                this.reset();
                this.alpha = 0;

            }

        }

        if(keyLEFT.isDown) {

            this.shipX -= this.movementSpeed * 1.5;

            if (!this.isFiring) {

                this.x -= this.movementSpeed * 1.5;
                this.x = this.shipX;

            }
        
        }

        if(keyRIGHT.isDown) {

            this.shipX += this.movementSpeed * 1.5;
            
            if (!this.isFiring) {

                this.x += this.movementSpeed * 1.5;
                this.x = this.shipX;

            }
        
        }

        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {

            this.isFiring = true;
            this.sfxRocket.play()
        
        }

        this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding + 20, game.config.width - borderUISize - borderPadding - 20);
        this.shipX = Phaser.Math.Clamp(this.shipX, borderUISize + borderPadding + 20, game.config.width - borderUISize - borderPadding - 20);

        this.ship.x = this.shipX - 17;

    }

    reset() {

        this.y = game.config.height - borderUISize - borderPadding - 70;
        this.isFiring = false;

    }

}