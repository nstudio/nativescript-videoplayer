var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var videoCommon = require("./videoplayer-common");
var utils = require("utils/utils");
global.moduleMerge(videoCommon, exports);
function onVideoSourcePropertyChanged(data) {
    var video = data.object;
    if (!video.android) {
        return;
    }
    video._setNativeVideo(data.newValue ? data.newValue.android : null);
}
// register the setNativeValue callback
videoCommon.Video.videoSourceProperty.metadata.onSetNativeValue = onVideoSourcePropertyChanged;
var Video = (function (_super) {
    __extends(Video, _super);
    function Video() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Video.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Video.prototype._createUI = function () {
        var that = new WeakRef(this);
        this._android = new android.widget.VideoView(this._context);
        var _mMediaController = new android.widget.MediaController(this._context);
        this._android.setMediaController(_mMediaController);
        _mMediaController.setAnchorView(this._android);
        if (this.src) {
            if (utils.isFileOrResourcePath(this.src) === true) {
                console.log('src isFileOrResourcePath = TRUE');
                console.log('fileOrResource src: ' + this.src);
                var url = android.net.Uri.parse(this.src);
                this._android.setVideoURI(url);
            }
            else {
                console.log('src isFileOrResourcePath = FALSE');
                // var url: string = android.net.Uri.parse(this.src);
                this._android.setVideoPath(this.src);
            }
        }
        if (this.autoplay === true) {
            this._android.requestFocus();
            this._android.start();
        }
        if (this.finishedCallback) {
            // Create the Complete Listener - this is triggered once a video reaches the end
            this._android.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({
                get owner() {
                    return that.get();
                },
                onCompletion: function (v) {
                    if (this.owner) {
                        this.owner._emit(videoCommon.Video.finishedEvent);
                    }
                }
            }));
        }
    };
    Video.prototype._setNativeVideo = function (nativeVideo) {
        console.log('_setNativeVideo(): ' + nativeVideo);
        this.android.video = nativeVideo;
    };
    Video.prototype.setNativeSource = function (nativePlayerSrc) {
        this.src = nativePlayerSrc;
    };
    return Video;
})(videoCommon.Video);
exports.Video = Video;
