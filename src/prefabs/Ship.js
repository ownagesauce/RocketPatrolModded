class Ship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, pointValue) {

        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed + (Math.random() * (0.1 - (-0.1)) + 0.1);

    }

    update() {

        this.x -= this.moveSpeed;

        if(this.x < this.width - 100) {

            this.x = game.config.width;

        }

    }

    reset() {

        this.x = game.config.width + 50;
        this.alpha = 1;

    }

}