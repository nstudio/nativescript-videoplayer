"use strict";
var main_view_model_1 = require('./main-view-model');
var platform_1 = require("platform");
var color_1 = require("color");
var frame_1 = require("ui/frame");
var application_1 = require("application");
// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    // Get the event sender    
    var page = args.object;
    if (platform_1.isAndroid && platform_1.device.sdkVersion >= "21") {
        var window_1 = application_1.android.startActivity.getWindow();
        window_1.setStatusBarColor(new color_1.Color("#d32f2f").android);
    }
    setTimeout(function () {
        var videoPlayer = frame_1.topmost().getViewById('nativeVideoPlayer');
        page.bindingContext = new main_view_model_1.HelloWorldModel(videoPlayer);
    }, 0);
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=main-page.js.map