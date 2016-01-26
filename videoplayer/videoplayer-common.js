var view = require("ui/core/view");

var VideoPlayer = (function (_super) {
    console.log('videoplayer function(_super) common.js');

    global.__extends(VideoPlayer, _super);

    function VideoPlayer() {
        _super.call(this);
    }

    console.log('videoplayer defineProperty.src');

    Object.defineProperty(VideoPlayer.prototype, "src", {
        get: function () {
            return this._getValue(VideoPlayer.srcProperty);
        },
        set: function (value) {
            this._setValue(VideoPlayer.srcProperty, value);
        }
    });

    return VideoPlayer;

})(view.View);

exports.VideoPlayer = VideoPlayer;