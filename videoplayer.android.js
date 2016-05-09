"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var videoCommon = require("./videoplayer-common");
var fs = require("file-system");
global.moduleMerge(videoCommon, exports);
function onVideoSourcePropertyChanged(data) {
    var video = data.object;
    if (!video.android) {
        return;
    }
    video._setNativeVideo(data.newValue ? data.newValue.android : null);
}
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
        this._android.setZOrderOnTop(true);
        if (this.src) {
            var isUrl = false;
            if (this.src.indexOf("://") !== -1) {
                if (this.src.indexOf('res://') === -1) {
                    isUrl = true;
                }
            }
            if (!isUrl) {
                var currentPath = fs.knownFolders.currentApp().path;
                if (this.src[1] === '/' && (this.src[0] === '.' || this.src[0] === '~')) {
                    this.src = this.src.substr(2);
                }
                if (this.src[0] !== '/') {
                    this.src = currentPath + '/' + this.src;
                }
                this._android.setVideoURI(android.net.Uri.parse(this.src));
            }
            else {
                this._android.setVideoPath(this.src);
            }
        }
        if (this.autoplay === true) {
            this._android.requestFocus();
            this._android.start();
        }
        if (this.finishedCallback) {
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
        this.android.video = nativeVideo;
    };
    Video.prototype.setNativeSource = function (nativePlayerSrc) {
        this.src = nativePlayerSrc;
    };
    return Video;
}(videoCommon.Video));
exports.Video = Video;
//# sourceMappingURL=videoplayer.android.js.map