"use strict"

var preload = {
	preload: function(){ 
        // Splash
        this.game.load.image('logo', "logo.png")

        // BG & MISC
        this.game.load.image('starfield', 'assets/starfield.png');
        // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        // Audio
        this.game.load.audio('lazer', 'assets/sfx/lazer.mp3');
        this.game.load.audio('explosion', 'assets/sfx/explosion.mp3');
        this.game.load.audio('health_loss', 'assets/sfx/health_loss.mp3');
        this.game.load.audio('gameover', 'assets/sfx/gameover.mp3');
        this.game.load.audio('powerup', 'assets/sfx/upgrade.mp3');
        this.game.load.audio('click', 'assets/sfx/button_click.mp3');
        this.game.load.audio('rumble', 'assets/sfx/rumble.mp3');
        this.game.load.audio('music_1', 'assets/sfx/Astro Fight Theme.mp3');

        // Player
        this.game.load.image('ship', 'assets/ship/ship.png');
        // this.game.load.image('lazer_effect', 'assets/ship/lazer_effect.png');
        this.game.load.image('lazer', 'assets/ship/lazer.png');
        // this.game.load.image('thruster', 'assets/ship/thruster.png');

        // Meteors
        this.game.load.spritesheet('meteor_explosion', 'assets/meteors/explosion.png', 96, 91);
        this.game.load.image('meteor_brown_1', 'assets/meteors/meteorBrown_big1.png')
        this.game.load.image('meteor_brown_2', 'assets/meteors/meteorBrown_big2.png')
        this.game.load.image('meteor_brown_3', 'assets/meteors/meteorBrown_big3.png')
        this.game.load.image('meteor_brown_4', 'assets/meteors/meteorBrown_big4.png')
        this.game.load.image('meteor_brown_5', 'assets/meteors/meteorBrown_med1.png')
        this.game.load.image('meteor_brown_6', 'assets/meteors/meteorBrown_med3.png')
        this.game.load.image('meteor_grey_1', 'assets/meteors/meteorGrey_big2.png')
        this.game.load.image('meteor_grey_2', 'assets/meteors/meteorGrey_big3.png')
        this.game.load.image('meteor_grey_3', 'assets/meteors/meteorGrey_big1.png')
        this.game.load.image('meteor_grey_4', 'assets/meteors/meteorGrey_big4.png')
        this.game.load.image('meteor_grey_5', 'assets/meteors/meteorGrey_med1.png')
        this.game.load.image('meteor_grey_6', 'assets/meteors/meteorGrey_med2.png')

        this.game.load.image('meteor_huge_1', 'assets/meteors/spaceMeteors_001.png')
        this.game.load.image('meteor_huge_2', 'assets/meteors/spaceMeteors_002.png')
        this.game.load.image('meteor_huge_3', 'assets/meteors/spaceMeteors_003.png')
        this.game.load.image('meteor_huge_4', 'assets/meteors/spaceMeteors_004.png')
 
        // Fuel Bar
        this.game.load.image('fuel_left', 'assets/bars/barHorizontal_blue_left.png')
        this.game.load.image('fuel_mid', 'assets/bars/barHorizontal_blue_mid.png')
        this.game.load.image('fuel_right', 'assets/bars/barHorizontal_blue_right.png')
        this.game.load.image('shield_left', 'assets/bars/barHorizontal_green_left.png')
        this.game.load.image('shield_mid', 'assets/bars/barHorizontal_green_mid.png')
        this.game.load.image('shield_right', 'assets/bars/barHorizontal_green_right.png')
        this.game.load.image('bg_left', 'assets/bars/barHorizontal_shadow_left.png')
        this.game.load.image('bg_mid', 'assets/bars/barHorizontal_shadow_mid.png')
        this.game.load.image('bg_right', 'assets/bars/barHorizontal_shadow_right.png')

        // UI
        this.game.load.image('blue_button', 'assets/ui/blue_button.png')
        this.game.load.image('grey_button', 'assets/ui/grey_button.png')
        this.game.load.image('tick', 'assets/ui/tick.png')
        this.game.load.image('cross', 'assets/ui/cross.png')

        // Powerups
        this.game.load.image('powerup_fuel', 'assets/powerups/powerup_fuel.png')
        this.game.load.image('powerup_shield', 'assets/powerups/powerup_shield.png')
        this.game.load.image('powerup_score', 'assets/powerups/powerup_score.png')

        // Load Fonts
        document.fonts.load('10pt "kenney_pixelregular"')
	},
  	create: function(){
		this.game.state.start("title_screen");
	}
}