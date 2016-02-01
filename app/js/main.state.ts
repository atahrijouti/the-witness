import {Mosaique} from "./mosaique.object";
import {Config as c} from "./config";

class MainState extends Phaser.State {
    grid: Mosaique;
    backgroundBitmap:Phaser.BitmapData;
    squareBitmap:Phaser.BitmapData;
    backgroundSprite:Phaser.TileSprite;
    preload(){
        this.backgroundBitmap =this.makeBackgroundSprite();
        this.squareBitmap = this.makeSquareSprite();
    }
    create() {
        let game = this.game;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.backgroundSprite = game.add.tileSprite(0,0,game.width,game.height,this.backgroundBitmap);


        let Z = new Mosaique('Z',1,1, game);
        Z.anchor.set(1/3,1/2);
        Z.position.x += Z.width/3;
        Z.position.y += Z.height/2;
        var T = new Mosaique('T',0,1,game);
        var ZMirrored = new Mosaique('ZMirrored',1,0,game);
        var L = new Mosaique('L',1,3,game);
        var LMirrored = new Mosaique('LMirrored',0,3,game);
        var Square = new Mosaique('Square',7,0,game);
        var I = new Mosaique('I',2,3,game);

        //Z.generateTexture();
        game.add.existing(Z);

    }


    makeBackgroundSprite(): Phaser.BitmapData{
        var game = this.game;
        var bmd = game.make.bitmapData(c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE,'backgroundBitmap',true);
        var ctx = bmd.ctx;
        ctx.strokeStyle = '#444466';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,c.Game.SQUARE_SIDE);
        ctx.moveTo(0,c.Game.SQUARE_SIDE);
        ctx.lineTo(c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE);
        ctx.stroke();
        ctx.closePath();
        bmd.render();
        bmd.update(0,0,c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE);
        return bmd;
    }
    makeSquareSprite(): Phaser.BitmapData{
        var game = this.game;
        var bmd = game.make.bitmapData(c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE,'squareBitmap',true);
        var ctx = bmd.ctx;
        ctx.fillStyle = '#2378ef';
        ctx.fillRect(0,0,c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE);
        ctx.strokeStyle = '#1060D1';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(c.Game.SQUARE_SIDE,0);
        ctx.lineTo(c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE);
        ctx.moveTo(0,c.Game.SQUARE_SIDE);
        ctx.lineTo(c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE);
        ctx.stroke();
        ctx.closePath();
        bmd.render();
        bmd.update(0,0,c.Game.SQUARE_SIDE,c.Game.SQUARE_SIDE);
        return bmd;
    }
}

export default MainState;