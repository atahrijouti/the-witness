import "Phaser";
import {Mosaique} from "mosaique.object";
import c from "config";
import {Helpers} from "helpers";

export class MainState extends Phaser.State {
    backgroundBitmap:Phaser.BitmapData;
    squareBitmap:Phaser.BitmapData;
    backgroundSprite:Phaser.TileSprite;
    construction:Mosaique;
    extractShape: Phaser.Key;
    shapes: Mosaique[];
    preload(){
        this.backgroundBitmap = this.game.cache.getBitmapData('backgroundBitmap');
        this.squareBitmap = this.game.cache.getBitmapData('squareBitmap');
    }
    create() {
        let game = this.game;
        this.backgroundSprite = game.add.tileSprite(0,0,game.width,game.height,this.backgroundBitmap);
        this.construction = new Mosaique({ game, X: 0, Y: 0,
            cols:c.Construction.columns,
            rows:c.Construction.rows
        });
        this.add.existing(this.construction);
        this.construction.inputEnabled = true;
        this.construction.events.onInputDown.add(this.handleConstruction, this);

        this.extractShape = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.extractShape.onDown.add(this.handleKeyboard, this);
    }
    handleKeyboard(key: Phaser.Key){
        if(key.keyCode == Phaser.Keyboard.ENTER && this.construction.grid.length){
            let shapeGrid = Helpers.copyArray(this.construction.grid);
            shapeGrid = Helpers.trimGrid(shapeGrid);
            let [cols, rows] = Helpers.croppedGridSize(shapeGrid);
            let X = c.Construction.columns + c.Puzzle.margin;
            let color = Helpers.RandomColor();
            let shape = new Mosaique({
                game:this.game, X, Y:0, cols, rows, grid:shapeGrid, color });
            this.add.existing(shape);
            shape.respondToDrag();
            this.construction.empty();
        }
    }
    handleConstruction(construction, pointer){
        let squareSide = c.Game.squareSide;
        if(pointer.isDown){
            let x = pointer.x - construction.position.x;
            let y = pointer.y - construction.position.y;
            let column = Phaser.Math.snapToFloor(x,squareSide) / squareSide;
            let row = Phaser.Math.snapToFloor(y,squareSide) / squareSide;
            construction.toggleTile(column, row);
        }
    }

}

export default MainState;