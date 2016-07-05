import videoCommon = require("./videoplayer-common");
import videoSource = require("video-source");
import dependencyObservable = require("ui/core/dependency-observable");
import fs = require("file-system");
import proxy = require("ui/core/proxy");
import * as enumsModule from "ui/enums";
import view = require("ui/core/view");
import utils = require("utils/utils");

global.moduleMerge(videoCommon, exports);

function onVideoSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var video = <Video>data.object;
    if (!video.android) {
        return;
    }  

    video._setNativeVideo(data.newValue ? data.newValue.android : null); 
}

// register the setNativeValue callback
(<proxy.PropertyMetadata>videoCommon.Video.videoSourceProperty.metadata).onSetNativeValue = onVideoSourcePropertyChanged;

declare var android: any;

export class Video extends videoCommon.Video {
    private _android: android.widget.VideoView;

    get android(): android.widget.VideoView {
        return this._android;
    }

    public _createUI() {

        var that = new WeakRef(this);

        this._android = new android.widget.VideoView(this._context);
        var _mMediaController = new android.widget.MediaController(this._context);

        this._android.setMediaController(_mMediaController);
        _mMediaController.setAnchorView(this._android);

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
            } else {
                this._android.setVideoPath(this.src);
            }

        }

        if (this.autoplay === true) {
            this._android.requestFocus();
            this._android.start();
        }

        if (this.finishedCallback) {
            // Create the Complete Listener - this is triggered once a video reaches the end
            this._android.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener(
                {
                    get owner() {
                        return that.get();
                    },

                    onCompletion: function(v) {
                        if (this.owner) {
                            this.owner._emit(videoCommon.Video.finishedEvent);
                        }
                    }
                }));
        }

    }

    public _setNativeVideo(nativeVideo: any) {
        this.android.video = nativeVideo;
    }

    public setNativeSource(nativePlayerSrc: string) {
        this.src = nativePlayerSrc;
    }

}