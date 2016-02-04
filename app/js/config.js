define(["require", "exports"], function (require, exports) {
    var Puzzle = {
        columns: 10,
        rows: 8,
        margin: 1
    };
    exports.Puzzle = Puzzle;
    var Construction = {
        columns: 5,
        rows: 6
    };
    exports.Construction = Construction;
    var Game = {
        debug: true,
        squareSide: 40,
        get columns() {
            return Construction.columns + Puzzle.margin + Puzzle.columns;
        },
        get rows() {
            return Math.max(Puzzle.rows + 2, Construction.rows);
        },
        get width() {
            return Game.columns * Game.squareSide;
        },
        get height() {
            return Game.rows * Game.squareSide;
        }
    };
    exports.Game = Game;
});
//# sourceMappingURL=config.js.map