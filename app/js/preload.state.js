var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "main.state", "./helpers", "Phaser"], function (require, exports, main_state_1, helpers_1) {
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            _super.apply(this, arguments);
        }
        Preload.prototype.preload = function () {
            helpers_1.Helpers.makeBackgroundSprite(this.game);
            helpers_1.Helpers.makeSquareSprite(this.game); //
        };
        Preload.prototype.create = function () {
            var game = this.game;
            game.state.add('main', main_state_1.default);
            game.state.start('main');
        };
        return Preload;
    })(Phaser.State);
    exports.Preload = Preload;
});
//# sourceMappingURL=preload.state.js.map