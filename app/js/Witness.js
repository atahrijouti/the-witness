var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./main.state", "./config", 'node_modules/phaser/build/phaser.min.js'], function (require, exports, main_state_1, config_1) {
    var Witness = (function (_super) {
        __extends(Witness, _super);
        function Witness() {
            _super.call(this, config_1.Config.Game.WIDTH, config_1.Config.Game.HEIGHT, Phaser.AUTO, 'canvas', null);
            this.state.add('main', main_state_1.default, false);
            this.state.start('main');
        }
        return Witness;
    })(Phaser.Game);
    exports.Witness = Witness;
    var witness = new Witness();
    window['witness'] = witness;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = witness;
});
//# sourceMappingURL=witness.js.map