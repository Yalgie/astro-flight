"use strict"

var credits = {
    create: function(){
        this.starfield = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starfield');
        this.click_sfx = this.game.add.audio('click');
        var top_bar = this.game.add.graphics(15, 30);
        top_bar.beginFill(0x22A7DA);
        top_bar.lineStyle(3, 0x44BBE6, 1);
        top_bar.alpha = 1
        top_bar.drawRoundedRect(0, 0, this.game.width - 30, 75, 6);
        top_bar.anchor.setTo(0.5)

        this.group1 = this.game.add.group();
        var button_1 = this.game.add.graphics(15, top_bar.height + 45);
        button_1.beginFill(0xFFFFFF);
        button_1.lineStyle(3, 0xF1F1F1, 1);
        button_1.alpha = 1
        button_1.drawRoundedRect(0, 0, this.game.width - 30, 75, 6);
        button_1.y = this.game.height - (button_1.height + 15)
        button_1.inputEnabled = true;
        button_1.events.onInputDown.add(this.launchMenu, this);
        button_1.anchor.setTo(0.5)
        this.group1.add(button_1)

        this.content = this.game.add.graphics(15, top_bar.height + 45);
        this.content.beginFill(0xFFFFFF);
        this.content.lineStyle(3, 0xF1F1F1, 1);
        this.content.alpha = 1
        this.content.drawRoundedRect(0, 0, this.game.width - 30, this.game.height - button_1.height - top_bar.height - 75, 6);

        var content_mask = this.game.add.graphics(15, top_bar.height + 45);
        content_mask.beginFill(0xFFFFFF);
        content_mask.lineStyle(3, 0xF1F1F1, 1);
        content_mask.alpha = 1
        content_mask.drawRoundedRect(0, 0, this.game.width - 30, this.game.height - button_1.height - top_bar.height - 75, 6);
        // content.anchor.setTo(0.5)

        this.game_over_style = { 
            font: "50px kenney_pixelregular", 
            fill: "#F1F1F1", 
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        };

        this.instructions_style = { 
            font: "30px kenney_pixelregular", 
            fill: "#333", 
            boundsAlignH: "center", 
            boundsAlignV: "top",
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.content.width - 30
        };

        this.button_2_style = { 
            font: "50px kenney_pixelregular", 
            fill: "#333", 
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        };

        

        this.game_over_text = this.game.add.text(
            0, 
            top_bar.y - 10, 
            "Credits", 
            this.game_over_style
        );

        this.game_over_text.setTextBounds(0, 0, this.game.width, 100);

        this.step_1 = this.game.add.text(
            0, 
            this.content.y, 
            "Programming // Daniel Yalg \n\nDesign // Daniel Yalg \n\nMusic // Kevin Brew \n\nArtwork // Joseph-Paul Silipo (aka Huge_Pixel) \n\nAssets // Kenney\n\nSFX // Kenney", 
            this.instructions_style
        );

        this.step_1.setTextBounds(30, 15, this.content.width - 30, 0);
        this.step_1.inputEnabled = true;
        this.step_1.input.enableDrag(false, true);
        this.step_1.input.allowHorizontalDrag = false;
        this.step_1.mask = content_mask
        
        this.back_to_menu_text = this.game.add.text(
            0, 
            button_1.y - 10, 
            "Back To Menu", 
            this.button_2_style
        );

        this.back_to_menu_text.setTextBounds(0, 0, this.game.width, 100);
        this.group1.add(this.back_to_menu_text)
    },

    update: function() {
        this.game.world.bringToTop(this.group1);
        if (this.step_1.y > this.content.y) {
            this.step_1.y = this.content.y
        }
        if (this.step_1.y < -Math.abs(this.step_1.height - this.content.height)) {
            this.step_1.y = -Math.abs(this.step_1.height - this.content.height)
        }
        this.starfield.tilePosition.y += 5;
    },

    launchMenu: function(){
        this.click_sfx.play()
        this.game.state.start("title_screen");
    }
}