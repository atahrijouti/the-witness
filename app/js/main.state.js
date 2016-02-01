var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./mosaique.object", "./config"], function (require, exports, mosaique_object_1, config_1) {
    var MainState = (function (_super) {
        __extends(MainState, _super);
        function MainState() {
            _super.apply(this, arguments);
        }
        MainState.prototype.preload = function () {
            this.backgroundBitmap = this.makeBackgroundSprite();
            this.squareBitmap = this.makeSquareSprite();
        };
        MainState.prototype.create = function () {
            var game = this.game;
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            this.backgroundSprite = game.add.tileSprite(0, 0, game.width, game.height, this.backgroundBitmap);
            var Z = new mosaique_object_1.Mosaique('Z', 1, 1, game);
            Z.anchor.set(1 / 3, 1 / 2);
            Z.position.x += Z.width / 3;
            Z.position.y += Z.height / 2;
            var T = new mosaique_object_1.Mosaique('T', 0, 1, game);
            var ZMirrored = new mosaique_object_1.Mosaique('ZMirrored', 1, 0, game);
            var L = new mosaique_object_1.Mosaique('L', 1, 3, game);
            var LMirrored = new mosaique_object_1.Mosaique('LMirrored', 0, 3, game);
            var Square = new mosaique_object_1.Mosaique('Square', 7, 0, game);
            var I = new mosaique_object_1.Mosaique('I', 2, 3, game);
            //Z.generateTexture();
            game.add.existing(Z);
        };
        MainState.prototype.makeBackgroundSprite = function () {
            var game = this.game;
            var bmd = game.make.bitmapData(config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE, 'backgroundBitmap', true);
            var ctx = bmd.ctx;
            ctx.strokeStyle = '#444466';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, config_1.Config.Game.SQUARE_SIDE);
            ctx.moveTo(0, config_1.Config.Game.SQUARE_SIDE);
            ctx.lineTo(config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE);
            ctx.stroke();
            ctx.closePath();
            bmd.render();
            bmd.update(0, 0, config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE);
            return bmd;
        };
        MainState.prototype.makeSquareSprite = function () {
            var game = this.game;
            var bmd = game.make.bitmapData(config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE, 'squareBitmap', true);
            var ctx = bmd.ctx;
            ctx.fillStyle = '#2378ef';
            ctx.fillRect(0, 0, config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE);
            ctx.strokeStyle = '#1060D1';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(config_1.Config.Game.SQUARE_SIDE, 0);
            ctx.lineTo(config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE);
            ctx.moveTo(0, config_1.Config.Game.SQUARE_SIDE);
            ctx.lineTo(config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE);
            ctx.stroke();
            ctx.closePath();
            bmd.render();
            bmd.update(0, 0, config_1.Config.Game.SQUARE_SIDE, config_1.Config.Game.SQUARE_SIDE);
            return bmd;
        };
        return MainState;
    })(Phaser.State);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MainState;
});
//# sourceMappingURL=main.state.js.map