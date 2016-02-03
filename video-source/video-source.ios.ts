import types = require("utils/types");
import fs = require("file-system");
import common = require("./video-source-common");
import enums = require("ui/enums");
import definition = require("video-source");

declare var android, AVPlayer, NSBundle, NSURL;

global.moduleMerge(common, exports);

export class VideoSource implements definition.VideoSource {
    public android: android.widget.VideoView;
    public ios: AVPlayer;

    public loadFromResource(name: string): boolean {
        let pa = NSBundle.mainBundle().pathForResourceOfType("big_buck_bunny", "mp4");
        let videoURL = NSURL.fileURLWithPath(pa);
        let player = AVPlayer(videoURL);
        this.ios = player;
        return this.ios != null;
    }


    public loadFromFile(path: string): boolean {
        var fileName = types.isString(path) ? path.trim() : "";

        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        //this.ios = UIImage.imageWithContentsOfFile(fileName); //Implement for video files
        return this.ios != null;
    }

    public setNativeSource(source: any): boolean {
        this.ios = source;
        return source != null;
    }
}

