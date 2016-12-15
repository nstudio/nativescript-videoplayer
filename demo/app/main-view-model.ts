import { Observable } from 'data/observable';
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { isAndroid, isIOS } from 'platform';
import { topmost } from 'ui/frame';
import { setInterval } from "timer";
import { Video } from 'nativescript-videoplayer';

export class HelloWorldModel extends Observable {
  public videoSrc: string;
  public currentTime: any;
  public videoDuration: any;
  private _videoPlayer: Video;
  private completed: boolean;

  constructor(mainpage: Page) {
    super();

    this.completed = false;
    this._videoPlayer = <Video>mainpage.getViewById('nativeVideoPlayer');
    this.currentTime = '';
    this.videoDuration = '';
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
    console.log("Animation");

    const enums = require("ui/enums");
    this._videoPlayer.animate({
      rotate: 360,
      duration: 3000,
      curve: enums.AnimationCurve.spring
    }).then( () => {
      return this._videoPlayer.animate({
        rotate: 0,
        duration: 3000,
        curve: enums.AnimationCurve.spring
      });
    }).then( () => {
        return this._videoPlayer.animate({
           scale: {x: .5, y: .5},
           duration: 1000,
           curve: enums.AnimationCurve.spring
         });

    }).then( () => {
          return this._videoPlayer.animate({
            scale: {x: 1.5, y: 1.5},
            duration: 3000,
            curve: enums.AnimationCurve.spring
          });
    }).then( () => {
      return this._videoPlayer.animate({
        scale: {x: 1.0, y: 1.0},
        duration: 3000,
        curve: enums.AnimationCurve.spring
      });

    });

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



  // /**
  //  * Change the video src property
  //  */
  // public changeVideoSource() {
  //   if (this.videoSrc === '~/videos/big_buck_bunny.mp4') {
  //     this._videoPlayer.src = 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
  //     this.set('videoSrc', 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4')
  //   } else {
  //     this._videoPlayer.src = '~/videos/big_buck_bunny.mp4';
  //     this.set('videoSrc', '~/videos/big_buck_bunny.mp4')
  //   }
  // }



  private trackVideoCurrentPosition(): number {
    let trackInterval = setInterval(() => {
      let x,y;
      if (this.completed) {
        x = "";
        y = "";
      } else {
        x = this._videoPlayer.getCurrentTime();
        y = this._videoPlayer.getDuration();
      }
      this.set('currentTime', x);
      this.set('videoDuration', y);
    }, 200);
    return trackInterval;

  }


}