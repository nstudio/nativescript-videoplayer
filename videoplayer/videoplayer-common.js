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
// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;
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
    Video.srcProperty = new dependencyObservable.Property("src", "Video", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));
    Video.isLoadingProperty = new dependencyObservable.Property("isLoading", "Video", new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
    Video.autoplayProperty = new dependencyObservable.Property("autoplay", "Video", new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));
    return Video;
})(view.View);
exports.Video = Video;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9wbGF5ZXItY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlkZW9wbGF5ZXItY29tbW9uLnRzIl0sIm5hbWVzIjpbIlZpZGVvIiwiVmlkZW8uY29uc3RydWN0b3IiLCJWaWRlby5zcmMiLCJWaWRlby5pc0xvYWRpbmciLCJWaWRlby5hdXRvcGxheSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3VGQUt1RjtBQUV2RixJQUFPLElBQUksV0FBVyxjQUFjLENBQUMsQ0FBQztBQUV0QyxJQUFPLFFBQVEsV0FBVyxVQUFVLENBQUMsQ0FBQztBQUN0QyxJQUFPLG9CQUFvQixXQUFXLCtCQUErQixDQUFDLENBQUM7QUFDdkUsSUFBTyxLQUFLLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFFeEMsbUlBQW1JO0FBQ25JLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUM7QUFHN0w7SUFBMkJBLHlCQUFTQTtJQVdoQ0EsZUFBWUEsT0FBNEJBO1FBQ3BDQyxrQkFBTUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBRURELHNCQUFJQSxzQkFBR0E7YUFBUEE7WUFDSUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDN0NBLENBQUNBO2FBQ0RGLFVBQVFBLEtBQVVBO1lBQ2RFLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO1FBQzdDQSxDQUFDQTs7O09BSEFGO0lBS0RBLHNCQUFJQSw0QkFBU0E7YUFBYkE7WUFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtRQUNuREEsQ0FBQ0E7OztPQUFBSDtJQUVEQSxzQkFBSUEsMkJBQVFBO2FBQVpBO1lBQ0lJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7UUFDbERBLENBQUNBO2FBQ0RKLFVBQWFBLEtBQVVBO1lBQ25CSSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQTs7O09BSEFKO0lBMUJhQSxpQkFBV0EsR0FBR0EsSUFBSUEsb0JBQW9CQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxPQUFPQSxFQUN4RUEsSUFBSUEsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxFQUFFQSxvQkFBb0JBLENBQUNBLHdCQUF3QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFakZBLHVCQUFpQkEsR0FBR0EsSUFBSUEsb0JBQW9CQSxDQUFDQSxRQUFRQSxDQUFDQSxXQUFXQSxFQUFFQSxPQUFPQSxFQUNwRkEsSUFBSUEsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxFQUFFQSxvQkFBb0JBLENBQUNBLHdCQUF3QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFN0VBLHNCQUFnQkEsR0FBR0EsSUFBSUEsb0JBQW9CQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxFQUFFQSxPQUFPQSxFQUNsRkEsSUFBSUEsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxFQUFFQSxvQkFBb0JBLENBQUNBLHdCQUF3QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUEwQi9GQSxZQUFDQTtBQUFEQSxDQUFDQSxBQW5DRCxFQUEyQixJQUFJLENBQUMsSUFBSSxFQW1DbkM7QUFuQ1ksYUFBSyxRQW1DakIsQ0FBQSJ9