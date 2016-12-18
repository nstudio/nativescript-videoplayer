import types = require("utils/types");
import fs = require("file-system");
import common = require("./video-source-common");
import enums = require("ui/enums");
import definition = require("./video-source");

declare var android, AVPlayerItem, NSBundle, NSURL;

global.moduleMerge(common, exports);

export class VideoSource implements definition.VideoSource {
    public android: any; /// android.widget.VideoView
    public ios: any; /// AVPlayerItem
    height: any;
    width: any;

    public loadFromResource(name: string): boolean {
        let videoURL = NSBundle.mainBundle().URLForResourceWithExtension(name, null);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }

    public loadFromFile(path: string): boolean {
        var fileName = types.isString(path) ? path.trim() : "";

        if (fileName.indexOf("~/") === 0) {
            fileName = 'file://' + fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        let videoURL = NSURL.URLWithString(fileName);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }

    public loadFromUrl(url: string): boolean {
        let videoURL = NSURL.URLWithString(url);
        let player = new AVPlayerItem(videoURL);
        this.ios = player;
        return this.ios != null;
    }

    public setNativeSource(source: any): boolean {
        this.ios = source;
        return source != null;
    }
}

