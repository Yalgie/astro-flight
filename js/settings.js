"use strict"

var settings = {
    create: function(){
        this.starfield = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starfield');
        this.click_sfx = this.game.add.audio('click');

        var top_bar = this.game.add.graphics(15, 30);
        top_bar.beginFill(0x22A7DA);
        top_bar.lineStyle(3, 0x44BBE6, 1);
        top_bar.alpha = 1
        top_bar.drawRoundedRect(0, 0, this.game.width - 30, 75, 6);
        top_bar.anchor.setTo(0.5)

        var button_1 = this.game.add.graphics(15, top_bar.height + 45);
        button_1.beginFill(0xFFFFFF);
        button_1.lineStyle(3, 0xF1F1F1, 1);
        button_1.alpha = 1
        button_1.drawRoundedRect(0, 0, this.game.width - 30, 75, 6);
        button_1.y = this.game.height - (button_1.height + 15)
        button_1.inputEnabled = true;
        button_1.events.onInputDown.add(this.launchMenu, this);
        button_1.anchor.setTo(0.5)

        var content = this.game.add.graphics(15, top_bar.height + 45);
        content.beginFill(0xFFFFFF);
        content.lineStyle(3, 0xF1F1F1, 1);
        content.alpha = 1
        content.drawRoundedRect(0, 0, this.game.width - 30, this.game.height - button_1.height - top_bar.height - 75, 6);
        content.anchor.setTo(0.5)

        // var button_1 = this.game.add.image(15, 0, 'grey_button')
        // button_1.width = this.game.width - 30
        // button_1.height = button_1.width / 4
        // button_1.y = this.game.height - (button_1.height + 15)
        // button_1.inputEnabled = true;
        // button_1.events.onInputDown.add(this.launchMenu, this);

        this.tick_1 = this.game.add.image(this.game.width / 2, 0, 'tick')
        this.tick_1.anchor.setTo(0.5)
        this.tick_1.width = this.game.width / 8
        this.tick_1.height = this.tick_1.width
        this.tick_1.y = this.game.height / 2 - 75
        this.tick_1.inputEnabled = true;
        this.tick_1.events.onInputDown.add(this.tickClick_1, this);

        this.tick_2 = this.game.add.image(this.game.width / 2, 0, 'tick')
        this.tick_2.anchor.setTo(0.5)
        this.tick_2.width = this.game.width / 8
        this.tick_2.height = this.tick_2.width
        this.tick_2.y = (this.game.height / 2) + 50
        this.tick_2.inputEnabled = true;
        this.tick_2.events.onInputDown.add(this.tickClick_2, this);

        this.cross_1 = this.game.add.image(this.game.width / 2, 0, 'cross')
        this.cross_1.anchor.setTo(0.5)
        this.cross_1.width = this.game.width / 8
        this.cross_1.height = this.cross_1.width
        this.cross_1.y = this.game.height / 2 - 75
        this.cross_1.inputEnabled = true;
        this.cross_1.events.onInputDown.add(this.crossClick_1, this);
        this.cross_1.inputEnabled = false;
        this.cross_1.alpha = 0

        this.cross_2 = this.game.add.image(this.game.width / 2, 0, 'cross')
        this.cross_2.anchor.setTo(0.5)
        this.cross_2.width = this.game.width / 8
        this.cross_2.height = this.cross_2.width
        this.cross_2.y = (this.game.height / 2) + 50
        this.cross_2.inputEnabled = true;
        this.cross_2.events.onInputDown.add(this.crossClick_2, this);

        if (localStorage.getItem('music') == "off") {
            this.tick_1.inputEnabled = false;
            this.tick_1.alpha = 0
            this.cross_1.inputEnabled = true;
            this.cross_1.alpha = 1
        }
        else {
            this.tick_1.inputEnabled = true;
            this.tick_1.alpha = 1
            this.cross_1.inputEnabled = false;
            this.cross_1.alpha = 0
        }

        if (localStorage.getItem('sfx') == "off") {
            this.tick_2.inputEnabled = false;
            this.tick_2.alpha = 0
            this.cross_2.inputEnabled = true;
            this.cross_2.alpha = 1
        }
        else {
            this.tick_2.inputEnabled = true;
            this.tick_2.alpha = 1
            this.cross_2.inputEnabled = false;
            this.cross_2.alpha = 0
        }

        this.white_text_style = { 
            font: "50px kenney_pixelregular", 
            fill: "#F1F1F1", 
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        };
        this.black_text_style = { 
            font: "50px kenney_pixelregular", 
            fill: "#333", 
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        };

        this.back_to_menu_text = this.game.add.text(
            0, 
            0, 
            "Back To Menu", 
            this.black_text_style
        );
        this.back_to_menu_text.y = button_1.y - 10

        this.back_to_menu_text.setTextBounds(0, 0, this.game.width, 100);

        this.settings_text = this.game.add.text(
            0, 
            0, 
            "Settings", 
            this.white_text_style
        );
        this.settings_text.y = top_bar.y - 10

        this.settings_text.setTextBounds(0, 0, this.game.width, 100);

        this.music_text = this.game.add.text(
            0, 
            this.tick_1.y, 
            "Music", 
            this.black_text_style
        );
        this.music_text.setTextBounds(0, 0, this.game.width, 100);

        this.sfx_text = this.game.add.text(
            0, 
            this.tick_2.y, 
            "SFX", 
            this.black_text_style
        );
        this.sfx_text.setTextBounds(0, 0, this.game.width, 100);

        
    },
    tickClick_1: function() {
        this.tick_1.alpha = 0
        this.tick_1.inputEnabled = false
        this.cross_1.alpha = 1
        this.cross_1.inputEnabled = true
        localStorage.setItem('music', 'off');
    },

    tickClick_2: function() {
        this.tick_2.alpha = 0
        this.tick_2.inputEnabled = false
        this.cross_2.alpha = 1
        this.cross_2.inputEnabled = true
        localStorage.setItem('sfx', 'off');
    },

    crossClick_1: function() {
        this.tick_1.alpha = 1
        this.tick_1.inputEnabled = true
        this.cross_1.alpha = 0
        this.cross_1.inputEnabled = false
        localStorage.setItem('music', 'on');
    },

    crossClick_2: function() {
        this.tick_2.alpha = 1
        this.tick_2.inputEnabled = true
        this.cross_2.alpha = 0
        this.cross_2.inputEnabled = false
        localStorage.setItem('sfx', 'on');
    },

    update: function() {
        this.starfield.tilePosition.y += 5;
    },
    launchMenu: function(){
        this.click_sfx.play()
        this.game.state.start("title_screen");
    }
}