import { Observable } from 'data/observable';
import { EventData } from 'data/observable';
import { setInterval } from "timer";
import { Video } from 'nativescript-videoplayer';

export class HelloWorldModel extends Observable {
  public videoSrc: string;
  public currentTime: any;
  public videoDuration: any;
  private _videoPlayer: Video;

  constructor(videoPlayer: Video) {
    super();

    this._videoPlayer = videoPlayer;
    this.currentTime = '';
    this.videoDuration = '';
    this.trackVideoCurrentPosition();
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
    this._videoPlayer.stop();
  }


  /**
   * Get the video duration
   */
  public getVideoDuration() {
    let videoDuration = this._videoPlayer.getDuration();
    console.log('Video Duration: ' + videoDuration);
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
      this.set('currentTime', this._videoPlayer.getCurrentTime());
    }, 100);
    return trackInterval;
  }


}