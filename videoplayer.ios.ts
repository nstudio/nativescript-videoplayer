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
        //this.src = videoUrlStr;

            //let url: string = NSURL.URLWithString(this.src);
            //this._ios = new AVPlayer(url);
            //this._ios.play();


        //this._playerController.player = this._ios;
    }

    public _setNativeVideo(nativeVideo: any) {
        this.ios.video = nativeVideo;
        //this._src = nativeVideo;

        //let url: string = NSURL.URLWithString(this._src);
        this._player = new AVPlayer(nativeVideo);
        this._playerController.player = this._player;

        this._player.play();

        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }
    }

    public _setNativePlayerSource(nativePlayerSrc: string) {
        //this.ios = nativePlayer;
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

/*
    public _createUI() {

        this._playerController = new AVPlayerViewController();

        if (this.src) {

            // Check if src is local file/resource or URL for remote video file and use correct method() for VideoView
            if (utils.isFileOrResourcePath(this.src) === true) {
                // TODO: how does iOS handle local video files???
            } else {
                let url: string = NSURL.URLWithString(this.src);
                //._player = new AVPlayer(url);
                this._playerController.player = this._player;
            }

        }

        // Start playing the video if autoplay: boolean = true;
        if (this.autoplay === true) {
            this._player.play();
        }
    }
    */
}