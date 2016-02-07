import "Phaser";
import c from "config";
import {Helpers} from "./helpers";

export class Mosaique extends Phaser.Sprite {
    grid: number[][];
    rows: number;
    cols: number;
    X: number; // column
    Y: number; // ROW
    bitMap: Phaser.BitmapData;
    //shape:string;
    squarePaint: Phaser.BitmapData;
    active: boolean;
    color: string;
    border: string;
    static types = {
        T : [3,2,[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 1, 1 ] ]],
        Z : [3,2,[ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 2, 1 ]]],
        ZMirrored : [3,2,[[ 1, 0 ], [ 2, 0 ], [ 0, 1 ], [ 1, 1 ]]],
        L : [3,2,[[ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ]]],
        LMirrored : [3,2,[[ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 0, 1 ]]],
        Square : [2,2,[[ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ]]],
        I : [4,1,[[ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ]]]
    };

    constructor({
        game, X, Y, cols, rows, grid=[], color = '', border = ''}){
        super(game, X * c.Game.squareSide, Y * c.Game.squareSide);
        this.active = false;
        this.rows = rows;
        this.cols = cols;
        this.grid = grid;
        this.X = X;
        this.Y = Y;
        this.color = color;
        this.border = border;

        let side = c.Game.squareSide;
        if(color === ''){
            this.squarePaint = this.game.cache.getBitmapData('squareBitmap');
        }else{
            this.squarePaint = Helpers.makeSquareBitmap({
                game: this.game,
                color
            });
        }
        this.bitMap = this.game.make.bitmapData(side * this.cols, side * this.rows);
        this.paint();
    }

    paint(){
        let side = c.Game.squareSide;
        this.bitMap.clear();
        if(c.Game.debug || this.border !== ''){
            let borderColor = (c.Game.debug ? c.Game.debugColor : this.border);
            Helpers.drawContour({
                ctx: this.bitMap.ctx,
                width: this.cols * side,
                height: this.rows * side,
                color: borderColor
            });
            this.bitMap.render();
        }
        for(var i = 0; i < this.grid.length; i++){
            let cell = this.grid[i];
            this.bitMap.draw(this.squarePaint, cell[0] * side, cell[1] * side);
        }
        this.bitMap.add(this); // update the mosaique to use the bitmap as its texture
        this.bitMap.update();
    }

    empty(){
        this.grid = [];
        this.paint();
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