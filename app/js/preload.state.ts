import "Phaser";
import MainState from "main.state";
import {Config as c} from "config";
import {Helpers} from "./helpers";

export class Preload extends Phaser.State {
    preload(){
        Helpers.makeBackgroundSprite(this.game);
        Helpers.makeSquareSprite(this.game); //
    }
    create(){
        var game = this.game;
        game.state.add('main', MainState);
        game.state.start('main');
    }
}
