import { Component } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Video } from '@nstudio/nativescript-exoplayer';
import { EventData, Utils } from '@nativescript/core';
registerElement('VideoPlayer', () => Video);

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private _videoPlayer: Video;

  /**
   * On video loaded event, play.
   * This makes it so when you leave the app (i.e. go to website) then return, the video starts to play again.
   * @param args loaded event
   */
  onVideoLoaded(args: EventData) {
    console.log('Video loaded');
    this._videoPlayer = <Video>args.object;
    this.playVideo();
  }

  /**
   * Pause the video
   */
  pauseVideo() {
    this._videoPlayer.pause();
  }

  /**
   * Play the video
   */
  playVideo() {
    this._videoPlayer.play();
  }

  /**
   * Mute the video
   */
  muteVideo() {
    this._videoPlayer.mute(true);
  }

  /**
   * Unmute the video
   */
  unmuteVideo() {
    this._videoPlayer.mute(false);
  }

  /**
   * Get the video current time
   */
  getVideoCurrentTime() {
    try {
      const currentTime = this._videoPlayer.getCurrentTime();
      console.log('Current Time: ' + currentTime);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Get the total video duration
   */
  getVideoDuration() {
    const videoDuration = this._videoPlayer.getDuration();
    console.log('Video Duration: ' + videoDuration);
  }

  // opens URL in default browser
  openURL(URL: string) {
    Utils.openUrl(URL);
  }
}
