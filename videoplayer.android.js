var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./videoplayer-common");
var utils = require("utils/utils");
global.moduleMerge(common, exports);
var Video = (function (_super) {
    __extends(Video, _super);
    function Video() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Video.prototype, "android", {
        get: function () {
            return this._mVideoView;
        },
        enumerable: true,
        configurable: true
    });
    Video.prototype._createUI = function () {
        var that = new WeakRef(this);
        this._mVideoView = new android.widget.VideoView(this._context);
        this._mMediaController = new android.widget.MediaController(this._context);
        this._mMediaPlayer = new android.media.MediaPlayer;
        /*
        * http://developer.android.com/intl/zh-tw/reference/android/widget/VideoView.html#setMediaController(android.widget.MediaController)
        */
        this._mVideoView.setMediaController(this._mMediaController);
        /**
        * http://developer.android.com/intl/zh-tw/reference/android/widget/MediaController.html#setAnchorView(android.view.View)
        * Set the view that acts as the anchor for the control view. This can for example be a VideoView, or your Activity's main view. When VideoView calls this method, it will use the VideoView's parent as the anchor.
        */
        this._mMediaController.setAnchorView(this._mVideoView);
        if (this.src) {
            // Check if src is local file/resource or URL for remote video file and use correct method() for VideoView
            if (utils.isFileOrResourcePath(this.src) === true) {
                this._mVideoView.setVideoPath(this.src);
            }
            else {
                var url = android.net.Uri.parse(this.src);
                this._mVideoView.setVideoURI(url);
            }
        }
        /*
        * http://developer.android.com/intl/zh-tw/reference/android/widget/VideoView.html#start()
        * Start playing the video if autoplay: boolean = true;
        */
        if (this.autoplay === true) {
            this._mVideoView.requestFocus();
            this._mVideoView.start();
        }
        //if (this.finishedCallback) {
        //    // Create the Complete Listener - this is triggered once a video reaches the end
        //    this._mVideoView.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({
        //        //onCompletion: this.onComplete;
        //        onCompletion: this.finishedCallback;
        //    }));
        //}
    };
    return Video;
})(common.Video);
exports.Video = Video;
