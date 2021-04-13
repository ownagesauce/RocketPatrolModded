let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],

}

let game = new Phaser.Game(config);

let borderUISize = 4;
let borderPadding = 0;

let keyF, keyR, keyLEFT, keyRIGHT;

let launched = false;