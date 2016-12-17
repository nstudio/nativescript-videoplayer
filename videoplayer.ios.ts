import common = require("./videoplayer-common");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import utils = require("utils/utils")
import enums = require("ui/enums");
import view = require("ui/core/view");
import definition = require("./videoplayer");
import * as typesModule from "utils/types";
import * as application from 'application';

declare var NSURL, AVPlayer, AVPlayerViewController, AVPlayerItemDidPlayToEndTimeNotification, UIView, CMTimeMakeWithSeconds, NSNotification, NSNotificationCenter, CMTimeGetSeconds, CMTimeMake, kCMTimeZero, AVPlayerItemStatusReadyToPlay;


global.moduleMerge(common, exports);

function onVideoSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var video = <Video>data.object;
    video._setNativeVideo(data.newValue ? data.newValue.ios : null);
}

// register the setNativeValue callback
(<proxy.PropertyMetadata>common.Video.videoSourceProperty.metadata).onSetNativeValue = onVideoSourcePropertyChanged;


export class Video extends common.Video {
    private _player: any; /// AVPlayer
    private _playerController: any; /// AVPlayerViewController
    private _ios: any; /// UIView
    private _src: string;
    private _didPlayToEndTimeObserver: any;
    private _didPlayToEndTimeActive: boolean;
    private _observer: NSObject;
    private _observerActive: boolean;


    constructor() {
        super();

        this._playerController = new AVPlayerViewController();

        this._player = new AVPlayer();
        this._playerController.player = this._player;
        // showsPlaybackControls must be set to false on init to avoid any potential 'Unable to simultaneously satisfy constraints' errors 
        this._playerController.showsPlaybackControls = false;
        this._ios = this._playerController.view;
        this._observer = PlayerObserverClass.alloc();
        this._observer["_owner"] = this;

    }

    get ios(): any {
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

        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }

        if (this.muted === true) {
            this._player.muted = true;
        }

        if (!this._observerActive) {
            this._player.currentItem.addObserverForKeyPathOptionsContext(this._observer, "status", 0, null);
            this._observerActive = true;
        }

        if (!this._didPlayToEndTimeActive) {
            this._didPlayToEndTimeObserver = application.ios.addNotificationObserver(AVPlayerItemDidPlayToEndTimeNotification, this.AVPlayerItemDidPlayToEndTimeNotification.bind(this));
            this._didPlayToEndTimeActive = true;
        }

    }

    private AVPlayerItemDidPlayToEndTimeNotification(notification: any) {
        if (this._player.currentItem && this._player.currentItem === notification.object) {
            // This will match exactly to the object from the notification so can ensure only looping and finished event for the video that has finished.
            // Notification is structured like so: NSConcreteNotification 0x61000024f690 {name = AVPlayerItemDidPlayToEndTimeNotification; object = <AVPlayerItem: 0x600000204190, asset = <AVURLAsset: 0x60000022b7a0, URL = https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4>>}
            this._emit(common.Video.finishedEvent);
            if (this.loop === true && this._player !== null) {
                // Go in 5ms for more seamless looping
                this.seekToTime(CMTimeMake(5, 100));
                this.play();
            }
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
        let time = CMTimeMakeWithSeconds(seconds, this._player.currentTime().timescale);
        this._player.seekToTimeToleranceBeforeToleranceAfterCompletionHandler(time, kCMTimeZero, kCMTimeZero, (isFinished) => {
            this._emit(common.Video.seekToTimeCompleteEvent);
        });
    }

    public getDuration(): number {
        let seconds = CMTimeGetSeconds(this._player.currentItem.asset.duration);
        let miliseconds = seconds * 1000.0;
        return miliseconds;
    }

    public getCurrentTime(): any {
        if (this._player === null) {
            return false;
        }
        return (this._player.currentTime().value / this._player.currentTime().timescale) * 1000;
    }


    public destroy() {
        if (this._didPlayToEndTimeActive) {
            application.ios.removeNotificationObserver(this._didPlayToEndTimeObserver, AVPlayerItemDidPlayToEndTimeNotification);
            this._didPlayToEndTimeActive = false;
        }

        if (this._observerActive = true) {
            this._player.currentItem.removeObserverForKeyPath(this._observer, "status");
            this._observerActive = false;
        }
        this.pause();
        this._player.replaceCurrentItemWithPlayerItem(null); //de-allocates the AVPlayer
        this._playerController = null;
    }

    private _loadingComplete() {
        this._emit(common.Video.loadingCompleteEvent);
    }

}

class PlayerObserverClass extends NSObject {
    observeValueForKeyPathOfObjectChangeContext(path: string, obj: Object, change: NSDictionary<any, any>, context: any) {
        if (path === "status") {
            if (this["_owner"]._player.currentItem.status === AVPlayerItemStatusReadyToPlay) {
                this["_owner"]._loadingComplete();
                if (this["_owner"].autoplay === true) {
                    this["_owner"].play();
                }
            }
        }
    }
}