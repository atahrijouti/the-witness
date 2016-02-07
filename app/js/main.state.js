var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "mosaique.object", "config", "helpers", "Phaser"], function (require, exports, mosaique_object_1, config_1, helpers_1) {
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
            this.construction = new mosaique_object_1.Mosaique({ game: game, X: 0, Y: 0,
                cols: config_1.default.Construction.columns,
                rows: config_1.default.Construction.rows
            });
            this.add.existing(this.construction);
            this.construction.inputEnabled = true;
            this.construction.events.onInputDown.add(this.handleConstruction, this);
            this.extractShape = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.extractShape.onDown.add(this.handleKeyboard, this);
        };
        MainState.prototype.handleKeyboard = function (key) {
            if (key.keyCode == Phaser.Keyboard.ENTER && this.construction.grid.length) {
                var shapeGrid = helpers_1.Helpers.copyArray(this.construction.grid);
                shapeGrid = helpers_1.Helpers.trimGrid(shapeGrid);
                var _a = helpers_1.Helpers.croppedGridSize(shapeGrid), cols = _a[0], rows = _a[1];
                var X = config_1.default.Construction.columns + config_1.default.Puzzle.margin;
                var color = helpers_1.Helpers.RandomColor();
                var shape = new mosaique_object_1.Mosaique({
                    game: this.game, X: X, Y: 0, cols: cols, rows: rows, grid: shapeGrid, color: color });
                this.add.existing(shape);
                shape.respondToDrag();
                this.construction.empty();
            }
        };
        MainState.prototype.handleConstruction = function (construction, pointer) {
            var squareSide = config_1.default.Game.squareSide;
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