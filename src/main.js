let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    autoCenter: true

}

let game = new Phaser.Game(config);

let borderUISize = 4;
let borderPadding = 0;

let keyF, keyR, keyLEFT, keyRIGHT, keySPACE, keyESCAPE;

let launched = false;

let highScore = 0;


/* 

FOR THE GRADERS OF CMPM-120, PROFESSOR ADAM SMITH:

howdy!

here's my big list of modifications, in the order I added them:

    - UI overhaul (very overtly influenced by Star Trek™), all graphics were made by myself in Adobe Ilustrator/PAINT.NET;
      additional fonts sourced from https://www.dafont.com/: "Frontier Old Style" and "PixelFont7"
      implementation based on the solution provided by NoobTW on Stack Overflow (20 points for recreating assets, 5 points for new scrolling background)

    - Additional player ship sprite whose behavior is linked to the rocket (10 points ?)

    - Soundtrack from ________________ and SFX sampled from the Star Trek™ franchise and edited in Audacity (5 points)

    - Limited torpedo ammo count (replenishable, see "multiple endgame states")

    - Added parallax scrolling (10 points)

    - Rewrote difficulty selection logic; now controlled by a toggle visible in the main menu (5 points ?)

    - Added persistent high score save (5 points)

    TOTAL POINTS: 60

*/