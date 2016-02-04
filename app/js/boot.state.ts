import "Phaser"
import {Preload} from "preload.state";

export class Boot extends Phaser.State{
    create(){
        var game = this.game;

        game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

        game.state.add('preload', Preload);
        game.state.start('preload');
    }
}