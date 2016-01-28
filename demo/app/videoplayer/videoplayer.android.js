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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9wbGF5ZXIuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZGVvcGxheWVyLmFuZHJvaWQudHMiXSwibmFtZXMiOlsiVmlkZW8iLCJWaWRlby5jb25zdHJ1Y3RvciIsIlZpZGVvLmFuZHJvaWQiLCJWaWRlby5fY3JlYXRlVUkiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sTUFBTSxXQUFXLHNCQUFzQixDQUFDLENBQUM7QUFDaEQsSUFBTyxLQUFLLFdBQVcsYUFBYSxDQUFDLENBQUE7QUFFckMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEM7SUFBMkJBLHlCQUFZQTtJQUF2Q0E7UUFBMkJDLDhCQUFZQTtJQXdEdkNBLENBQUNBO0lBbkRHRCxzQkFBSUEsMEJBQU9BO2FBQVhBO1lBQ0lFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBQzVCQSxDQUFDQTs7O09BQUFGO0lBRU1BLHlCQUFTQSxHQUFoQkE7UUFFSUcsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFN0JBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQy9EQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQzNFQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUVuREE7O1VBRUVBO1FBQ0ZBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtRQUU1REE7OztVQUdFQTtRQUNGQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBRXZEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNYQSwwR0FBMEdBO1lBQzFHQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxvQkFBb0JBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoREEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNKQSxJQUFJQSxHQUFHQSxHQUFXQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDbERBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVEQTs7O1VBR0VBO1FBQ0ZBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRURBLDhCQUE4QkE7UUFDOUJBLHNGQUFzRkE7UUFDdEZBLG1HQUFtR0E7UUFDbkdBLDBDQUEwQ0E7UUFDMUNBLDhDQUE4Q0E7UUFDOUNBLFVBQVVBO1FBQ1ZBLFdBQVdBO0lBRWZBLENBQUNBO0lBQ0xILFlBQUNBO0FBQURBLENBQUNBLEFBeERELEVBQTJCLE1BQU0sQ0FBQyxLQUFLLEVBd0R0QztBQXhEWSxhQUFLLFFBd0RqQixDQUFBIn0=