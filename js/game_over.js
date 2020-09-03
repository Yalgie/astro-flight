"use strict"

var game_over = {
    create: function(){
        this.starfield = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starfield');
        this.click_sfx = this.game.add.audio('click');
        var button_1 = this.game.add.image(15, 0, 'grey_button')
        button_1.width = this.game.width - 30
        button_1.height = button_1.width / 4
        button_1.y = this.game.height - (button_1.height + 15)
        button_1.alpha = 0
        button_1.inputEnabled = true;

        var button_2 = this.game.add.image(15, 0, 'blue_button')
        button_2.width = this.game.width - 30
        button_2.height = button_2.width / 4
        button_2.y = button_1.y - (button_1.height) - 15
        button_2.alpha = 0
        button_2.inputEnabled = true;

        // var button_3 = this.game.add.image(15, 0, 'grey_button')
        // button_3.width = this.game.width - 30
        // button_3.height = button_3.width / 4
        // button_3.y = button_2.y - (button_2.height) - 15
        // button_3.inputEnabled = true;
        // button_3.events.onInputDown.add(this.launchMenu, this);

        // var button_4 = this.game.add.image(15, 0, 'blue_button')
        // button_4.width = this.game.width - 30
        // button_4.height = button_4.width / 4
        // button_4.y = button_3.y - (button_3.height) - 15
        // button_4.inputEnabled = true;
        // button_4.events.onInputDown.add(this.launchLevel1, this);

        this.button_style = { 
            font: "50px kenney_pixelregular", 
            fill: "#F1F1F1", 
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        };
        this.game_over_style = { 
            font: "50px kenney_pixelregular", 
            fill: "#F1F1F1", 
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        };
        this.button_2_style = { 
            font: "50px kenney_pixelregular", 
            fill: "#333", 
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        };

        this.play_again_text = this.game.add.text(
            3, 
            button_2.y - 5, 
            "Play Again", 
            this.button_style
        );

        this.play_again_text.setTextBounds(0, 0, this.game.width, 100);
        this.play_again_text.alpha = 0

        this.back_to_menu_text = this.game.add.text(
            3, 
            button_1.y - 5, 
            "Back To Menu", 
            this.button_2_style
        );

        this.back_to_menu_text.setTextBounds(0, 0, this.game.width, 100);
        this.back_to_menu_text.alpha = 0

        // this.settings_text = this.game.add.text(
        //     3, 
        //     button_2.y - 5, 
        //     "Settings", 
        //     this.button_2_style
        // );

        // this.settings_text.setTextBounds(0, 0, this.game.width, 100);

        // this.credits_text = this.game.add.text(
        //     3, 
        //     button_1.y - 5, 
        //     "Credits", 
        //     this.button_2_style
        // );

        // this.credits_text.setTextBounds(0, 0, this.game.width, 100);

        this.game_over_text = this.game.add.text(
            0, 
            15, 
            "Game Over", 
            this.game_over_style
        );

        this.game_over_text.setTextBounds(0, 0, this.game.width, 100);

        this.your_score = this.game.add.text(
            0, 
            100, 
            "Score:", 
            this.button_style
        );

        this.your_score.setTextBounds(0, 0, this.game.width, 100);

        this.your_score_2 = this.game.add.text(
            0, 
            150, 
            this.game.score, 
            this.button_style
        );

        this.your_score_2.setTextBounds(0, 0, this.game.width, 100);

        this.high_score = this.game.add.text(
            0, 
            250, 
            "High Score:", 
            this.button_style
        );

        this.high_score.setTextBounds(0, 0, this.game.width, 100);

        this.high_score_2 = this.game.add.text(
            0, 
            300, 
            localStorage.getItem('score'), 
            this.button_style
        );

        this.high_score_2.setTextBounds(0, 0, this.game.width, 100);

        this.game.add.tween(button_1).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(button_2).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.play_again_text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        var tween = this.game.add.tween(this.back_to_menu_text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(bind_inputs, this);

        function bind_inputs () {
            button_1.events.onInputDown.add(this.launchMenu, this);
            button_2.events.onInputDown.add(this.launchLevel1, this);
        }
    },

    update: function() {
        this.starfield.tilePosition.y += 5;
    },
    launchLevel1: function(){
        this.click_sfx.play()
        this.game.state.start("level_1");
    },
    launchMenu: function(){
        this.click_sfx.play()
        this.game.state.start("title_screen");
    }
}