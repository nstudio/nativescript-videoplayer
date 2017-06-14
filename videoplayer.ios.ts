import * as application from "tns-core-modules/application";
import * as common from "./videoplayer-common";

export * from "./videoplayer-common";

declare const NSURL,
  NSObject,
  NSDictionary,
  AVPlayer,
  AVPlayerItem,
  NSObjectAVPlayer,
  AVPlayerViewController,
  AVPlayerItemDidPlayToEndTimeNotification,
  UIView,
  CMTimeMakeWithSeconds,
  NSNotification,
  NSNotificationCenter,
  CMTimeGetSeconds,
  CMTimeMake,
  kCMTimeZero,
  AVPlayerItemStatusReadyToPlay,
  AVAsset;

export class Video extends common.Video {
  private _player: any; /// AVPlayer
  private _playerController: any; /// AVPlayerViewController
  private _src: string;
  private _didPlayToEndTimeObserver: any;
  private _didPlayToEndTimeActive: boolean;
  private _observer: NSObject;
  private _observerActive: boolean;
  private _videoLoaded: boolean;
  private _playbackTimeObserver: any;
  private _playbackTimeObserverActive: boolean;
  private _videoPlaying: boolean;
  private _videoFinished: boolean;
  public nativeView: any;

  constructor() {
    super();
    this._playerController = new AVPlayerViewController();
    this._player = new AVPlayer();
    this._playerController.player = this._player;
    // showsPlaybackControls must be set to false on init to avoid any potential 'Unable to simultaneously satisfy constraints' errors
    this._playerController.showsPlaybackControls = false;
    this.nativeView = this._playerController.view;
    this._observer = PlayerObserverClass.alloc();
    this._observer["_owner"] = this;
    this._videoFinished = false;
  }

  get ios(): any {
    return this.nativeView;
  }

  [common.videoSourceProperty.setNative](value: AVPlayerItem) {
    this._setNativeVideo(value ? value.ios : null);
  }

  public _setNativeVideo(nativeVideoPlayer: any) {
    if (nativeVideoPlayer != null) {
      let currentItem = this._player.currentItem;
      this._addStatusObserver(nativeVideoPlayer);
      this._autoplayCheck();
      this._videoFinished = false;
      if (currentItem !== null) {
        this._videoLoaded = false;
        this._videoPlaying = false;
        this._removeStatusObserver(currentItem);
        // Need to set to null so the previous video is not shown while its loading
        this._player.replaceCurrentItemWithPlayerItem(null);
        this._player.replaceCurrentItemWithPlayerItem(nativeVideoPlayer);
      } else {
        this._player.replaceCurrentItemWithPlayerItem(nativeVideoPlayer);
        this._init();
      }
    }
  }

  public updateAsset(nativeVideoAsset: AVAsset) {
    let newPlayerItem = AVPlayerItem.playerItemWithAsset(nativeVideoAsset);
    this._setNativeVideo(newPlayerItem);
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

    if (!this._didPlayToEndTimeActive) {
      this._didPlayToEndTimeObserver = application.ios.addNotificationObserver(
        AVPlayerItemDidPlayToEndTimeNotification,
        this.AVPlayerItemDidPlayToEndTimeNotification.bind(this)
      );
      this._didPlayToEndTimeActive = true;
    }
  }

  private AVPlayerItemDidPlayToEndTimeNotification(notification: any) {
    if (
      this._player.currentItem &&
      this._player.currentItem === notification.object
    ) {
      // This will match exactly to the object from the notification so can ensure only looping and finished event for the video that has finished.
      // Notification is structured like so: NSConcreteNotification 0x61000024f690 {name = AVPlayerItemDidPlayToEndTimeNotification; object = <AVPlayerItem: 0x600000204190, asset = <AVURLAsset: 0x60000022b7a0, URL = https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4>>}
      this._emit(common.Video.finishedEvent);
      this._videoFinished = true;
      if (this.loop === true && this._player !== null) {
        // Go in 5ms for more seamless looping
        this._player.seekToTime(CMTimeMake(5, 100));
        this._player.play();
      }
    }
  }

  public play() {
    if (this._videoFinished) {
      this._videoFinished = false;
      this.seekToTime(CMTimeMake(5, 100));
    }

    if (this.observeCurrentTime && !this._playbackTimeObserverActive) {
      this._addPlaybackTimeObserver();
    }

    this._player.play();
  }

  public pause() {
    this._player.pause();
    if (this._playbackTimeObserverActive) {
      this._removePlaybackTimeObserver();
    }
  }

  public mute(mute: boolean) {
    this._player.muted = mute;
  }

  public seekToTime(ms: number) {
    let seconds = ms / 1000.0;
    let time = CMTimeMakeWithSeconds(
      seconds,
      this._player.currentTime().timescale
    );
    this._player.seekToTimeToleranceBeforeToleranceAfterCompletionHandler(
      time,
      kCMTimeZero,
      kCMTimeZero,
      isFinished => {
        this._emit(common.Video.seekToTimeCompleteEvent);
      }
    );
  }

  public getDuration(): number {
    let seconds = CMTimeGetSeconds(this._player.currentItem.asset.duration);
    let milliseconds = seconds * 1000.0;
    return milliseconds;
  }

  public getCurrentTime(): any {
    if (this._player === null) {
      return false;
    }
    return (
      this._player.currentTime().value /
      this._player.currentTime().timescale *
      1000
    );
  }

  public setVolume(volume: number) {
    this._player.volume = volume;
  }

  public destroy() {
    this._removeStatusObserver(this._player.currentItem);

    if (this._didPlayToEndTimeActive) {
      application.ios.removeNotificationObserver(
        this._didPlayToEndTimeObserver,
        AVPlayerItemDidPlayToEndTimeNotification
      );
      this._didPlayToEndTimeActive = false;
    }

    if (this._playbackTimeObserverActive) {
      this._removePlaybackTimeObserver();
    }

    this.pause();
    this._player.replaceCurrentItemWithPlayerItem(null); //de-allocates the AVPlayer
    this._playerController = null;
    this._player = null;
  }

  private _addStatusObserver(currentItem) {
    this._observerActive = true;
    currentItem.addObserverForKeyPathOptionsContext(
      this._observer,
      "status",
      0,
      null
    );
  }

  private _removeStatusObserver(currentItem) {
    this._observerActive = false;
    currentItem.removeObserverForKeyPath(this._observer, "status");
  }

  private _addPlaybackTimeObserver() {
    this._playbackTimeObserverActive = true;
    let _interval = CMTimeMake(1, 5);
    this._playbackTimeObserver = this._player.addPeriodicTimeObserverForIntervalQueueUsingBlock(
      _interval,
      null,
      currentTime => {
        let _seconds = CMTimeGetSeconds(currentTime);
        let _milliseconds = _seconds * 1000.0;
        this.notify({
          eventName: Video.currentTimeUpdatedEvent,
          object: this,
          position: _milliseconds
        });
      }
    );
  }

  private _removePlaybackTimeObserver() {
    this._playbackTimeObserverActive = false;
    this._player.removeTimeObserver(this._playbackTimeObserver);
  }

  private _autoplayCheck() {
    if (this.autoplay) {
      this.play();
    }
  }

  playbackReady() {
    this._videoLoaded = true;
    this._emit(common.Video.playbackReadyEvent);
  }

  playbackStart() {
    this._videoPlaying = true;
    this._emit(common.Video.playbackStartEvent);
  }
}

class PlayerObserverClass extends NSObject {
  observeValueForKeyPathOfObjectChangeContext(
    path: string,
    obj: Object,
    change: NSDictionary<any, any>,
    context: any
  ) {
    if (path === "status") {
      if (
        this["_owner"]._player.currentItem.status ===
          AVPlayerItemStatusReadyToPlay &&
        !this["_owner"]._videoLoaded
      ) {
        this["_owner"].playbackReady();
      }
    }
  }
}
