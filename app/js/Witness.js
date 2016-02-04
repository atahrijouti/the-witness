var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "config", "boot.state", "Phaser"], function (require, exports, c, boot_state_1) {
    var Witness = (function (_super) {
        __extends(Witness, _super);
        function Witness() {
            _super.call(this, c.Game.width, c.Game.height, Phaser.AUTO, 'canvas', null);
            this.state.add('boot', boot_state_1.Boot, false);
            this.state.start('boot');
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