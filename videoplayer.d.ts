import { View } from "ui/core/view";
export declare class Video extends View {
  android: any;
  ios: any;
  src: string; /// video source file
  loop: boolean; /// whether the video loops the playback after extends
  autoplay: boolean; /// set true for the video to start playing when ready
  controls: boolean; /// set true to enable the media player's playback controls
  _emit: any;

  /**
     * Start playing the video.
     */
  play(): void;

  /**
     * Pause the currently playing video.
     */
  pause(): void;

  /**
     * Seek the video to a time.
     * @param {number} time - Time of the video to seek to in milliseconds.
     */
  seekToTime(time: number): void;

  /**
     * Returns the current time of the video duration in milliseconds.
     * @returns {number} Current time of the video duration.
     */
  getCurrentTime(): number;

  /**
     * Boolean to determine if observable for current time is registered.
     * @param {boolean} observeCurrentTime - True to set observable on current time.
    */
  observeCurrentTime(observeCurrentTime: boolean): void;

  /**
     * Observable for current time of the video duration in milliseconds.
     * @returns {number} Current time of the video duration.
    */
  currentTime(): number;

  /**
     * Set the volume of the video
     * @param {number} volume - Volume to set the video between 0 and 1
     */
  setVolume(volume: number): void;

  /**
     * Destroy the video player and free up resources.
     */
  destroy(): void;

  /**
     * Mute and unmute the video.
     * @param {boolean} mute - true to mute the video, false to unmute.
     */
  mute(mute: boolean): void;

  /**
     * Returns the duration of the video in milliseconds.
     * @returns {number} Video duration in milliseconds.
     */
  getDuration(): number;

  /**
     * *** ANDROID ONLY ***
     * Stop playback of the video. This resets the player and video src.
     */
  stop(): void;

  /**
     * *** IOS ONLY ***
     * Update the video player with an AVAsset file.
     */
  updateAsset(asset): void;

  /**
     * Callback to execute when the video is ready to play
     * @param {function} callback - The callback function to execute.
     */
  playbackReady(callback: Function): void;

  /**
     * *** IOS ONLY ***
     * Callback to execute when the video is playing.
     * @param {function} callback - The callback function to execute.
    */
  playbackStart(callback: Function): void;

  /**
     * Callback to execute when the video has finished seekToTime.
     * @param {function} callback - The callback function to execute.
    */
  seekToTimeComplete(callback: Function): void;

  /**
    * Callback to execute when the time is updated.
    * @param {function} callback - The callback function to execute.
    */
  currentTimeUpdated(callback: Function): void;
}
