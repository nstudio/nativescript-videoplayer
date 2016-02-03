var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./videoplayer-common");
global.moduleMerge(common, exports);
function onVideoSourcePropertyChanged(data) {
    var video = data.object;
    video._setNativeVideo(data.newValue ? data.newValue.ios : null);
}
// register the setNativeValue callback
common.Video.videoSourceProperty.metadata.onSetNativeValue = onVideoSourcePropertyChanged;
var Video = (function (_super) {
    __extends(Video, _super);
    function Video(options) {
        _super.call(this, options);
        this._playerController = new AVPlayerViewController();
        this._player = new AVPlayer();
        this._playerController.player = this._player;
        this._ios = this._playerController.view;
        //var videoUrlStr = "https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
        //this.src = videoUrlStr;
        //let url: string = NSURL.URLWithString(this.src);
        //this._ios = new AVPlayer(url);
        //this._ios.play();
        //this._playerController.player = this._ios;
    }
    Video.prototype._setNativeVideo = function (nativeVideo) {
        this.ios.video = nativeVideo;
        //this._src = nativeVideo;
        //let url: string = NSURL.URLWithString(this._src);
        this._player = new AVPlayer(nativeVideo);
        this._playerController.player = this._player;
        this._player.play();
        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }
    };
    Video.prototype._setNativePlayerSource = function (nativePlayerSrc) {
        //this.ios = nativePlayer;
        this._src = nativePlayerSrc;
        var url = NSURL.URLWithString(this._src);
        this._player = new AVPlayer(url);
        this._playerController.player = this._player;
        this._player.play();
        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }
    };
    Object.defineProperty(Video.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return Video;
})(common.Video);
exports.Video = Video;
