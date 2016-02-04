import "Phaser";
import {Mosaique} from "mosaique.object";
import * as c from "config";
import {Helpers} from "./helpers";

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

        let cWidth = c.Construction.columns;
        let cHeight = c.Construction.rows;

        this.construction = new Mosaique(game, 0, 0, cWidth, cHeight);
        this.add.existing(this.construction);
        this.construction.inputEnabled = true;
        this.construction.events.onInputDown.add(this.handleConstruction, this);

        this.extractShape = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.extractShape.onDown.add(this.handleKeyboard, this);
    }

    handleKeyboard(key: Phaser.Key){
        if(key.keyCode == Phaser.Keyboard.ENTER){
            let shapeGrid = Helpers.copyArray(this.construction.grid);
            shapeGrid = Helpers.trimGrid(shapeGrid);
            let [cols, rows] = Helpers.croppedGridSize(shapeGrid);
            let X = c.Construction.columns + c.Puzzle.margin;
            let shape = new Mosaique(this.game, X, 0, cols, rows, shapeGrid);
            this.add.existing(shape);
            shape.respondToDrag();
        }
    }

    handleConstruction(construction, pointer){
        let squareSide = c.Game.squareSide;
        if(pointer.isDown){
            let x = pointer.x - construction.position.x;
            let y = pointer.y - construction.position.y;
            let column = Phaser.Math.snapToFloor(x,squareSide) / squareSide;
            let row = Phaser.Math.snapToFloor(y,squareSide) / squareSide;
            construction.toggleTile(column,row);
        }
    }

}

export default MainState;