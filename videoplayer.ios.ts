import common = require("./videoplayer-common");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import utils = require("utils/utils")
import enums = require("ui/enums");
import definition = require("videoplayer");
import * as typesModule from "utils/types";
import application = require("application");
import view = require("ui/core/view");

declare var NSURL, AVPlayer, AVPlayerViewController, UIView, CMTimeMakeWithSeconds, NSNotificationCenter, CMTimeGetSeconds, CMTimeMake;

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

            this._init();
        }
    }

    public _setNativePlayerSource(nativePlayerSrc: string) {
        this._src = nativePlayerSrc;
        let url: string = NSURL.URLWithString(this._src);
        this._player = new AVPlayer(url);

        this._init();

    }

    public _init() {

        var that = new WeakRef(this);

        if (this.controls === false) {
            this._playerController.showsPlaybackControls = false;
        }

        this._playerController.player = this._player;

        if (this.autoplay === true) {
            this.play();
        }

        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }

        if (this.finishedCallback) {
            application.ios.addNotificationObserver(AVPlayerItemDidPlayToEndTimeNotification, (notification: NSNotification) => {
                // console.log("AVPlayerItemDidPlayToEndTimeNotification: " + notification);
                this._emit(common.Video.finishedEvent);
                if (this.loop === true) {
                    // Go in 5ms for more seamless looping
                    this.seekToTime(CMTimeMake(5, 100));
                    this.play();
                }
            });
        }
    }

    public play() {
        this._player.play();
    }

    public pause() {
        this._player.pause();
    }

    public mute(mute: boolean) {
        this._player.muted = mute;
    }

    public seekToTime(time: number) {
        this._player.seekToTime(CMTimeMakeWithSeconds(time, this._player.currentTime().timescale));
    }

    public get currentTime():any {
        return Math.round(this._player.currentTime().value / this._player.currentTime().timescale);
    }

    get ios(): UIView {
        return this._ios;
    }


}