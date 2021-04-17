class Menu extends Phaser.Scene {

    constructor() {

        super("menuScene") 

    }

    preload() {

        this.load.image('splash', './assets_custom/homescreen.png');
        this.load.audio('sfx_select', './assets_custom/select.wav');
        this.load.audio('toggle', './assets_custom/toggle.wav');
        this.load.audio('sfx_explosion', './assets_custom/explosion.wav');
        this.load.audio('sfx_torpedo', './assets_custom/fire.wav');
        this.load.audio('theme', './assets_custom/spacetheme.mp3');
        this.load.image('rocket', './assets_custom/torpedo.png');
        this.load.image('enterprise', './assets_custom/ship.png');
        this.load.image('spaceship', './assets_custom/enemyship.png');

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
          music.volume = 0.05;
          music.loop = true;
          music.play();
          launched = true;

        }

        // NEW UI

        let menuConfig = {

          fontFamily: 'pixelfont7',
          fontSize: '30px',
          color: '#FFC55B',
          align: 'left',
          shadow: {

            offsetX: 0,
            offsetY: 0,
            color: '#FFC55B',
            blur: 4,
            stroke: 20,
            fill: '#FFC55B'

          },

          padding: {

            top: 5,
            bottom: 5,
          },

          fixedWidth: 0

        };

        this.add.text(game.config.width / 2, game.config.height / 2 + 52, 'PRESS SPACE TO CONTINUE!', menuConfig).setOrigin(0.5);
        menuConfig.color = '#88D4FF';
        menuConfig.shadow = {

          offsetX: 0,
          offsetY: 0,
          color: '#88D4FF',
          blur: 4,
          stroke: 20,
          fill: '#88D4FF'

        };
        menuConfig.fontSize = '22px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 100, 'DIFFICULTY:', menuConfig).setOrigin(0.5);
        
        // toggleable difficulty UI

        this.difficulty = true;
        
        menuConfig.color = '#88ED52'
        menuConfig.shadow = {

          offsetX: 0,
          offsetY: 0,
          color: '#303030',
          blur: 4,
          stroke: 20,
          fill: '#303030'

        };
        menuConfig.fontSize = 28;
        this.difficultySettingEasy = this.add.text(game.config.width / 2 - 45, game.config.height / 2 + borderUISize + borderPadding + 127, 'EASY', menuConfig).setOrigin(0.5);
        menuConfig.color = '#335060'
  
        this.difficultySettingHard = this.add.text(game.config.width / 2 + 45, game.config.height / 2 + borderUISize + borderPadding + 127, 'hard', menuConfig).setOrigin(0.5);

        menuConfig.color = '#88D4FF'
        menuConfig.shadow = {

          offsetX: 0,
          offsetY: 0,
          color: '#88D4FF',
          blur: 4,
          stroke: 20,
          fill: '#88D4FF'

        };

        menuConfig.fontSize = 15;
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding + 155, 'HIT F TO TOGGLE', menuConfig).setOrigin(0.5);

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

        // lmao

        menuConfig.color = '#009CFF'
        menuConfig.shadow = {

          offsetX: 0,
          offsetY: 0,
          color: '#009CFF',
          blur: 4,
          stroke: 20,
          fill: '#009CFF'

        };
        menuConfig.fontSize = 24;
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding + 205, '©COPYRIGHT 1981 OR SOMETHING', menuConfig).setOrigin(0.5);

        // homescreen

        this.add.image(0, -10, 'splash').setOrigin(0, 0);

        // high score

        menuConfig.fontSize = '16px';
        menuConfig.color = '#FF4540'
        menuConfig.shadow = {

          offsetX: 0,
          offsetY: 0,
          color: '#FF4540',
          blur: 4,
          stroke: 20,
          fill: '#FF4540'

        };

        this.add.text(65, 35, 'HI-SCORE:', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '36px';
        this.highScoreText = this.add.text(60, 65, highScore, menuConfig).setOrigin(0.5);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        game.settings = {

          spaceshipSpeed: 2,
          gameTimer: 60000,
          ammoCount: 20  

        }

    }

    update() {

        // difficulty toggle logic

        if (Phaser.Input.Keyboard.JustDown(keyF)) {

          this.sound.play('toggle');

          if (!this.difficulty) {

            game.settings = {

              spaceshipSpeed: 2.5,
              gameTimer: 60000,
              ammoCount: 20 

            };

            // change visuals

            this.difficultySettingEasy.style.color = '#88ED52';
            this.difficultySettingEasy.style.shadow = {

              offsetX: 0,
              offsetY: 0,
              color: '#88ED52',
              blur: 4,
              stroke: 20,
              fill: '#88ED52'
    
            };

            this.difficultySettingHard.style.color = '#335060';
            this.difficultySettingHard.style.shadow = {

              offsetX: 0,
              offsetY: 0,
              color: '#335060',
              blur: 4,
              stroke: 20,
              fill: '#335060'
    
            };

            this.difficultySettingHard.text = "hard";
            this.difficultySettingEasy.text = "EASY";
            this.difficulty = !this.difficulty;

          } else {

            game.settings = {

              spaceshipSpeed: 3.5,
              gameTimer: 45000,
              ammoCount: 10   

            };

            // change visuals
            
            this.difficultySettingHard.style.color = '#EB596D';
            this.difficultySettingHard.style.shadow = {

              offsetX: 0,
              offsetY: 0,
              color: '#EB596D',
              blur: 4,
              stroke: 20,
              fill: '#EB596D'
    
            };
            
            this.difficultySettingEasy.style.color = '#335060';
            this.difficultySettingEasy.style.shadow = {

              offsetX: 0,
              offsetY: 0,
              color: '#335060',
              blur: 4,
              stroke: 20,
              fill: '#335060'
    
            };

            this.difficultySettingHard.text = "HARD";
            this.difficultySettingEasy.text = "easy";
            this.difficulty = !this.difficulty;

          }

        }

        this.highScoreText.text = highScore;

        // game start logic
        
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

          this.sound.play('sfx_select');
          this.scene.start("playScene");  

        }

    }

}