var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "preload.state", "Phaser"], function (require, exports, preload_state_1) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.create = function () {
            var game = this.game;
            game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            game.state.add('preload', preload_state_1.Preload);
            game.state.start('preload');
        };
        return Boot;
    })(Phaser.State);
    exports.Boot = Boot;
});
//# sourceMappingURL=boot.state.js.map