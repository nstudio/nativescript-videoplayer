import types = require("utils/types");
import definition = require("./video-source");
import common = require("./video-source-common");
import * as utilsModule from "utils/utils";
import * as fileSystemModule from "file-system";
import * as enumsModule from "ui/enums";

global.moduleMerge(common, exports);

var utils: typeof utilsModule;
function ensureUtils() {
    if (!utils) {
        utils = require("utils/utils");
    }
}

var fs: typeof fileSystemModule;
function ensureFS() {
    if (!fs) {
        fs = require("file-system");
    }
}

var enums: typeof enumsModule;
function ensureEnums() {
    if (!enums) {
        enums = require("ui/enums");
    }
}

declare var android, AVPlayer: any;

export class VideoSource implements definition.VideoSource {
    public android: any; /// android.widget.VideoView
    public ios: any; /// AVPlayer

    public loadFromResource(name: string): boolean {
        this.android = null;

        ensureUtils();

        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var UrlPath = "android.resource://org.nativescript.videoPlayer/R.raw." + name;
            this.android = UrlPath;

        }

        return this.android != null;
    }

    public loadFromUrl(url: string): boolean {
        this.android = null;
        this.android = url;
        return this.android != null;
    }

    public loadFromFile(path: string): boolean {

        ensureFS();

        var fileName = types.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        this.android = fileName;
        return this.android != null;
    }

    public setNativeSource(source: any): boolean {
        this.android = source;
        return source != null;
    }


    get height(): number {
        if (this.android) {
            return this.android.getHeight();
        }

        return NaN;
    }

    get width(): number {
        if (this.android) {
            return this.android.getWidth();
        }

        return NaN;
    }

}