"use strict"

var how_to_play = {
    create: function(){
        this.paused_bool = false;
        this.shooting = false;
        this.starfield = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starfield');
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.setup_sfx()
        this.setup_lazers()
        this.setup_powerups()
        this.setup_meteors()
        this.setup_bg_bars()
        this.setup_fuel_bar()
        this.setup_shield_bar()
        this.setup_score()
        this.setup_player()
        this.setupPause()
        this.setup_fuel_warning()
        this.setup_shield_warning()

        this.fuel_bg_left.alpha = 0;
        this.fuel_bg_mid.alpha = 0;
        this.fuel_bg_right.alpha = 0;
        this.shield_bg_left.alpha = 0;
        this.shield_bg_mid.alpha = 0;
        this.shield_bg_right.alpha = 0;
        this.fuel_left.alpha = 0;
        this.fuel_mid.alpha = 0;
        this.fuel_right.alpha = 0;
        this.shield_left.alpha = 0;
        this.shield_mid.alpha = 0;
        this.shield_right.alpha = 0;

        this.fuel_text.alpha = 0;
        this.shield_text.alpha = 0;
        this.game.score_text.alpha = 0;
        this.game.multiplyer_text.alpha = 0;

        this.step = 1;

        this.next_btn = this.drawButton(
            30,
            this.pause_btn.width + 30,
            0x22A7DA,
            0x44BBE6,
            40,
            this.game.width - this.pause_btn.width - 45
        )
        this.next_btn.events.onInputUp.add(this.next_step, this);

        this.step_text = this.drawText(
            "#F1F1F1",
            0,
            "Tilt your device left and right to steer your ship.\n\nThis works best when playing in a seated position.",
            "40px"
        );

        this.step_text.y = this.game.height / 2 - 350

        this.next_btn_text = this.drawYText(
            "#F1F1F1",
            this.next_btn.y + (this.next_btn.height / 2),
            "Got It",
            "40px"
        );
        this.next_btn_text.x = this.next_btn.x - this.next_btn_text.width / 2
        
    },

    next_step: function() {
        for (var i = 0; i < this.lazers.children.length; i++) {
            this.lazers.children[i].kill()
        }
        this.tap_trigger = true;
        if (this.step == 1) {
            this.game.input.onTap.add(this.fire_ze_lazorrr, this);
            this.enableLazers = true;
            this.step_text.text = "Tap on the screen to shoot."
        }
        if (this.step == 2) {
            this.step_text.text = "Your fuel bar is located in the bottom left corner."
            this.fuel_bg_left.alpha = 1;
            this.fuel_bg_mid.alpha = 1;
            this.fuel_bg_right.alpha = 1;
            this.fuel_left.alpha = 1;
            this.fuel_mid.alpha = 1;
            this.fuel_right.alpha = 1;
            this.fuel_text.alpha = 1;
            this.game.add.tween(this.player).to( { y: this.player.y - 50 }, 500, "Linear", true, -1)
        }
        if (this.step == 3) {
            this.step_text.text = "Your ship will consume fuel slowly over time.\n\nShooting your lazer also depletes your fuel supply."
            this.game.time.events.loop(Phaser.Timer.SECOND, this.deplete_fuel, this);
        }
        if (this.step == 4) {
            this.step_text.text = "You can increase your fuel supply by collecting blue fuel powerups.\n\nJust like this one."
            this.enablePowerups = true;
            this.drop_one_fuel()
        }
        if (this.step == 5) {
            this.step_text.text = "Try collecting the powerup when it's close enough to your ship."
            this.enablePowerupsMovement = true;
        }
        if (this.step == 6) {
            this.step_text.text = "Nice work pilot!\n\nNext up is your shield system."
            this.enablePowerupsMovement = false;
            this.powerup_fuel.destroy()
        }
        if (this.step == 7) {
            this.shield_bg_left.alpha = 1;
            this.shield_bg_mid.alpha = 1;
            this.shield_bg_right.alpha = 1;
            this.shield_left.alpha = 1;
            this.shield_mid.alpha = 1;
            this.shield_right.alpha = 1;
            this.shield_text.alpha = 1;
            this.step_text.text = "Your shield bar is located in the bottom right of the screen."
        }
        if (this.step == 8) {
            this.step_text.text = "Your shield system will protect you from direct impacts from meteors.\n\nEvery hit from a meteor will reduce your shields."
        }
        if (this.step == 9) {
            this.step_text.text = "Much like your fuel, you can collect green shield powerups to increase your shield capacity."
            this.drop_one_shield()
        }
        if (this.step == 10) {
            this.step_text.text = "If your shields or fuel levels become low, a flasing warning indicator will appear in the top left of the screen."
            this.powerup_shield.destroy()
            this.low_fuel.visible = true;
            this.low_shield.visible = true;
        }
        if (this.step == 11) {
            this.low_fuel.visible = false;
            this.low_shield.visible = false;
            this.step_text.text = "Fuel and shield powerups are obtained from destroying meteors. Like these."
            this.enableMeteorShooting = false;
            this.show_meteor()
        }
        if (this.step == 12) {
            this.step_text.text = "Meteors come in different sizes and colours. The larger the meteor, the more damage it will take to destroy."
        }
        if (this.step == 13) {
            this.step_text.text = "You can destroy meteors by shooting them with your lazers. Go ahead and give it a go now."
            this.enableMeteorShooting = true;
        }
        if (this.step == 14) {
            this.demo_meteor.destroy()
            this.demo_meteor_2.destroy()
            this.step_text.text = "Good Shooting Pilot!\n\nKeep in mind that normally these meteors will be moving towards you."
        }
        if (this.step == 15) {
            this.step_text.text = "Every time you destroy a meteor you increase your score multiplyer.\n\nYou can see your multiplyer above your shield bar."
            this.game.multiplyer_text.alpha = 1;
        }
        if (this.step == 16) {
            this.step_text.text = "Your score appears above your fuel bar.\n\nIf you miss a meteor or get hit by one, your score multiplyer resets."
            this.game.score_text.alpha = 1;
        }
        if (this.step == 17) {
            this.step_text.text = "The aim of the game is to last as long as you can and get the highest possible score."
        }
        if (this.step == 18) {
            this.step_text.text = "Good luck pilot."
        }
        if (this.step == 19) {
            this.game.state.start("title_screen")
        }
        this.step_text.y = this.game.height / 2 - 350
        this.step += 1;
        this.tap_trigger = false;
    },

    show_meteor: function() {
        this.demo_meteor = this.game.add.sprite(0, 100, 'meteor_brown_2');
        this.demo_meteor.x = this.demo_meteor.width - 15
        this.game.physics.enable(this.demo_meteor);
        this.demo_meteor.anchor.setTo(0.5)
        this.demo_meteor.health = 2
        this.demo_meteor.body.immovable = true
        this.meteors.add(this.demo_meteor)

        this.demo_meteor_2 = this.game.add.sprite(0, 100, 'meteor_grey_2');
        this.demo_meteor_2.x = this.game.width - this.demo_meteor_2.width + 15
        this.game.physics.enable(this.demo_meteor_2);
        this.demo_meteor_2.anchor.setTo(0.5)
        this.demo_meteor_2.health = 2
        this.demo_meteor_2.body.immovable = true
        this.meteors.add(this.demo_meteor_2)
    },

    drop_one_fuel: function() {
        this.powerup_fuel = this.game.add.sprite(0, 100, 'powerup_fuel');
        this.powerup_fuel.x = this.game.width / 2 - this.powerup_fuel.width + 30
        this.game.physics.enable(this.powerup_fuel);
        this.powerup_fuel.anchor.setTo(0.5)
        this.powerup_fuel.body.setSize(50, 50, 0, 0)
        this.powerups.add(this.powerup_fuel)
    },

    drop_one_shield: function() {
        this.powerup_shield = this.game.add.sprite(0, 100, 'powerup_shield');
        this.powerup_shield.x = this.game.width / 2 - this.powerup_shield.width + 30
        this.game.physics.enable(this.powerup_shield);
        this.powerup_shield.anchor.setTo(0.5)
        this.powerup_shield.body.setSize(50, 50, 0, 0)
        this.powerups.add(this.powerup_shield)
    },

    setup_sfx: function() {
        this.lazer_sfx = this.game.add.audio('lazer');
        this.explosion_sfx = this.game.add.audio('explosion');
        this.shield_loss_sfx = this.game.add.audio('health_loss');
        this.gameover_sfx = this.game.add.audio('gameover');
        this.powerup_sfx = this.game.add.audio('powerup');
        this.rumble_sfx = this.game.add.audio('rumble');
        
        if (localStorage.getItem('music') == "on") {
            if (this.music_1_sfx == null) {  
                this.music_1_sfx = this.game.add.audio('music_1');
                this.music_1_sfx.loop = true
                // this.music_1_sfx.play()    
            } 
        }
    },

    setup_score: function() {
        this.game.score = 0
        this.game.multiplyer = 1

        var score_style = { 
            font: "30px kenney_pixelregular", 
            fill: "rgba(255,255,255,0.5)", 
            boundsAlignH: "left", 
            boundsAlignV: "middle",
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.game.width
        };

        var multi_style = { 
            font: "30px kenney_pixelregular", 
            fill: "rgba(255,255,255,0.5)", 
            boundsAlignH: "right", 
            boundsAlignV: "middle",
            align: "right",
            wordWrap: true,
            wordWrapWidth: this.game.width
        };

        this.game.score_text = this.game.add.text(
            15, 
            this.game.height - 55, 
            this.game.score, 
            score_style
        );

        this.game.score_text.setTextBounds(0, 0, this.game.width, 0);

        this.game.multiplyer_text = this.game.add.text(
            -15, 
            this.game.height - 55, 
            "*" + this.game.multiplyer, 
            multi_style
        );

        this.game.multiplyer_text.setTextBounds(0, 0, this.game.width, 0);
    },

    pauseGame: function() {
        this.paused_bool = true;
        this.pause_btn.destroy()
        this.pause_btn_text.destroy()
        this.setupPauseMenu();
    },

    resumeGame: function() {
        this.paused_bool = false;
        this.resume_btn.destroy()
        this.resume_btn_text.destroy()
        this.quit_btn.destroy()
        this.quit_btn_text.destroy()
        this.setupPause()
    },

    setupPause: function() {
        this.pause_btn = this.drawPauseButton(
            30,
            15,
            0x22A7DA,
            0x44BBE6,
            45
        )
        this.pause_btn.events.onInputUp.add(this.pauseGame, this);

        this.pause_btn_text = this.drawPauseText(
            "#F1F1F1",
            this.pause_btn.y + (this.pause_btn.height / 2),
            "||",
            "40px"
        );
    },
    quitGame: function() {
        this.game.state.start("title_screen");
        
    },
    setupPauseMenu: function() {
        this.resume_btn = this.drawButton(
            this.game.height / 2 - 80,
            15,
            0x22A7DA,
            0x44BBE6,
            80,
            this.game.width - 30
        )
        this.resume_btn.events.onInputUp.add(this.resumeGame, this);
        this.resume_btn.alpha = 0.9;

        this.resume_btn_text = this.drawYText(
            "#F1F1F1",
            this.resume_btn.y + (this.resume_btn.height / 2),
            "Resume",
            "40px"
        );

        this.quit_btn = this.drawButton(
            this.game.height / 2 + 15,
            15,
            0xE8692F,
            0xFA8044,
            80,
            this.game.width - 30
        )
        this.quit_btn.events.onInputUp.add(this.quitGame, this);
        this.quit_btn.alpha = 0.9;

        this.quit_btn_text = this.drawYText(
            "#F1F1F1",
            this.quit_btn.y + (this.quit_btn.height / 2),
            "Quit",
            "40px"
        );
    },

    setup_bg_bars: function() {
        this.bars_buffer = 15
        this.bars_y = this.game.height - (26 + this.bars_buffer)

        this.fuel_bg_left = this.game.add.sprite(0, this.bars_y, 'bg_left');
        this.fuel_bg_mid = this.game.add.sprite(0, this.bars_y, 'bg_mid');
        this.fuel_bg_right = this.game.add.sprite(0, this.bars_y, 'bg_right');

        this.shield_bg_left = this.game.add.sprite(0, this.bars_y, 'bg_left');
        this.shield_bg_mid = this.game.add.sprite(0, this.bars_y, 'bg_mid');
        this.shield_bg_right = this.game.add.sprite(0, this.bars_y, 'bg_right');

        this.bars_mid_width = ((this.game.width / 2) - (this.bars_buffer * 2) - (this.bars_buffer/2))
        this.fuel_bg_mid.width = this.bars_mid_width
        this.shield_bg_mid.width = this.bars_mid_width

        this.fuel_bg_left.x = this.bars_buffer
        this.fuel_bg_mid.x = (this.fuel_bg_left.x + this.fuel_bg_left.width)
        this.fuel_bg_right.x = (this.fuel_bg_mid.x + this.fuel_bg_mid.width)

        this.shield_bg_left.x = (this.fuel_bg_right.x + this.bars_buffer + (this.bars_buffer/2))
        this.shield_bg_mid.x = (this.shield_bg_left.x + this.shield_bg_left.width)
        this.shield_bg_right.x = (this.shield_bg_mid.x + this.shield_bg_mid.width)

        this.style = { 
            font: "20px kenney_pixelregular", 
            fill: "#F1F1F1", 
            align: "left"
        };
    },

    setup_fuel_bar: function() {
        this.fuel_left = this.game.add.sprite(0, this.bars_y, 'fuel_left');
        this.fuel_mid = this.game.add.sprite(0, this.bars_y, 'fuel_mid');
        this.fuel_right = this.game.add.sprite(0, this.bars_y, 'fuel_right');

        this.fuel_mid.width = this.bars_mid_width

        this.fuel_left.x = this.bars_buffer
        this.fuel_mid.x = (this.fuel_left.x + this.fuel_left.width)
        this.fuel_right.x = (this.fuel_mid.x + this.fuel_mid.width)

        this.fuel_text = this.game.add.text(
            (this.fuel_bg_mid.x) + (this.fuel_bg_mid.width/2) - 25, 
            this.fuel_bg_mid.y + 4, 
            "FUEL", 
            this.style
        );
        this.fuel_text.x = this.fuel_text.x + 10
        this.fuel_text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    },

    setup_shield_bar: function() {
        this.shield_left = this.game.add.sprite(0, this.bars_y, 'shield_left');
        this.shield_mid = this.game.add.sprite(0, this.bars_y, 'shield_mid');
        this.shield_right = this.game.add.sprite(0, this.bars_y, 'shield_right');

        this.shield_mid.width = this.bars_mid_width

        this.shield_left.x = (this.fuel_right.x + this.bars_buffer + (this.bars_buffer/2))
        this.shield_mid.x = (this.shield_left.x + this.shield_left.width)
        this.shield_right.x = (this.shield_mid.x + this.shield_mid.width)

        this.shield_text = this.game.add.text(
            (this.shield_bg_mid.x) + (this.shield_bg_mid.width/2) - 32, 
            this.shield_bg_mid.y + 4, 
            "SHIELD", 
            this.style
        );
        this.shield_text.x = this.shield_text.x + 10
        this.shield_text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    },

    setup_player: function() {
        this.player = this.game.add.sprite((this.game.width/2) - 30, this.game.height - 50, 'ship');
        this.player.scale.setTo(0.5)
        this.game.physics.enable(this.player);
        this.player.body.setSize(70, 50, 20, 20);
        this.player.body.immovable = true;
        this.player.body.collideWorldBounds = true;
        this.player_fuel = 100
        this.player_shield = 100
    },

    setup_lazers: function() {
        this.lazers = this.game.add.group();
        this.lazers.enableBody = true;
        this.lazers.createMultiple(10, 'lazer');
        this.lazers.setAll('checkWorldBounds', true);
        this.lazers.setAll('outOfBoundsKill', true);
    },

    setup_meteors: function() {
        this.meteor_speed = 100;
        this.timer_count = 2000;
        this.meteors = this.game.add.group();
        this.meteors.enableBody = true;
        this.spawn_timer();
    },

    spawn_timer: function() {
        // var dur = this.getRandomInt(100, this.timer_count);
        this.spawn_timer_var = null;
        this.spawn_timer_var = this.game.time.create(false);
        this.spawn_timer_var.loop(this.timer_count, this.spawn_meteor, this)
        this.spawn_timer_var.start();
        // this.spawn_timer();
    },

    deplete_fuel: function() {
        if (!this.paused_bool) {
            this.player_fuel -= 1
            this.update_fuel_bar()
        }
    },

    update_fuel_bar: function() {
        if (this.player_fuel >= 100) {
            this.player_fuel = 100
            this.game.score += (2 * this.game.multiplyer)
            this.update_score()
        }

        if (this.player_fuel <= 10) {
            this.player_fuel = 10
            // this.fuel_left.alpha = 0
            // this.fuel_mid.alpha = 0
            // this.fuel_right.alpha = 0

            // var high_score = localStorage.getItem('score');

            // if (high_score == null || high_score == undefined) {
            //     localStorage.setItem('score', this.game.score);      
            // }
            
            // if (high_score < this.game.score) {
            //     localStorage.setItem('score', this.game.score);  
            // }
            // if (localStorage.getItem('sfx') == "on")
            //     this.gameover_sfx.play('', 0, 0.5, false)
            // this.music_1_sfx.stop();
            // this.game.state.start("game_over");

        }
        else {
            var depletion_rate = this.player_fuel * this.bars_mid_width / 100
            this.fuel_mid.width = depletion_rate
            this.fuel_right.x = this.fuel_mid.width + this.fuel_mid.x
        }
    },

    update_shield_bar: function() {
        if (this.player_shield >= 100) {
            this.player_shield = 100
            this.game.score += (2 * this.game.multiplyer)
            this.update_score()
        }



        if (this.player_shield <= -20) {
            if (localStorage.getItem('sfx') == "on")
                this.gameover_sfx.play('', 0, 0.5, false)
            this.shield_left.alpha = 0
            this.shield_mid.alpha = 0
            this.shield_right.alpha = 0

            var high_score = localStorage.getItem('score');

            if (high_score == null || high_score == undefined) {
                localStorage.setItem('score', this.game.score);      
            }
            
            if (high_score < this.game.score) {
                localStorage.setItem('score', this.game.score);  
            }
            this.music_1_sfx.stop();
            this.game.state.start("game_over");
        }
        else {
            var depletion_rate = this.player_shield * this.bars_mid_width / 100
            this.shield_mid.width = depletion_rate
            this.shield_right.x = this.shield_mid.width + this.shield_mid.x
        }
    },

    spawn_meteor: function() {
        if (!this.paused_bool) {
            var meteors_arr = [
                'meteor_brown_1',
                'meteor_brown_2',
                'meteor_brown_3',
                'meteor_brown_4',
                'meteor_brown_5',
                'meteor_brown_6',
                'meteor_grey_1',
                'meteor_grey_2',
                'meteor_grey_3',
                'meteor_grey_4',
                'meteor_grey_5',
                'meteor_grey_6'
            ]
            var huge_meteors_arr = [
                'meteor_huge_1',
                'meteor_huge_2',
                'meteor_huge_3',
                'meteor_huge_4',
            ]

            var huge_or_not = this.getRandomInt(0, 20)

            if (huge_or_not > 1) {
                var meteor = meteors_arr[Math.floor(Math.random()*meteors_arr.length)];    
            }
            else {
                var meteor = huge_meteors_arr[Math.floor(Math.random()*huge_meteors_arr.length)];
            }
            
            
            var meteor_sprite = this.game.add.sprite(0, -200, meteor);
            var spawn_x = this.getRandomInt(
                (meteor_sprite.width / 2) + 15, 
                (this.game.width - (meteor_sprite.width / 2) - 15)
            )
            meteor_sprite.x = spawn_x

            this.game.physics.enable(meteor_sprite);
            
            meteor_sprite.anchor.setTo(0.5)
            if (meteor.indexOf("huge") > 0) {
                meteor_sprite.health = 5
            }
            else if (meteor.indexOf("1") > 0 || 
                meteor.indexOf("2") > 0 || 
                meteor.indexOf("3") > 0 || 
                meteor.indexOf("4") > 0) {
                meteor_sprite.health = 2    
            }
            else {
                meteor_sprite.health = 1
            }
            
            meteor_sprite.body.immovable = true
            this.meteors.add(meteor_sprite)
            

            if (this.timer_count <= 500) {
                this.meteor_speed += 2
                this.timer_count -= 2
            }
            else if (this.timer_count <= 200) {
                this.meteor_speed += 1
                this.timer_count -= 1
            }
            else {
                this.meteor_speed += 3
                this.timer_count -= 15
            }
            this.spawn_timer_var.stop();
            this.spawn_timer();
        }
    },

    update: function() {
        if (!this.paused_bool) {
            this.starfield.tilePosition.y += 5;
            // this.moveMeteors();
            if (this.enableLazers && !this.tap_trigger)
                this.moveLazers();
            if (this.enablePowerupsMovement)
                this.movePowerups()
            if (this.keepFuelUp)
                this.player_fuel = 100;
            this.player_movement()
            // this.check_meteor_y()

            this.game.physics.arcade.collide(this.player, this.meteors, this.meteor_collide_player, null, this);

            if (this.enableMeteorShooting)
                this.game.physics.arcade.collide(this.lazers, this.meteors, this.meteor_collide_lazer, null, this);
            if (this.enablePowerups)
                this.game.physics.arcade.collide(this.player, this.powerups, this.powerup_collide_player, null, this);
        }
        else {
            this.stopMovingObjects()
        }
    },

    setup_fuel_warning: function() {
        this.low_fuel = this.game.add.sprite(15, 0, 'powerup_fuel');
        this.low_fuel.width = this.pause_btn.width
        this.low_fuel.height = this.pause_btn.height
        this.low_fuel.y = this.pause_btn.y + this.pause_btn.height + 15
        
        this.low_fuel.visible = false;
        this.low_fuel.alpha = 0
        this.game.add.tween(this.low_fuel).to( { alpha: 0.5 }, 500, "Linear", true, -1).yoyo(true).loop(true)
    },

    setup_shield_warning: function() {
        this.low_shield = this.game.add.sprite(15, 0, 'powerup_shield');
        this.low_shield.width = this.pause_btn.width
        this.low_shield.height = this.pause_btn.height
        this.low_shield.y = (this.pause_btn.y * 2) + (this.pause_btn.height * 2)
        this.low_shield.visible = false;
        this.low_shield.alpha = 0
        this.game.add.tween(this.low_shield).to( { alpha: 0.5 }, 500, "Linear", true, -1).yoyo(true).loop(true)
    },

    stopMovingObjects: function() {
        for (var i = 0; i < this.meteors.children.length; i++) {
            var meteor = this.meteors.children[i]
            meteor.body.velocity.y = 0
        }
        for (var i = 0; i < this.lazers.children.length; i++) {
            var lazer = this.lazers.children[i]
            lazer.body.velocity.y = 0
        }
        for (var i = 0; i < this.powerups.children.length; i++) {
            var powerup = this.powerups.children[i]
            powerup.body.velocity.y = 0
        }
    },

    movePowerups: function() {
        for (var i = 0; i < this.powerups.children.length; i++) {
            var powerup = this.powerups.children[i]
            powerup.body.velocity.y = 100
        }
    },

    moveMeteors: function() {
        for (var i = 0; i < this.meteors.children.length; i++) {
            var meteor = this.meteors.children[i]
            meteor.body.velocity.y = this.meteor_speed
            meteor.body.gravity.y = this.getRandomInt(0, 100)
        }
        
    },
    moveLazers: function() {
        for (var i = 0; i < this.lazers.children.length; i++) {
            var lazer = this.lazers.children[i]
            lazer.body.velocity.y = -1000
        }
    },
    check_meteor_y: function() {
        for (var i = 0; i < this.meteors.children.length; i++) {
            var meteor = this.meteors.children[i]
            if (meteor.y > this.game.height) {
                meteor.destroy()
                this.game.multiplyer = 1
                this.update_score("minus", 100)
            }
        }
    },

    meteor_collide_player: function(player, meteor) {
        this.update_score("minus", 50)
        this.game.multiplyer = 1
        meteor.health = 0
        this.kill_meteor(meteor)
        this.game.camera.shake(0.01, 500);
        this.player_shield -= 20
        if (localStorage.getItem('sfx') == "on")
            this.shield_loss_sfx.play('', 0, 0.2, false)
        this.update_shield_bar()
    },

    meteor_collide_lazer: function(lazer, meteor) {
        if (localStorage.getItem('sfx') == "on")
            this.rumble_sfx.play('', 0, 0.2, false)
        if (meteor.health <= 1) {
            this.powerup(meteor)
            this.game.multiplyer += 1
        }
        if (meteor.key.indexOf("huge") > 0) {
            this.update_score("plus", 2)
        }
        else {
            this.update_score("plus", 1)
        }
        this.kill_meteor(meteor)
        lazer.kill()
    },

    shake_sprite: function(meteor) {
        this.shake_total = 0;
        this.current_shake_meteor = meteor
        this.shake_timer = this.game.time.create(false);
        this.shake_timer.loop(50, shake, this);
        this.shake_timer.start();

        function shake() {
            this.shake_total++;
            if (this.shake_total == 1 || this.shake_total == 5 || this.shake_total == 9) {
                this.current_shake_meteor.x += this.getRandomInt(1,5)
                this.current_shake_meteor.y -= this.getRandomInt(1,3)
            }
            if (this.shake_total == 2 || this.shake_total == 6) {
                this.current_shake_meteor.x -= this.getRandomInt(1,5)
                this.current_shake_meteor.y += this.getRandomInt(1,3)
            }
            if (this.shake_total == 3 || this.shake_total == 7) {
                this.current_shake_meteor.x += this.getRandomInt(1,5)
                this.current_shake_meteor.y += this.getRandomInt(1,3)
            }
            if (this.shake_total == 4 || this.shake_total == 8) {
                this.current_shake_meteor.x -= this.getRandomInt(1,5)
                this.current_shake_meteor.y -= this.getRandomInt(1,3)
            }
            else if (this.shake_total >= 10) {
                this.shake_timer.stop()
            }
        }
    },

    powerup_collide_player: function(player, powerup) {
        if (localStorage.getItem('sfx') == "on")
            this.powerup_sfx.play('', 0, 0.2, false)
        if (powerup.key == "powerup_fuel") {
            this.player_fuel += 20
            this.update_fuel_bar()
        }
        else if (powerup.key == "powerup_shield") {
            this.player_shield += 20   
            this.update_shield_bar()
        }
        else if (powerup.key == "powerup_score") {
            
        }
        powerup.kill()
    },

    setup_powerups: function() {
        this.powerups = this.game.add.group();
        this.powerups.enableBody = true;
    },

    powerup: function(meteor) {
        // var powerups_arr = [
        //     'powerup_fuel',
        //     'powerup_fuel',
        //     'powerup_fuel',
        //     'powerup_fuel',
        //     'powerup_shield'
        //     // 'powerup_score'
        // ]
        // var spawn_powerup = this.getRandomInt(0, 10)

        // if (meteor.key.indexOf("huge") > 0 || spawn_powerup <= 1) {
        //     // do another random int and 1-4 is energy 4-7 shield 9=10 score etc
        //     var powerup = powerups_arr[Math.floor(Math.random()*powerups_arr.length)];
        //     var powerup_sprite = this.game.add.sprite(meteor.x, meteor.y, powerup);
        //     this.game.physics.enable(powerup_sprite);
        //     powerup_sprite.anchor.setTo(0.5)
        //     powerup_sprite.body.setSize(50, 50, 0, 0)
        //     powerup_sprite.body.velocity.y = 100
        //     this.powerups.add(powerup_sprite)
        // }
    },

    update_score: function(minusplus, int) {
        if (minusplus == "minus")  {
            this.game.score -= int
        }
        else if (minusplus == "plus") {
            this.game.score += (int * this.game.multiplyer)
        }
        this.game.multiplyer_text.text = "*" + this.game.multiplyer
        this.game.score_text.text = this.game.score
    },

    kill_meteor: function(meteor) {
        meteor.health -= 1
        
        if (meteor.health <= 0) {
            this.meteors.remove(meteor)
            if (localStorage.getItem('sfx') == "on")
                this.explosion_sfx.play('', 0, 0.2, false)
            this.game.add.tween(meteor).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
            var explosion = this.game.add.sprite(meteor.x, meteor.y, 'meteor_explosion');
            explosion.anchor.setTo(0.5)
            explosion.width = meteor.width
            explosion.height = meteor.height

            explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, false);
            explosion.animations.play('explode');
            explosion.animations.currentAnim.onComplete.add(function () {  
                explosion.kill()
                meteor.kill()
            }, this);
        }
        else {
            this.shake_sprite(meteor)
        }
    },

    player_movement: function() {
        // var xyz = gyro.getOrientation()

        // if (xyz.x > 0.7 && cordova.platformId =="ios" || xyz.x < -0.7 && cordova.platformId == "android") {
        //     this.player.body.velocity.x = 350
        //     this.game.add.tween(this.player).to( { angle: 15 }, 100, Phaser.Easing.Linear.None, true);
        // }
        // else if (xyz.x < -0.7 && cordova.platformId =="ios" || xyz.x > 0.7 && cordova.platformId == "android") {
        //     this.player.body.velocity.x = -350
        //     this.game.add.tween(this.player).to( { angle: -15 }, 100, Phaser.Easing.Linear.None, true);
        // }
        // else {
        //     this.player.body.velocity.x = 0   
        //     this.game.add.tween(this.player).to( { angle: 0 }, 100, Phaser.Easing.Linear.None, true);
        // }

        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 350
            this.game.add.tween(this.player).to({ angle: 15 }, 100, Phaser.Easing.Linear.None, true);
        }
        else if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -350
            this.game.add.tween(this.player).to({ angle: -15 }, 100, Phaser.Easing.Linear.None, true);
        }
        else {
            this.player.body.velocity.x = 0
            this.game.add.tween(this.player).to({ angle: 0 }, 100, Phaser.Easing.Linear.None, true);
        }

        if (this.enableLazers) {
            if (this.spaceKey.isDown && !this.shooting) {
                this.shooting = true;
                this.fire_ze_lazorrr()
            }
            if (this.spaceKey.isUp) {
                this.shooting = false;
            }
        }
    },

    fire_ze_lazorrr: function() {
        if (!this.tap_trigger) {
            if (this.lazers.countDead() > 0) {
                if (localStorage.getItem('sfx') == "on")
                    this.lazer_sfx.play('', 0, 0.2, false)
                var lazer = this.lazers.getFirstDead();
                lazer.body.setSize(9, 20, 0, 30);
                lazer.reset(this.player.x + 20, this.player.y - 20);
                lazer.body.velocity.y = -1000
                this.deplete_fuel()
            }
        }
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    render: function() {
        // var xyz = gyro.getOrientation()

        // this.game.debug.body(this.player);
        // this.game.debug.text('Active Lazers: ' + this.lazers.countLiving() + ' / ' + this.lazers.total, 32, 32);
        // this.game.debug.text('Active Meteors: ' + this.meteors.countLiving() + ' / ' + this.meteors.total, 32, 62);
        // this.game.debug.text('Multi:' + this.game.multiplyer, 32, 92)
        // this.game.debug.text('X:' + xyz.x, 32, 32)
        // this.game.debug.text('Y:' + xyz.y, 32, 62)
        // this.game.debug.text('Z:' + xyz.z, 32, 92)
        // this.game.debug.text('Speed:' + this.meteor_speed, 32, 152)
        // this.game.debug.text('Timer:' + this.timer_count, 32, 182)
        // this.game.debug.text('Fuel:' + this.player_fuel, 32, 212)
        // this.game.debug.text('shield:' + this.player_shield, 32, 242)
    },

    drawButton: function(yPos, xPos, fill, stroke, height_var, width_var) {
        var height = height_var;
        var graphic = this.game.add.graphics(15, 15);
        graphic.beginFill(fill);
        graphic.lineStyle(3, stroke, 1);
        graphic.alpha = 1;
        graphic.drawRoundedRect(0, 0, width_var, height, 6);
        graphic.y = yPos;
        graphic.x = xPos;
        graphic.anchor.setTo(0.5);
        graphic.inputEnabled = true;
        graphic.alpha = 0.25;
        return graphic;
    },

    drawPauseButton: function(yPos, xPos, fill, stroke, height_var) {
        var height = height_var;
        var graphic = this.game.add.graphics(15, 15);
        graphic.beginFill(fill);
        graphic.lineStyle(3, stroke, 1);
        graphic.alpha = 1;
        graphic.drawRoundedRect(0, 0, 40, 40, 6);
        graphic.y = yPos;
        graphic.x = xPos;
        graphic.anchor.setTo(0.5);
        graphic.inputEnabled = true;
        graphic.alpha = 0.25;
        return graphic;
    },

    drawText: function(fill_var, yPos, text_var, font_size) {
        var style = { 
            font: ""+font_size+" kenney_pixelregular", 
            fill: fill_var, 
            boundsAlignH: "center", 
            boundsAlignV: "middle",
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.game.width - 30
        };

        var text = this.game.add.text(
            15, 
            0, 
            text_var, 
            style
        );

        text.setTextBounds(0, 0, this.game.width - 30, this.game.height);

        return text;
    },

    drawYText: function(fill_var, yPos, text_var, font_size) {
        var style = { 
            font: ""+font_size+" kenney_pixelregular", 
            fill: fill_var, 
            boundsAlignH: "center", 
            boundsAlignV: "middle",
            align: "center",
            wordWrap: true,
            wordWrapWidth: this.game.width
        };

        var text = this.game.add.text(
            15, 
            yPos, 
            text_var, 
            style
        );

        text.setTextBounds(0, 0, this.game.width - 30, 0);

        return text;
    },

    drawPauseText: function(fill_var, yPos, text_var, font_size) {
        var style = { 
            font: ""+font_size+" kenney_pixelregular", 
            fill: fill_var, 
            boundsAlignH: "left", 
            boundsAlignV: "middle",
            align: "left",
            wordWrap: true,
            wordWrapWidth: this.game.width
        };

        var text = this.game.add.text(
            this.pause_btn.x + this.pause_btn.width / 2 - 5, 
            yPos, 
            text_var, 
            style
        );

        text.setTextBounds(0, 0, this.game.width, 0);

        return text;
    }
}