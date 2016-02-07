define(["require", "exports"], function (require, exports) {
    var Config;
    (function (Config) {
        Config.Puzzle = {
            columns: 10,
            rows: 8,
            margin: 1
        };
        Config.Construction = {
            columns: 5,
            rows: 6
        };
        Config.Game = {
            debug: true,
            squareSide: 40,
            squareColor: "#2378ef",
            debugColor: 'rgba(0,255,0,0.65)',
            get columns() {
                return Config.Construction.columns + Config.Puzzle.margin + Config.Puzzle.columns;
            },
            get rows() {
                return Math.max(Config.Puzzle.rows + 2, Config.Construction.rows);
            },
            get width() {
                return Config.Game.columns * Config.Game.squareSide;
            },
            get height() {
                return Config.Game.rows * Config.Game.squareSide;
            }
        };
    })(Config || (Config = {}));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Config;
});
//# sourceMappingURL=config.js.map