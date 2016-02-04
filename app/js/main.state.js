var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "mosaique.object", "config", "./helpers", "Phaser"], function (require, exports, mosaique_object_1, c, helpers_1) {
    var MainState = (function (_super) {
        __extends(MainState, _super);
        function MainState() {
            _super.apply(this, arguments);
        }
        MainState.prototype.preload = function () {
            this.backgroundBitmap = this.game.cache.getBitmapData('backgroundBitmap');
            this.squareBitmap = this.game.cache.getBitmapData('squareBitmap');
        };
        MainState.prototype.create = function () {
            var game = this.game;
            this.backgroundSprite = game.add.tileSprite(0, 0, game.width, game.height, this.backgroundBitmap);
            var cWidth = c.Construction.columns;
            var cHeight = c.Construction.rows;
            this.construction = new mosaique_object_1.Mosaique(game, 0, 0, cWidth, cHeight);
            this.add.existing(this.construction);
            this.construction.inputEnabled = true;
            this.construction.events.onInputDown.add(this.handleConstruction, this);
            this.extractShape = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.extractShape.onDown.add(this.handleKeyboard, this);
        };
        MainState.prototype.handleKeyboard = function (key) {
            if (key.keyCode == Phaser.Keyboard.ENTER) {
                var shapeGrid = helpers_1.Helpers.copyArray(this.construction.grid);
                shapeGrid = helpers_1.Helpers.trimGrid(shapeGrid);
                var _a = helpers_1.Helpers.croppedGridSize(shapeGrid), cols = _a[0], rows = _a[1];
                var X = c.Construction.columns + c.Puzzle.margin;
                var shape = new mosaique_object_1.Mosaique(this.game, X, 0, cols, rows, shapeGrid);
                this.add.existing(shape);
                shape.respondToDrag();
            }
        };
        MainState.prototype.handleConstruction = function (construction, pointer) {
            var squareSide = c.Game.squareSide;
            if (pointer.isDown) {
                var x = pointer.x - construction.position.x;
                var y = pointer.y - construction.position.y;
                var column = Phaser.Math.snapToFloor(x, squareSide) / squareSide;
                var row = Phaser.Math.snapToFloor(y, squareSide) / squareSide;
                construction.toggleTile(column, row);
            }
        };
        return MainState;
    })(Phaser.State);
    exports.MainState = MainState;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MainState;
});
//# sourceMappingURL=main.state.js.map