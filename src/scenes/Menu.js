class Menu extends Phaser.Scene {

    constructor() {

        super("menuScene") 

    }

    preload() {

        this.load.image('splash', './assets_custom/homescreen.png');
        this.load.audio('sfx_select', './assets_custom/select.wav');
        this.load.audio('sfx_explosion', './assets_custom/explosion.wav');
        this.load.audio('sfx_torpedo', './assets_custom/fire.wav');
        this.load.audio('theme', './assets_custom/startrektheme.mp3');

    }

    create() {

        /* OLD UI
        
        let menuConfig = {

            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',

            padding: {
              top: 5,
              bottom: 5,
            },

            fixedWidth: 0

        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        */

        // MUSIC

        if (launched == false) {

          let music = this.sound.add('theme');
          music.volume = 0.1;
          music.loop = true;
          music.play();
          launched = true;

        }

        // NEW UI

        let menuConfig = {

          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',

          padding: {
            top: 5,
            bottom: 5,
          },

          fixedWidth: 0

        }

        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 50, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

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

        // homescreen

        this.add.image(0, -10, 'splash').setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
 
          game.settings = {

            spaceshipSpeed: 2,
            gameTimer: 60000    

          }

          this.sound.play('sfx_select');
          this.scene.start("playScene");  

        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {

          game.settings = {

            spaceshipSpeed: 3,
            gameTimer: 45000   

          }
        
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
          
        }

      }

}