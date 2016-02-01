import {Config as c} from "./config";

export class Mosaique extends Phaser.Sprite {
    grid: number[][];
    rows: number;
    cols: number;
    bitMap: Phaser.BitmapData;

    static types = {
        T : [2,3,[ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 1 ] ]],
        Z : [2,3,[ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ]]],
        ZMirrored : [2,3,[[ 0, 1 ], [ 0, 2 ], [ 1, 0 ], [ 1, 1 ]]],
        L : [2,3,[[ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ]]],
        LMirrored : [2,3,[[ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 0 ]]],
        Square : [2,2,[[ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ]]],
        I : [1,4,[[ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ]]]
    };
    shape:string;

    constructor(shape:string, row: number, col: number,game:Phaser.Game){
        super(game,col*c.Game.SQUARE_SIDE,row*c.Game.SQUARE_SIDE);
        this.shape = shape;
        this.grid = [];
        this.fillGrid();
        if(Mosaique.types[shape]){
            this.rows = this.grid.length;
            this.cols = this.grid[0].length;
            var side = c.Game.SQUARE_SIDE;
            this.bitMap = this.game.make.bitmapData(side*this.cols,side*this.rows);
            this.paint();
        }else if(shape === 'blob'){
            this.bitMap = this.game.make.bitmapData(c.Game.WIDTH,c.Game.HEIGHT,'blobBitmap');
            this.rows = c.Game.ROWS;
            this.cols = c.Game.COLUMNS;
        }
    }
    paint(){
        if(!Mosaique.types[this.shape]){
            return;
        }
        var squareBitmap = this.game.cache.getBitmapData('squareBitmap');

        var side = c.Game.SQUARE_SIDE;
        for(var i=0; i<4; i++){
            var cell = Mosaique.types[this.shape][2][i];
            this.bitMap.draw(squareBitmap,cell[1]*side,cell[0]*side);

        }
        this.bitMap.add(this);
        this.bitMap.update(0,0,this.cols*side,this.rows*side);
    }
    fillGrid(){
        var shape = this.shape;
        if(!Mosaique.types[this.shape]){
            return;
        }
        for(var i =0; i<Mosaique.types[shape][0];i++){
            this.grid.push(new Array(Mosaique.types[shape][1]));
        }
        for(var i=0; i<4; i++){
            var cell = Mosaique.types[shape][2][i];
            this.grid[cell[0]][cell[1]] = 1;
        }
    }
}