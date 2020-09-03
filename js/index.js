(function() {
    var game = new Phaser.Game(400, 600, Phaser.AUTO, "");
    game.state.add("preload", preload);
    game.state.add("title_screen", title_screen);
    game.state.add("how_to_play", how_to_play);
    game.state.add("settings", settings);
    game.state.add("credits", credits);
    game.state.add("level_1", level_1);
    game.state.add("game_over", game_over);
    game.state.start("preload");
})();