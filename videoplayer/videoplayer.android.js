var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./videoplayer-common");
global.moduleMerge(common, exports);
var VideoPlayer = (function (_super) {
    __extends(VideoPlayer, _super);
    function VideoPlayer() {
        _super.call(this);
    }
    Object.defineProperty(VideoPlayer.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    VideoPlayer.prototype._createUI = function () {
        //var that = new WeakRef(this);
        this._android = new android.widget.VideoView(this._context);
        console.log('this._android: ' + this._android);
        var mMediaController = new android.widget.MediaController(this._context);
        this._android.setMediaController(mMediaController);
        if (this.video)
            var url = android.net.Uri.parse(this.video);
        this._android.setVideoURI(url);
        //this._android.setOnClickListener(new android.view.View.OnClickListener(
        //    <utils.Owned & android.view.View.IOnClickListener>{
        //        get owner() {
        //            return that.get();
        //        },
        //        onClick: function (v) {
        //            if (this.owner) {
        //                this.owner._emit(common.Button.tapEvent);
        //            }
        //        }
        //    }));
    };
    return VideoPlayer;
})(common.VideoPlayer);
exports.VideoPlayer = VideoPlayer;
