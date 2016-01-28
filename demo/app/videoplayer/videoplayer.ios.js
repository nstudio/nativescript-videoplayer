var common = require("./videoplayer-common");
var utils = require("utils/utils");
global.moduleMerge(common, exports);
var Video = (function (_super) {
    __extends(Video, _super);
    function Video() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Video.prototype, "ios", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    Video.prototype._createUI = function () {
        this._playerController = new AVPlayerViewController();
        if (this.src) {
            // Check if src is local file/resource or URL for remote video file and use correct method() for VideoView
            if (utils.isFileOrResourcePath(this.src) === true) {
            }
            else {
                var url = NSURL.URLWithString(this.src);
                this._player = new AVPlayer(url);
                this._playerController.player = this._player;
            }
        }
        // Start playing the video if autoplay: boolean = true;        
        if (this.autoplay === true) {
            this._player.play();
        }
    };
    return Video;
})(common.Video);
exports.Video = Video;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9wbGF5ZXIuaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlkZW9wbGF5ZXIuaW9zLnRzIl0sIm5hbWVzIjpbIlZpZGVvIiwiVmlkZW8uY29uc3RydWN0b3IiLCJWaWRlby5pb3MiLCJWaWRlby5fY3JlYXRlVUkiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sTUFBTSxXQUFXLHNCQUFzQixDQUFDLENBQUM7QUFDaEQsSUFBTyxLQUFLLFdBQVcsYUFBYSxDQUFDLENBQUE7QUFFckMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEM7SUFBMkJBLHlCQUFZQTtJQUF2Q0E7UUFBMkJDLDhCQUFZQTtJQStCdkNBLENBQUNBO0lBM0JHRCxzQkFBSUEsc0JBQUdBO2FBQVBBO1lBQ0lFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3hCQSxDQUFDQTs7O09BQUFGO0lBRU1BLHlCQUFTQSxHQUFoQkE7UUFFSUcsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxzQkFBc0JBLEVBQUVBLENBQUNBO1FBRXREQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVYQSwwR0FBMEdBO1lBQzFHQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxvQkFBb0JBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBRXBEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDSkEsSUFBSUEsR0FBR0EsR0FBV0EsS0FBS0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hEQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDakNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakRBLENBQUNBO1FBRUxBLENBQUNBO1FBRURBLCtEQUErREE7UUFDL0RBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7SUFFTEEsQ0FBQ0E7SUFDTEgsWUFBQ0E7QUFBREEsQ0FBQ0EsQUEvQkQsRUFBMkIsTUFBTSxDQUFDLEtBQUssRUErQnRDO0FBL0JZLGFBQUssUUErQmpCLENBQUEifQ==