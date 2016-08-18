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

  constructor(mainpage: Page) {
    super();

    this._videoPlayer = <Video>mainpage.getViewById('nativeVideoPlayer');
    this.currentTime = '';
    this.videoDuration = '';
    this.getVideoDuration();
    // this.trackVideoCurrentPosition();
  }

  /**
   * Video Finished callback
   */
  public videoFinished(args) {
    console.log('video finished event executed');
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
    this.set('videoDuration', this._videoPlayer.getDuration());
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
      this._videoPlayer.seekToTime(3000);
    } catch (err) {
      console.log(err);
    }
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
    // if (isAndroid) {
    let trackInterval = setInterval(() => {
      var x = this._videoPlayer.getCurrentTime();
      this.set('currentTime', x);
    }, 200);
    return trackInterval;
    // }

  }


}