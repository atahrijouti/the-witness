var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./config"], function (require, exports, config_1) {
    var Mosaique = (function (_super) {
        __extends(Mosaique, _super);
        function Mosaique(shape, row, col, game) {
            _super.call(this, game, col * config_1.Config.Game.SQUARE_SIDE, row * config_1.Config.Game.SQUARE_SIDE);
            this.shape = shape;
            this.grid = [];
            this.fillGrid();
            if (Mosaique.types[shape]) {
                this.rows = this.grid.length;
                this.cols = this.grid[0].length;
                var side = config_1.Config.Game.SQUARE_SIDE;
                this.bitMap = this.game.make.bitmapData(side * this.cols, side * this.rows);
                this.paint();
            }
            else if (shape === 'blob') {
                this.bitMap = this.game.make.bitmapData(config_1.Config.Game.WIDTH, config_1.Config.Game.HEIGHT, 'blobBitmap');
                this.rows = config_1.Config.Game.ROWS;
                this.cols = config_1.Config.Game.COLUMNS;
            }
        }
        Mosaique.prototype.paint = function () {
            if (!Mosaique.types[this.shape]) {
                return;
            }
            var squareBitmap = this.game.cache.getBitmapData('squareBitmap');
            var side = config_1.Config.Game.SQUARE_SIDE;
            for (var i = 0; i < 4; i++) {
                var cell = Mosaique.types[this.shape][2][i];
                this.bitMap.draw(squareBitmap, cell[1] * side, cell[0] * side);
            }
            this.bitMap.add(this);
            this.bitMap.update(0, 0, this.cols * side, this.rows * side);
        };
        Mosaique.prototype.fillGrid = function () {
            var shape = this.shape;
            if (!Mosaique.types[this.shape]) {
                return;
            }
            for (var i = 0; i < Mosaique.types[shape][0]; i++) {
                this.grid.push(new Array(Mosaique.types[shape][1]));
            }
            for (var i = 0; i < 4; i++) {
                var cell = Mosaique.types[shape][2][i];
                this.grid[cell[0]][cell[1]] = 1;
            }
        };
        Mosaique.types = {
            T: [2, 3, [[0, 0], [0, 1], [0, 2], [1, 1]]],
            Z: [2, 3, [[0, 0], [0, 1], [1, 1], [1, 2]]],
            ZMirrored: [2, 3, [[0, 1], [0, 2], [1, 0], [1, 1]]],
            L: [2, 3, [[0, 0], [1, 0], [1, 1], [1, 2]]],
            LMirrored: [2, 3, [[0, 0], [0, 1], [0, 2], [1, 0]]],
            Square: [2, 2, [[0, 0], [0, 1], [1, 0], [1, 1]]],
            I: [1, 4, [[0, 0], [0, 1], [0, 2], [0, 3]]]
        };
        return Mosaique;
    })(Phaser.Sprite);
    exports.Mosaique = Mosaique;
});
//# sourceMappingURL=mosaique.object.js.map