/**
 * Contains the VideoPlayer class, which represents a standard video player widget.
 */

declare module "videoplayer" {
    import dependencyObservable = require("ui/core/dependency-observable");
    import videoSource = require("video-source");
    import view = require("ui/core/view");

    /**
     * Represents a Video Player component.
     */
    export class Video extends view.View {
        public static srcProperty: dependencyObservable.Property;
        public static videoSourceProperty: dependencyObservable.Property;
        public static isLoadingProperty: dependencyObservable.Property;
        
        /**
         * Dependency property used to support binding operations for the autoplay of the current video instance.
         */
        public static autoplayProperty: dependencyObservable.Property;        
        
        /**
         * String value used when hooking to finished event.
         */
        public static finishedEvent: string;

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
        
        /*
        * Gets or sets the video source of the video.
        */

        videoSource: videoSource.VideoSource;

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
        // finishedCallback: Function;
        
        /**
         * Raised when a tap event occurs.
         */
        on(event: "finished", callback: (args: observable.EventData) => void, thisArg?: any);

    }

    /**
    * Provides common options for creating a video
    */
    export interface Options extends view.Options {
        
        /*
        * Gets or set the video source of the video.
        */
        videoSource: videoSource.VideoSource;
        
        /**
         * Gets or sets the URL of the video
         */
        src: string;

        /**
        * Gets or set the autoplay attribute
        */
        autoplay: boolean;

        /*
        * Gets or sets the finished callback that executes when the video reaches its end.
        */
        finished: string;
    }

}