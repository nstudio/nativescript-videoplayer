/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin                          
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/

var common = require("./videoplayer-common");
var utils = require("utils/utils");

require("utils/module-merge").merge(common, module.exports);

var VideoPlayer = (function (_super) {

    console.log('videoplayer _extends function(_super)')
    global.__extends(VideoPlayer, _super);

    function VideoPlayer() {
        _super.apply(this, arguments);
    }

    console.log('videoplayer _createUI function(_super)')
    VideoPlayer.prototype._createUI = function () {

        this._android = new android.widget.VideoView(this._context);
        console.log('this._android: ' + this._android);

        var mMediaController = new android.widget.MediaController(this._context);
        this._android.setMediaController(mMediaController);

        if (this.src)
            this._android.setVideoURI(this.src);

        // if (this.localPath)
        //     this._android.setVideoPath(this.localVideoPath);

        //         var that = new WeakRef(this);
        // 
        //         this._android.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({
        //             get owner() {
        //                 return that.get();
        //             },
        // 
        //             onCompletion: function (v) {
        //                 if (this.owner) {
        //                     this.owner._emit("complete");
        //                 }
        //             }
        //         }));
    };

    Object.defineProperty(VideoPlayer.prototype, "android", {
        get: function () {
            return this._android;
        }
    });

    return VideoPlayer;

})(common.VideoPlayer);

exports.VideoPlayer = VideoPlayer;