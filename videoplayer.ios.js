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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9wbGF5ZXIuaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlkZW9wbGF5ZXIuaW9zLnRzIl0sIm5hbWVzIjpbIm9uVmlkZW9Tb3VyY2VQcm9wZXJ0eUNoYW5nZWQiLCJWaWRlbyIsIlZpZGVvLmNvbnN0cnVjdG9yIiwiVmlkZW8uX3NldE5hdGl2ZVZpZGVvIiwiVmlkZW8uX3NldE5hdGl2ZVBsYXllclNvdXJjZSIsIlZpZGVvLmlvcyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxNQUFNLFdBQVcsc0JBQXNCLENBQUMsQ0FBQztBQVVoRCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVwQyxzQ0FBc0MsSUFBNkM7SUFDL0VBLElBQUlBLEtBQUtBLEdBQVVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO0lBQy9CQSxLQUFLQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtBQUNwRUEsQ0FBQ0E7QUFFRCx1Q0FBdUM7QUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFFBQVMsQ0FBQyxnQkFBZ0IsR0FBRyw0QkFBNEIsQ0FBQztBQUVwSDtJQUEyQkMseUJBQVlBO0lBTW5DQSxlQUFZQSxPQUE0QkE7UUFDcENDLGtCQUFNQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUVmQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7UUFFdERBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQzdDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBO1FBRXhDQSx5RUFBeUVBO1FBQ3pFQSx5QkFBeUJBO1FBRXJCQSxrREFBa0RBO1FBQ2xEQSxnQ0FBZ0NBO1FBQ2hDQSxtQkFBbUJBO1FBR3ZCQSw0Q0FBNENBO0lBQ2hEQSxDQUFDQTtJQUVNRCwrQkFBZUEsR0FBdEJBLFVBQXVCQSxXQUFnQkE7UUFDbkNFLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBO1FBQzdCQSwwQkFBMEJBO1FBRTFCQSxtREFBbURBO1FBQ25EQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUN6Q0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUU3Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFFcEJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFFTUYsc0NBQXNCQSxHQUE3QkEsVUFBOEJBLGVBQXVCQTtRQUNqREcsMEJBQTBCQTtRQUMxQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsZUFBZUEsQ0FBQ0E7UUFFeEJBLElBQUlBLEdBQUdBLEdBQVdBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ2pEQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNqQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUU3Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFFeEJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFFREgsc0JBQUlBLHNCQUFHQTthQUFQQTtZQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBSjtJQTBCTEEsWUFBQ0E7QUFBREEsQ0FBQ0EsQUFwRkQsRUFBMkIsTUFBTSxDQUFDLEtBQUssRUFvRnRDO0FBcEZZLGFBQUssUUFvRmpCLENBQUEifQ==