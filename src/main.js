let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],

}

let game = new Phaser.Game(config);

let borderUISize = 4;
let borderPadding = 0;

let keyF, keyR, keyLEFT, keyRIGHT, keySPACE;

let launched = false;


/* 

FOR THE GRADERS OF CMPM-120, PROFESSOR ADAM SMITH:

howdy!

here's my big list of modifications, in the order I added them:

    - UI overhaul (very overtly influenced by Star Trek™), all graphics were made by myself in Adobe Ilustrator/PAINT.NET;
      additional fonts sourced from https://www.dafont.com/: "Frontier Old Style" and https://www.1001fonts.com/: "Kenney Rocket Square",
      implementation based on the solution provided by NoobTW on Stack Overflow

    - Additional player ship sprite whose behavior is linked to the rocket

    - Soundtrack from ________________ and SFX sampled from the Star Trek™ franchise and edited in Audacity

    - Limited torpedo ammo count (replenishable, see below)

*/