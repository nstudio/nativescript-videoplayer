var types = require("utils/types");
var common = require("./video-source-common");
global.moduleMerge(common, exports);
var utils;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}
var fs;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}
var enums;
function ensureEnums() {
    if (!enums) {
        enums = require("ui/enums");
    }
}
var VideoSource = (function () {
    function VideoSource() {
    }
    VideoSource.prototype.loadFromResource = function (name) {
        this.android = null;
        ensureUtils();
        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            //var identifier: number = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
            //console.log('identifier: ' + identifier);
            var UrlPath = "android.resource://org.nativescript.videoPlayer/R.raw." + name;
            console.log('uri: ' + UrlPath);
            // var uri: string = android.net.Uri.parse("android.resource://" + utils.ad.getApplication().getPackageName() + "/R.raw." + name);
            this.android = UrlPath;
        }
        return this.android != null;
    };
    VideoSource.prototype.loadFromUrl = function (url) {
        this.android = null;
        this.android = url;
        return this.android != null;
    };
    VideoSource.prototype.loadFromFile = function (path) {
        ensureFS();
        var fileName = types.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
            console.log('fileName: ' + fileName);
        }
        this.android = fileName;
        return this.android != null;
    };
    VideoSource.prototype.setNativeSource = function (source) {
        this.android = source;
        return source != null;
    };
    Object.defineProperty(VideoSource.prototype, "height", {
        get: function () {
            if (this.android) {
                return this.android.getHeight();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoSource.prototype, "width", {
        get: function () {
            if (this.android) {
                return this.android.getWidth();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    return VideoSource;
})();
exports.VideoSource = VideoSource;
