var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "config", "./helpers", "Phaser"], function (require, exports, config_1, helpers_1) {
    var Mosaique = (function (_super) {
        __extends(Mosaique, _super);
        function Mosaique(_a) {
            var game = _a.game, X = _a.X, Y = _a.Y, cols = _a.cols, rows = _a.rows, _b = _a.grid, grid = _b === void 0 ? [] : _b, _c = _a.color, color = _c === void 0 ? '' : _c, _d = _a.border, border = _d === void 0 ? '' : _d;
            _super.call(this, game, X * config_1.default.Game.squareSide, Y * config_1.default.Game.squareSide);
            this.active = false;
            this.rows = rows;
            this.cols = cols;
            this.grid = grid;
            this.X = X;
            this.Y = Y;
            this.color = color;
            this.border = border;
            var side = config_1.default.Game.squareSide;
            if (color === '') {
                this.squarePaint = this.game.cache.getBitmapData('squareBitmap');
            }
            else {
                this.squarePaint = helpers_1.Helpers.makeSquareBitmap({
                    game: this.game,
                    color: color
                });
            }
            this.bitMap = this.game.make.bitmapData(side * this.cols, side * this.rows);
            this.paint();
        }
        Mosaique.prototype.paint = function () {
            var side = config_1.default.Game.squareSide;
            this.bitMap.clear();
            if (config_1.default.Game.debug || this.border !== '') {
                var borderColor = (config_1.default.Game.debug ? config_1.default.Game.debugColor : this.border);
                helpers_1.Helpers.drawContour({
                    ctx: this.bitMap.ctx,
                    width: this.cols * side,
                    height: this.rows * side,
                    color: borderColor
                });
                this.bitMap.render();
            }
            for (var i = 0; i < this.grid.length; i++) {
                var cell = this.grid[i];
                this.bitMap.draw(this.squarePaint, cell[0] * side, cell[1] * side);
            }
            this.bitMap.add(this); // update the mosaique to use the bitmap as its texture
            this.bitMap.update();
        };
        Mosaique.prototype.empty = function () {
            this.grid = [];
            this.paint();
        };
        Mosaique.prototype.respondToDrag = function () {
            this.inputEnabled = true;
            this.input.enableDrag();
            this.input.enableSnap(config_1.default.Game.squareSide, config_1.default.Game.squareSide, false, true);
        };
        Mosaique.prototype.toggleTile = function (x, y) {
            var found = this.grid.filter(function (cell) {
                return cell[0] !== x || cell[1] !== y;
            });
            if (found.length !== this.grid.length) {
                this.grid = found;
            }
            else {
                this.grid.push([x, y]);
            }
            this.paint();
        };
        Mosaique.types = {
            T: [3, 2, [[0, 0], [1, 0], [2, 0], [1, 1]]],
            Z: [3, 2, [[0, 0], [1, 0], [1, 1], [2, 1]]],
            ZMirrored: [3, 2, [[1, 0], [2, 0], [0, 1], [1, 1]]],
            L: [3, 2, [[0, 0], [0, 1], [1, 1], [2, 1]]],
            LMirrored: [3, 2, [[0, 0], [1, 0], [2, 0], [0, 1]]],
            Square: [2, 2, [[0, 0], [1, 0], [0, 1], [1, 1]]],
            I: [4, 1, [[0, 0], [1, 0], [2, 0], [3, 0]]]
        };
        return Mosaique;
    })(Phaser.Sprite);
    exports.Mosaique = Mosaique;
});
//# sourceMappingURL=mosaique.object.js.map