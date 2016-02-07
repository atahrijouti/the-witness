import "Phaser";
import MainState from "main.state";
import {Helpers} from "helpers";

export class Preload extends Phaser.State {
    preload(){
        Helpers.makeBackgroundSprite(this.game);
        Helpers.makeSquareBitmap({
           game: this.game,
            name: "squareBitmap",
            cache: true
        });
    }
    create(){
        var game = this.game;
        game.state.add('main', MainState);
        game.state.start('main');
    }
}
