import common = require("./videoplayer-common");
import utils = require("utils/utils")

global.moduleMerge(common, exports);

export class Video extends common.Video {
    private _player: AVPlayer;
    private _playerController: AVPlayerViewController;

    get ios(): new AVPlayer {
        return this._player;
    }

    public _createUI() {

        this._playerController = new AVPlayerViewController();

        if (this.src) {

            // Check if src is local file/resource or URL for remote video file and use correct method() for VideoView
            if (utils.isFileOrResourcePath(this.src) === true) {
                // TODO: how does iOS handle local video files???
            } else {
                let url: string = NSURL.URLWithString(this.src);
                this._player = new AVPlayer(url);
                this._playerController.player = this._player;
            }

        }
        
        // Start playing the video if autoplay: boolean = true;        
        if (this.autoplay === true) {
            this._player.play();
        }
        
    }
}