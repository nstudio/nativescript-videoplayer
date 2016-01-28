/**
 * Contains the VideoPlayer class, which represents a standard video player widget.
 */

declare module "videoplayer" {
    import observable = require("data/observable");
    import dependencyObservable = require("ui/core/dependency-observable");
    import view = require("ui/core/view");

    /**
     * Represents a Video Player component.
     */
    export class Video extends view.View {
        public static srcProperty: dependencyObservable.Property;
        public static isLoadingProperty: dependencyObservable.Property;
        public static autoplayProperty: dependencyObservable.Property;    

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

        /**
        * Gets or set the autoplay attribute
        */
        autoplay: boolean;

       /**
        * Gets a value indicating if the image is currently loading
        */
        isLoading: boolean;

    }

    /**
    * Provides common options for creating a video
    */
    export interface Options extends view.Options {
        /**
         * Gets or sets the video source
         */
        src: string;

        /**
        * Gets or set the autoplay attribute
        */
        autoplay: boolean;
    }

}