var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var VideoPlayer = (function (_super) {
    __extends(VideoPlayer, _super);
    function VideoPlayer() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(VideoPlayer.prototype, "video", {
        get: function () {
            return this._getValue(VideoPlayer.videoProperty);
        },
        set: function (value) {
            this._setValue(VideoPlayer.videoProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    VideoPlayer.videoProperty = new dependencyObservable.Property("video", "VideoPlayer", new proxy.PropertyMetadata(null));
    return VideoPlayer;
})(view.View);
exports.VideoPlayer = VideoPlayer;
