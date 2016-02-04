import "Phaser";
import * as c from "config";

export class Mosaique extends Phaser.Sprite {
    grid: number[][];
    rows: number;
    cols: number;
    X: number; // column
    Y: number; // ROW
    bitMap: Phaser.BitmapData;
    shape:string;
    squarePaint: Phaser.BitmapData;
    active: boolean;
    static types = {
        T : [3,2,[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 1, 1 ] ]],
        Z : [3,2,[ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ]]],
        ZMirrored : [3,2,[[ 1, 0 ], [ 2, 0 ], [ 0, 1 ], [ 1, 1 ]]],
        L : [3,2,[[ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ]]],
        LMirrored : [3,2,[[ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 0, 1 ]]],
        Square : [2,2,[[ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ]]],
        I : [4,1,[[ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ]]]
    };

    constructor(game: Phaser.Game, X, Y, cols, rows, grid:number[][]=[]){
        super(game, X * c.Game.squareSide, Y * c.Game.squareSide);
        this.active = false;
        this.rows = rows;
        this.cols = cols;
        this.grid = grid;
        this.X = X;
        this.Y = Y;
        this.squarePaint = this.game.cache.getBitmapData('squareBitmap');
        let side = c.Game.squareSide;
        this.bitMap = this.game.make.bitmapData(side * this.cols, side * this.rows);
        //this.bitMap.draw(this.squarePaint, 0, 0,cols*side, rows*side);
        //this.bitMap.add(this);
        //this.bitMap.update();
        this.paint();
    }

    paint(){
        let side = c.Game.squareSide;
        this.bitMap.clear();
        if(c.Game.debug){
            let ctx = this.bitMap.ctx;
            ctx.strokeStyle = 'rgba(0,255,0,0.65)';
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0, this.rows * side);
            ctx.lineTo(this.cols * side, this.rows * side);
            ctx.lineTo(this.cols * side, 0);
            ctx.lineTo(0, 0);
            ctx.stroke();
            ctx.closePath();
            this.bitMap.render();
        }
        for(var i = 0; i < this.grid.length; i++){
            let cell = this.grid[i];
            this.bitMap.draw(this.squarePaint, cell[0] * side, cell[1] * side);
        }
        this.bitMap.add(this); // update the mosaique to use the bitmap as its texture
        this.bitMap.update();
    }

    respondToDrag(){
        this.inputEnabled = true;
        this.input.enableDrag();
        this.input.enableSnap(c.Game.squareSide, c.Game.squareSide, false, true);
    }

    toggleTile(x:number, y:number){
        let found = this.grid.filter((cell)=>{
            return cell[0] !== x || cell[1] !== y;
        });
        if(found.length !== this.grid.length){
            this.grid = found;
        }else{
            this.grid.push([x,y]);
        }
        this.paint();
    }
}