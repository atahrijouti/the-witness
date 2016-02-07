import "Phaser";
import {MainState} from "main.state";
import c from "config";
import {Boot} from "boot.state";

export class Witness extends Phaser.Game{
    constructor(){
        super(c.Game.width,c.Game.height,Phaser.AUTO, 'canvas', null);
        this.state.add('boot', Boot,false);
        this.state.start('boot');
    }
}

let witness = new Witness();


window['witness'] = witness;
export default witness;