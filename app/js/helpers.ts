import "Phaser";
import * as c from "config";
import {Tinycolor} from "vendor/tinycolor";
import canUseNewCanvasBlendModes = PIXI.canUseNewCanvasBlendModes;


export class Helpers {
    static makeBackgroundSprite(game: Phaser.Game){
        let squareSide = c.Game.squareSide;
        let bmd = game.make.bitmapData(squareSide,squareSide,'backgroundBitmap',true);
        let ctx = bmd.ctx;
        ctx.strokeStyle = '#444466';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,squareSide);
        ctx.moveTo(0,squareSide);
        ctx.lineTo(squareSide,squareSide);
        ctx.stroke();
        ctx.closePath();
        bmd.render();
        bmd.update(0,0,squareSide,squareSide);
    }
    static makeSquareSprite(game: Phaser.Game, color = "#2378ef" ){
        let squareSide = c.Game.squareSide;
        let darkerColor = new Tinycolor(color).darken().toString();
        let bmd = game.make.bitmapData(squareSide,squareSide,'squareBitmap',true);
        let ctx = bmd.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(0,0,squareSide,squareSide);


        ctx.strokeStyle = darkerColor;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(squareSide,0);
        ctx.lineTo(squareSide,squareSide);
        ctx.moveTo(0,squareSide);
        ctx.lineTo(squareSide,squareSide);
        ctx.stroke();
        ctx.closePath();
        bmd.render();
        bmd.update(0,0,squareSide,squareSide);
        return bmd;
    }
    static RandomColor(){
        var colors = [
            "#4d90fe", "#CC8081", "#888888", "#0971B2", "#9937B2",
            "#FFFEBA", "#FFFC19", "#00CCFF", "#24459A", "#faa614",
            "#24459A", "#e81123", "#52b043", "#24459A", "#ea3e24",
            "#00188f", "#ba141a", "#e51400", "#68217a", "#c1d304" ];
        return colors[(Math.random()*colors.length) | 0];
    }
    static trimGrid(grid:number[][]):number[][]{
        let infX = Math.min.apply(null, grid.map((cell:number[])=>{return cell[0];}));
        let infY = Math.min.apply(null, grid.map((cell:number[])=>{return cell[1];}));

        for(let i=0; i < grid.length; i++){
            grid[i][0] -= infX;
            grid[i][1] -= infY;
        }

        return grid;
    }
    static croppedGridSize(grid:number[][]):number[]{
        let supX = Math.max.apply(null, grid.map((cell:number[])=>{return cell[0];}));
        let supY = Math.max.apply(null, grid.map((cell:number[])=>{return cell[1];}));
        return [supX + 1, supY + 1];
    }
    static copyArray(currentArray:number[][]):number[][]{
        let newArray = [];

        for (var i = 0; i < currentArray.length; i++){
            newArray[i] = currentArray[i].slice();
        }

        return newArray;
    }
}
