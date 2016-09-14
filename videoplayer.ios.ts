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
        // showsPlaybackControls must be set to false on init to avoid any potential 'Unable to simultaneously satisfy constraints' errors 
        this._playerController.showsPlaybackControls = false;
        this._ios = this._playerController.view;

    }

    get ios(): UIView {
        return this._ios;
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

    private _init() {

        var self = this;

        if (this.controls !== false) {
            this._playerController.showsPlaybackControls = true;
        }

        this._playerController.player = this._player;

        if (this.autoplay === true) {
            this.play();
        }

        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }

        if (this.muted === true) {
            this._player.muted = true;
        }

        if (this.finishedCallback) {
            application.ios.addNotificationObserver(AVPlayerItemDidPlayToEndTimeNotification, (notification: NSNotification) => {
                self._emit(common.Video.finishedEvent);
                if (this.loop === true && this._player !== null) {
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

    public seekToTime(ms: number) {
        let seconds = ms / 1000.0;
        this._player.seekToTime(CMTimeMakeWithSeconds(seconds, this._player.currentTime().timescale));
    }

    public getDuration(): any {
        /// need to implement
    }

    public get getCurrentTime(): any {
        if (this._player === null) {
            return false;
        }
        return (this._player.currentTime().value / this._player.currentTime().timescale) * 1000;
    }


    public destroy() {
        if (this.finishedCallback) {
            application.ios.removeNotificationObserver(AVPlayerItemDidPlayToEndTimeNotification);
        }

        this.pause();
        this._player = null; //de-allocates the AVPlayer
        this._playerController = null;
    }

}