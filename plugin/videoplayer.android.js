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
// register the setNativeValue callback
videoCommon.Video.videoSourceProperty.metadata.onSetNativeValue = onVideoSourcePropertyChanged;
var MediaPlayerEventListener = (function (_super) {
    __extends(MediaPlayerEventListener, _super);
    function MediaPlayerEventListener(owner) {
        _super.call(this);
        this._owner = owner;
        return global.__native(this);
    }
    MediaPlayerEventListener.prototype.onEvent = function (event) {
        var args = {
            object: this,
            eventName: "",
            value: 1
        };
        switch (event.type) {
            case org.videolan.libvlc.MediaPlayer.Event.Opening:
                args.eventName = videoCommon.Video.openingEvent;
                break;
            case org.videolan.libvlc.MediaPlayer.Event.Playing:
                args.eventName = videoCommon.Video.playingEvent;
                break;
            case org.videolan.libvlc.MediaPlayer.Event.TimeChanged:
                args.eventName = videoCommon.Video.timeChangedEvent;
                args.value = event.getTimeChanged();
                break;
            // case org.videolan.libvlc.MediaPlayer.Event.PositionChanged:
            //     console.log("PositionChanged " + event.getPositionChanged());
            //     break;                                
            case org.videolan.libvlc.MediaPlayer.Event.EncounteredError:
                args.eventName = videoCommon.Video.errorEvent;
                break;
            case org.videolan.libvlc.MediaPlayer.Event.EndReached:
                args.eventName = videoCommon.Video.finishedEvent;
                break;
            default:
                //console.log(event.type);    
                return; //we don't care about the rest
        }
        this._owner.notify(args);
    };
    return MediaPlayerEventListener;
})(org.videolan.libvlc.MediaPlayer.EventListener);
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
        var vlcTextute = new com.coolapps.vlcsurfaceviewlib.VlcSurfaceView(this._context);
        var vlc = vlcTextute.getLibVLC();
        var player = vlcTextute.getMediaPlayer();
        var mediaPlayerEventListener = new MediaPlayerEventListener(this);
        player.setEventListener(mediaPlayerEventListener);
        this._android = vlcTextute;
        this._player = player;
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
            }
            else {
                this.src = android.net.Uri.parse(this.src);
            }
            var media = new org.videolan.libvlc.Media(vlc, this.src);
            player.setMedia(media);
        }
        if (this.autoplay === true) {
            //todo a bit of an ugly fix
            setTimeout(function () {
                player.play();
            }, 100);
        }
    };
    Video.prototype._setNativeVideo = function (nativeVideo) {
        if (nativeVideo) {
            var vlc = this.android.getLibVLC();
            var media = new org.videolan.libvlc.Media(vlc, nativeVideo);
            this._player.setMedia(media);
        }
        else {
            this.stop();
        }
    };
    Video.prototype.setNativeSource = function (nativePlayerSrc) {
        this.src = nativePlayerSrc;
    };
    Video.prototype.play = function () {
        this._player.play();
    };
    Video.prototype.pause = function () {
        this._player.pause();
    };
    Video.prototype.stop = function () {
        this._player.stop();
    };
    Video.prototype.seekTo = function (msec) {
        this._player.setTime(msec);
    };
    Video.prototype.getPosition = function () {
        return this._player.getTime();
    };
    Video.prototype.getDuration = function () {
        return this._player.getLength();
    };
    Video.prototype.isPlaying = function () {
        return this._player.isPlaying();
    };
    return Video;
})(videoCommon.Video);
exports.Video = Video;
