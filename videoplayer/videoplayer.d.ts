/**
 * Contains the VideoPlayer class, which represents a standard videoplayer widget.
 */
declare module "ui/videoplayer" {
    import observable = require("data/observable");
    import dependencyObservable = require("ui/core/dependency-observable");
    import view = require("ui/core/view");

    /**
     * Represents a standard Button widget.
     */
    export class VideoPlayer extends view.View {
        /**
         * Represents the observable property backing the text property of each Button instance.
         */
        public static videoProperty: dependencyObservable.Property;        

        /**
         * Gets the native [android widget](http://developer.android.com/reference/android/widget/VideoView.html) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* android.widget.VideoView */;

        /**
         * Gets the native [AVPlayerViewController](https://developer.apple.com/library/ios/documentation/AVFoundation/Reference/AVPlayerViewController_Class/) that represents the user interface for this component. Valid only when running on iOS.
         */
        ios: any /* AVPlayerViewController */;

        /**
         * Gets or sets the video path displayed by this instance.
         */
        video: string;

        /**
         * A basic method signature to hook an event listener (shortcut alias to the addEventListener method).
         * @param eventNames - String corresponding to events (e.g. "propertyChange"). Optionally could be used more events separated by `,` (e.g. "propertyChange", "change"). 
         * @param callback - Callback function which will be executed when event is raised.
         * @param thisArg - An optional parameter which will be used as `this` context for callback execution.
         */
        on(eventNames: string, callback: (data: observable.EventData) => void, thisArg?: any);

    }
    
    
    /**
    * Provides common options for creating an videoplayer.
    */
    export interface Options extends view.Options {
        /**
        * Gets or sets the path of the video.
        */
        video: string;
    }
}