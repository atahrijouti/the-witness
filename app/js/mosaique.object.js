var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "config", "Phaser"], function (require, exports, c) {
    var Mosaique = (function (_super) {
        __extends(Mosaique, _super);
        function Mosaique(game, X, Y, cols, rows, grid) {
            if (grid === void 0) { grid = []; }
            _super.call(this, game, X * c.Game.squareSide, Y * c.Game.squareSide);
            this.active = false;
            this.rows = rows;
            this.cols = cols;
            this.grid = grid;
            this.X = X;
            this.Y = Y;
            this.squarePaint = this.game.cache.getBitmapData('squareBitmap');
            var side = c.Game.squareSide;
            this.bitMap = this.game.make.bitmapData(side * this.cols, side * this.rows);
            //this.bitMap.draw(this.squarePaint, 0, 0,cols*side, rows*side);
            //this.bitMap.add(this);
            //this.bitMap.update();
            this.paint();
        }
        Mosaique.prototype.paint = function () {
            var side = c.Game.squareSide;
            this.bitMap.clear();
            if (c.Game.debug) {
                var ctx = this.bitMap.ctx;
                ctx.strokeStyle = 'rgba(0,255,0,0.65)';
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, this.rows * side);
                ctx.lineTo(this.cols * side, this.rows * side);
                ctx.lineTo(this.cols * side, 0);
                ctx.lineTo(0, 0);
                ctx.stroke();
                ctx.closePath();
                this.bitMap.render();
            }
            for (var i = 0; i < this.grid.length; i++) {
                var cell = this.grid[i];
                this.bitMap.draw(this.squarePaint, cell[0] * side, cell[1] * side);
            }
            this.bitMap.add(this); // update the mosaique to use the bitmap as its texture
            this.bitMap.update();
        };
        Mosaique.prototype.respondToDrag = function () {
            this.inputEnabled = true;
            this.input.enableDrag();
            this.input.enableSnap(c.Game.squareSide, c.Game.squareSide, false, true);
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