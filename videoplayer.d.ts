import { View } from 'ui/core/view';
export declare class Video extends View {

    android: any;
    ios: any;
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
     * Destroy the video player and free up resources.
     */
    destroy(): void;


    /**
     * Mute and unmute the video.
     * @param {boolean} mute - true to mute the video, false to unmute.
     */
    mute(mute: boolean): void;


    /**
     * *** ANDROID ONLY ***
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
     * *** ANDROID ONLY ***
     * Callback to execute when the video has finished loading.
     * @param {function} callback - The callback function to execute.
     */
    loadingComplete(callback: Function): void;

}