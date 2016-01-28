var common = require("./videoplayer-common");
global.moduleMerge(common, exports);
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
        this._mediaController = new android.widget.MediaController(this._context);
        this._MediaPlayer = new android.media.MediaPlayer;
        this._android.setMediaController(this._mediaController);
        if (this.src) {
            var url = android.net.Uri.parse(this.src);
            this._android.setVideoURI(url);
        }
        if (this.autoplay === true) {
            this._android.requestFocus();
            this._android.start();
        }
        //if (this.onComplete) {
        //    // Create the Complete Listener - this is triggered once a video reaches the end
        //    this._android.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({
        //        //onCompletion: this.onComplete;
        //        onCompletion: function (args) {
        //            console.log('Video Done');
        //        }
        //    }));
        //}        
    };
    return Video;
})(common.Video);
exports.Video = Video;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9wbGF5ZXIuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZGVvcGxheWVyLmFuZHJvaWQudHMiXSwibmFtZXMiOlsiVmlkZW8iLCJWaWRlby5jb25zdHJ1Y3RvciIsIlZpZGVvLmFuZHJvaWQiLCJWaWRlby5fY3JlYXRlVUkiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sTUFBTSxXQUFXLHNCQUFzQixDQUFDLENBQUM7QUFHaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEM7SUFBMkJBLHlCQUFZQTtJQUF2Q0E7UUFBMkJDLDhCQUFZQTtJQXdDdkNBLENBQUNBO0lBbkNHRCxzQkFBSUEsMEJBQU9BO2FBQVhBO1lBQ0lFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3pCQSxDQUFDQTs7O09BQUFGO0lBRU1BLHlCQUFTQSxHQUFoQkE7UUFFSUcsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFN0JBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQzVEQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQzFFQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUVsREEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1FBRXhEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNYQSxJQUFJQSxHQUFHQSxHQUFHQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMxQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLENBQUNBO1FBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRURBLHdCQUF3QkE7UUFDeEJBLHNGQUFzRkE7UUFDdEZBLGdHQUFnR0E7UUFDaEdBLDBDQUEwQ0E7UUFDMUNBLHlDQUF5Q0E7UUFDekNBLHdDQUF3Q0E7UUFDeENBLFdBQVdBO1FBQ1hBLFVBQVVBO1FBQ1ZBLFdBQVdBO0lBRWZBLENBQUNBO0lBQ0xILFlBQUNBO0FBQURBLENBQUNBLEFBeENELEVBQTJCLE1BQU0sQ0FBQyxLQUFLLEVBd0N0QztBQXhDWSxhQUFLLFFBd0NqQixDQUFBIn0=