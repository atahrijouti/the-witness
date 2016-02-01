import 'node_modules/phaser/build/phaser.min.js'
import {Mosaique} from "./mosaique.object";
import MainState from "./main.state";
import {Config as c} from "./config";

export class Witness extends Phaser.Game{
    constructor(){
        super(c.Game.WIDTH,c.Game.HEIGHT,Phaser.AUTO, 'canvas', null);
        this.state.add('main', MainState,false);
        this.state.start('main');
    }
}

let witness = new Witness();


window['witness'] = witness;
export default witness;