define(["require", "exports", "config", "vendor/tinycolor", "Phaser"], function (require, exports, config_1, tinycolor_1) {
    var Helpers = (function () {
        function Helpers() {
        }
        Helpers.drawContour = function (_a) {
            var ctx = _a.ctx, width = _a.width, height = _a.height, color = _a.color;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, height);
            ctx.lineTo(width, height);
            ctx.lineTo(width, 0);
            ctx.lineTo(0, 0);
            ctx.stroke();
            ctx.closePath();
        };
        Helpers.makeBackgroundSprite = function (game) {
            var squareSide = config_1.default.Game.squareSide;
            var bmd = game.make.bitmapData(squareSide, squareSide, 'backgroundBitmap', true);
            var ctx = bmd.ctx;
            ctx.strokeStyle = '#444466';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, squareSide);
            ctx.moveTo(0, squareSide);
            ctx.lineTo(squareSide, squareSide);
            ctx.stroke();
            ctx.closePath();
            bmd.render();
            bmd.update(0, 0, squareSide, squareSide);
            return bmd;
        };
        Helpers.makeSquareBitmap = function (_a) {
            var game = _a.game, _b = _a.color, color = _b === void 0 ? config_1.default.Game.squareColor : _b, _c = _a.name, name = _c === void 0 ? '' : _c, _d = _a.cache, cache = _d === void 0 ? false : _d;
            var squareSide = config_1.default.Game.squareSide;
            var darkerColor = new tinycolor_1.Tinycolor(color).darken().toString('hex');
            var bmd;
            bmd = game.make.bitmapData(squareSide, squareSide, name, cache);
            var ctx = bmd.ctx;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, squareSide, squareSide);
            ctx.strokeStyle = darkerColor;
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(squareSide, 0);
            ctx.lineTo(squareSide, squareSide);
            ctx.moveTo(0, squareSide);
            ctx.lineTo(squareSide, squareSide);
            ctx.stroke();
            ctx.closePath();
            bmd.render();
            bmd.update(0, 0, squareSide, squareSide);
            return bmd;
        };
        Helpers.RandomColor = function () {
            var colors = [
                "#4d90fe", "#CC8081", "#888888", "#0971B2", "#9937B2",
                "#FFFEBA", "#FFFC19", "#00CCFF", "#24459A", "#faa614",
                "#24459A", "#e81123", "#52b043", "#24459A", "#ea3e24",
                "#00188f", "#ba141a", "#e51400", "#68217a", "#c1d304"];
            return colors[(Math.random() * colors.length) | 0];
        };
        Helpers.trimGrid = function (grid) {
            var infX = Math.min.apply(null, grid.map(function (cell) { return cell[0]; }));
            var infY = Math.min.apply(null, grid.map(function (cell) { return cell[1]; }));
            for (var i = 0; i < grid.length; i++) {
                grid[i][0] -= infX;
                grid[i][1] -= infY;
            }
            return grid;
        };
        Helpers.croppedGridSize = function (grid) {
            var supX = Math.max.apply(null, grid.map(function (cell) { return cell[0]; }));
            var supY = Math.max.apply(null, grid.map(function (cell) { return cell[1]; }));
            return [supX + 1, supY + 1];
        };
        Helpers.copyArray = function (currentArray) {
            var newArray = [];
            for (var i = 0; i < currentArray.length; i++) {
                newArray[i] = currentArray[i].slice();
            }
            return newArray;
        };
        return Helpers;
    })();
    exports.Helpers = Helpers;
});
//# sourceMappingURL=helpers.js.map