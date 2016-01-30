/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/
var view = require("ui/core/view");
var platform = require("platform");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var videoSource = require("../video-source/video-source");
var utils = require("utils/utils");
var SRC = "src";
var VIDEO_SOURCE = "videoSource";
var VIDEO = "Video";
// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;
function onSrcPropertyChanged(data) {
    var video = data.object;
    var value = data.newValue;
    value = value.trim();
    video["_url"] = value;
    video._setValue(Video.isLoadingProperty, true);
    if (utils.isFileOrResourcePath(value)) {
        video.videoSource = videoSource.fromFileOrResource(value);
        video._setValue(Video.isLoadingProperty, false);
    }
    else {
        videoSource.fromUrl(value).then(function (r) {
            if (video["_url"] === value) {
                video.videoSource = r;
                video._setValue(Video.isLoadingProperty, false);
            }
        });
    }
    //video._setNativePlayerSource(data.newValue);
}
var Video = (function (_super) {
    __extends(Video, _super);
    function Video(options) {
        _super.call(this, options);
    }
    Object.defineProperty(Video.prototype, "src", {
        get: function () {
            return this._getValue(Video.srcProperty);
        },
        set: function (value) {
            this._setValue(Video.srcProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "videoSource", {
        get: function () {
            return this._getValue(Video.videoSourceProperty);
        },
        set: function (value) {
            this._setValue(Video.videoSourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "isLoading", {
        get: function () {
            return this._getValue(Video.isLoadingProperty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Video.prototype, "autoplay", {
        get: function () {
            return this._getValue(Video.autoplayProperty);
        },
        set: function (value) {
            this._setValue(Video.autoplayProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Video.prototype.finishedCallback = function () { }; //TODO
    Video.srcProperty = new dependencyObservable.Property(SRC, VIDEO, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));
    Video.videoSourceProperty = new dependencyObservable.Property(VIDEO_SOURCE, VIDEO, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));
    Video.isLoadingProperty = new dependencyObservable.Property("isLoading", VIDEO, new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
    Video.autoplayProperty = new dependencyObservable.Property("autoplay", VIDEO, new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
    return Video;
})(view.View);
exports.Video = Video;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9wbGF5ZXItY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlkZW9wbGF5ZXItY29tbW9uLnRzIl0sIm5hbWVzIjpbIm9uU3JjUHJvcGVydHlDaGFuZ2VkIiwiVmlkZW8iLCJWaWRlby5jb25zdHJ1Y3RvciIsIlZpZGVvLnNyYyIsIlZpZGVvLnZpZGVvU291cmNlIiwiVmlkZW8uaXNMb2FkaW5nIiwiVmlkZW8uYXV0b3BsYXkiLCJWaWRlby5maW5pc2hlZENhbGxiYWNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7dUZBS3VGO0FBRXZGLElBQU8sSUFBSSxXQUFXLGNBQWMsQ0FBQyxDQUFDO0FBRXRDLElBQU8sUUFBUSxXQUFXLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLElBQU8sb0JBQW9CLFdBQVcsK0JBQStCLENBQUMsQ0FBQztBQUN2RSxJQUFPLEtBQUssV0FBVyxlQUFlLENBQUMsQ0FBQztBQUN4QyxJQUFZLFdBQVcsV0FBTSw4QkFBOEIsQ0FBQyxDQUFBO0FBQzVELElBQU8sS0FBSyxXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBR3RDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNoQixJQUFJLFlBQVksR0FBRyxhQUFhLENBQUM7QUFDakMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBR3BCLG1JQUFtSTtBQUNuSSxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDO0FBRzdMLDhCQUE4QixJQUE2QztJQUN2RUEsSUFBSUEsS0FBS0EsR0FBVUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDL0JBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO0lBRTFCQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFD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