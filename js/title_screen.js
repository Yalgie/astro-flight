"use strict"

var title_screen = {
  	create: function(){
        this.starfield = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starfield');
        this.click_sfx = this.game.add.audio('click');

        this.logo = this.game.add.image(15, 0, 'logo')
        this.logo.width = this.game.width - 30

        if (this.logo.width > 300) {
            // this.logo.width = 300;
        }

        this.logo.height = this.logo.width / 2

        this.createButtons();
        this.createButtonsText();

        this.logo.y = 20;
	},

    createButtons: function() {
        this.button_1 = this.drawButton(
            this.logo.height + 40,
            15,
            0xFFFFFF,
            0xF1F1F1
        )
        this.button_1.events.onInputUp.add(this.launchCredits, this);
        
        this.button_2 = this.drawButton(
            this.button_1.y + this.button_1.height + 15,
            15,
            0xFFFFFF,
            0xF1F1F1
        )
        this.button_2.events.onInputUp.add(this.launchSettings, this);

        this.button_3 = this.drawButton(
            this.button_2.y + this.button_2.height + 15,
            15,
            0xFFFFFF,
            0xF1F1F1
        )
        this.button_3.events.onInputUp.add(this.launchHowTo, this);

        this.button_4 = this.drawButton(
            this.button_3.y + this.button_3.height + 15,
            15,
            0x22A7DA,
            0x44BBE6
        )
        this.button_4.events.onInputUp.add(this.launchLevel1, this);
    },

    createButtonsText: function() {
        this.button_4_text = this.drawText(
            "#F1F1F1",
            this.button_4.y + (this.button_4.height / 2),
            "Play"
        );

        this.button_3_text = this.drawText(
            "#333",
            this.button_3.y + (this.button_3.height / 2),
            "How To Play"
        );

        this.button_2_text = this.drawText(
            "#333",
            this.button_2.y + (this.button_2.height / 2),
            "Settings"
        );

        this.button_1_text = this.drawText(
            "#333",
            this.button_1.y + (this.button_1.height / 2),
            "Credits"
        );
    },

    update: function() {
        this.starfield.tilePosition.y += 5;
    },

	launchLevel1: function(){
        this.click_sfx.play()
		this.game.state.start("level_1");
	},

    launchHowTo: function(){
        this.click_sfx.play()
        this.game.state.start("how_to_play");
    },

    launchSettings: function(){
        this.click_sfx.play()
        this.game.state.start("settings");
    },

    launchCredits: function(){
        this.click_sfx.play()
        this.game.state.start("credits");
    },

    drawButton: function(yPos, xPos, fill, stroke) {
        var height = ((this.game.height - this.logo.height) / 4) - 28;
        var graphic = this.game.add.graphics(15, 15);
        graphic.beginFill(fill);
        graphic.lineStyle(3, stroke, 1);
        graphic.alpha = 1;
        graphic.drawRoundedRect(0, 0, this.game.width - 30, height, 6);
        graphic.y = yPos;
        graphic.x = xPos;
        graphic.anchor.setTo(0.5);
        graphic.inputEnabled = true;
        return graphic;
    },

    drawText: function(fill_var, yPos, text_var) {
        var style = { 
            font: "50px kenney_pixelregular", 
            fill: fill_var, 
            boundsAlignH: "center", 
            boundsAlignV: "middle",
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.game.width
        };

        var text = this.game.add.text(
            0, 
            yPos, 
            text_var, 
            style
        );

        text.setTextBounds(0, 0, this.game.width, 0);

        return text;
    }
}