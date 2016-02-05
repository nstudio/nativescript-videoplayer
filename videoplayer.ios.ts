import common = require("./videoplayer-common");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import utils = require("utils/utils")
import enums = require("ui/enums");
import definition = require("videoplayer");
import * as typesModule from "utils/types";

declare var NSURL, AVPlayer, AVPlayerViewController, UIView;

global.moduleMerge(common, exports);

function onVideoSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var video = <Video>data.object;
    video._setNativeVideo(data.newValue ? data.newValue.ios : null);
}

// register the setNativeValue callback
(<proxy.PropertyMetadata>common.Video.videoSourceProperty.metadata).onSetNativeValue = onVideoSourcePropertyChanged;

export class Video extends common.Video {
    private _player: AVPlayer;
    private _playerController: AVPlayerViewController;
    private _ios: UIView;
    private _src: string;

    constructor(options?: definition.Options) {
        super(options);

        this._playerController = new AVPlayerViewController();

        this._player = new AVPlayer();
        this._playerController.player = this._player;
        this._ios = this._playerController.view;

        //var videoUrlStr = "https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";

    }

    public _setNativeVideo(nativeVideoPlayer: any) {
        if (nativeVideoPlayer != null) {
            this._player = nativeVideoPlayer;
            this._playerController.player = this._player;

            this._player.play();

            if (isNaN(this.width) || isNaN(this.height)) {
                this.requestLayout();
            }
        }
    }

    public _setNativePlayerSource(nativePlayerSrc: string) {
        this._src = nativePlayerSrc;

            let url: string = NSURL.URLWithString(this._src);
            this._player = new AVPlayer(url);
            this._playerController.player = this._player;

            this._player.play();

        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }
    }

    get ios(): UIView {
        return this._ios;
    }

}