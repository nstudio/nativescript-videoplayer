/**
 * Contains the VideoPlayer class, which represents a standard video player widget.
 */

declare module "videoplayer" {
    import {Observable} from "data/observable";// = require("data/observable");
    import {DependencyObservable,Property} from "ui/core/dependency-observable";
    import {View, Options as Opts} from "ui/core/view";
    import {VideoSource} from "video-source";

    /**
     * Represents a Video Player component.
     */
    export class Video extends View {
        public static srcProperty: Property;
        public static isLoadingProperty: Property;
        public static autoplayProperty: Property;
        public static finishedCallbackProperty: Property;

        /**
         * Gets the native [android widget](http://developer.android.com/reference/android/widget/VideoView.html) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* android.widget.VideoView */;

        /**
         * Gets the native [AVPlayerViewController](https://developer.apple.com/library/ios/documentation/AVFoundation/Reference/AVPlayerViewController_Class/) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: any /* AVPlayerViewController */;

        /**
         * Gets or sets the source of the Video. This can be either an URL string or a native video file.
         */
        src: any;

        videoSource: VideoSource;

        /**
        * Gets or set the autoplay attribute
        */
        autoplay: boolean;

       /**
        * Gets a value indicating if the image is currently loading
        */
        isLoading: boolean;

        /*
        * Gets or sets the finished callback that executes when the video reaches its end.
        */
        finishedCallback: Function;

    }

    /**
    * Provides common options for creating a video
    */
    export interface Options extends Opts {
        /**
         * Gets or sets the video source
         */
        src: string;

        /**
        * Gets or set the autoplay attribute
        */
        autoplay: boolean;

        /*
        * Gets or sets the finished callback that executes when the video reaches its end.
        */
        finishedCallback: Function;
    }

}