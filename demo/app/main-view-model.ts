import { Video } from 'nativescript-videoplayer';
import { Observable } from 'tns-core-modules/data/observable';
import { isAndroid } from 'tns-core-modules/platform';
import { setInterval } from 'tns-core-modules/timer';
import { topmost } from 'tns-core-modules/ui/frame';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { Page } from 'tns-core-modules/ui/page';
import { Prop } from './prop';

export class HelloWorldModel extends Observable {
  @Prop() videoSrc: string;
  @Prop() currentTime: any;
  @Prop() videoDuration: any;
  private _videoPlayer: Video;
  private completed: boolean;

  constructor(mainpage: Page) {
    super();

    this.completed = false;
    this._videoPlayer = <Video>mainpage.getViewById('nativeVideoPlayer');
    this._videoPlayer.debug = true;

    // event listener setup for Video
    this._videoPlayer.on(Video.finishedEvent, args => {
      console.log('Video.finishedEvent executed');
    });
    this._videoPlayer.on(Video.errorEvent, args => {
      console.log('Video.errorEvent executed');
    });
    this._videoPlayer.on(Video.playbackReadyEvent, args => {
      console.log('Video.playbackReadyEvent executed');
    });
    this._videoPlayer.on(Video.playbackStartEvent, args => {
      console.log('Video.playbackStartEvent executed');
    });
    this._videoPlayer.on(Video.seekToTimeCompleteEvent, args => {
      console.log('Video.seekToTimeCompleteEvent executed');
    });

    this._videoPlayer.on(Video.pausedEvent, args => {
      console.log('Video.pausedEvent');
    });

    this._videoPlayer.on(Video.mutedEvent, args => {
      console.log('Video.mutedEvent');
    });

    this._videoPlayer.on(Video.unmutedEvent, args => {
      console.log('Video.unmutedEvent');
    });

    this.currentTime = '';
    this.videoDuration = '';
    this.videoSrc = '~/videos/small.mp4';
    this.trackVideoCurrentPosition();
  }

  /**
   * Video Finished callback
   */
  public videoFinished(args) {
    this.completed = true;
  }

  /**
   * Pause the video
   */
  public pauseVideo() {
    this._videoPlayer.pause();
  }

  /**
   * Play the video
   */
  public playVideo() {
    this._videoPlayer.play();
    this.completed = false;
  }

  /**
   * Stop the video player
   */
  public stopVideo() {
    if (isAndroid) {
      this._videoPlayer.stop();
    }
  }

  /**
   * Get the video duration
   */
  public getVideoDuration() {
    let videoDuration = this._videoPlayer.getDuration();
    console.log('Video Duration: ' + videoDuration);
    this.set('videoDuration', videoDuration);
  }

  /**
   * Go to 30 seconds
   */
  public goToTime() {
    try {
      this._videoPlayer.seekToTime(30000);
    } catch (err) {
      console.log(err);
    }
  }

  public animate() {
    console.log('Animation');

    const enums = require('tns-core-modules/ui/enums');
    this._videoPlayer
      .animate({
        rotate: 360,
        duration: 3000,
        curve: enums.AnimationCurve.spring
      })
      .then(() => {
        return this._videoPlayer.animate({
          rotate: 0,
          duration: 3000,
          curve: enums.AnimationCurve.spring
        });
      })
      .then(() => {
        return this._videoPlayer.animate({
          scale: { x: 0.5, y: 0.5 },
          duration: 1000,
          curve: enums.AnimationCurve.spring
        });
      })
      .then(() => {
        return this._videoPlayer.animate({
          scale: { x: 1.5, y: 1.5 },
          duration: 3000,
          curve: enums.AnimationCurve.spring
        });
      })
      .then(() => {
        return this._videoPlayer.animate({
          scale: { x: 1.0, y: 1.0 },
          duration: 3000,
          curve: enums.AnimationCurve.spring
        });
      });
  }

  public createVideoPlayer() {
    const video = new Video();
    video.height = 200;
    video.width = 175;
    video.src = 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    video.controls = false;
    video.autoplay = true;
    const stack = topmost().getViewById('emptyStack') as StackLayout;
    stack.addChild(video);
  }

  public muteVideo() {
    this._videoPlayer.mute(true);
  }

  public unmuteVideo() {
    this._videoPlayer.mute(false);
  }

  /**
   * Get the video current time
   */
  public getVideoCurrentTime() {
    try {
      let currentTime = this._videoPlayer.getCurrentTime();
      console.log('Current Time: ' + currentTime);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Change the video src property
   */
  public changeVideoSource() {
    if (this.videoSrc === '~/videos/small.mp4') {
      this._videoPlayer.src = 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    } else {
      this._videoPlayer.src = '~/videos/small.mp4';
    }
  }

  private trackVideoCurrentPosition(): number {
    let trackInterval = setInterval(() => {
      let x, y;
      if (this.completed) {
        x = '';
        y = '';
      } else {
        x = this._videoPlayer.getCurrentTime();
        y = this._videoPlayer.getDuration();
      }
      this.currentTime = x;
      this.videoDuration = y;
    }, 200);
    return trackInterval;
  }
}
