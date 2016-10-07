/**
 * Contains the VideoSource class, which encapsulates the common abstraction behind a platform specific object that is used as a source for videos.
 */
// declare module "video-source" {

/**
 * Encapsulates the common abstraction behind a platform specific object that is used as a source for videos.
 */
export class VideoSource {


    /**
    * Gets the height of this instance. This is a read-only property.
    */
    height: number;

    /**
     * Gets the width of this instance. This is a read-only property.
     */
    width: number;

    /**
     * The iOS-specific [AVPlayer](https://developer.apple.com/library/prerelease/ios/documentation/AVFoundation/Reference/AVPlayer_Class/index.html) instance. Will be undefined when running on Android.
     */
    ios: any /* AVPlayer */;

    /**
     * The Android-specific [VideoView](http://developer.android.com/intl/zh-tw/reference/android/widget/VideoView.html) instance. Will be undefined when running on iOS.
     */
    android: any /* android.widget.VideoView */;

    /**
     * Loads this instance from the specified resource name.
     * @param name The name of the resource (without its extension).
     */
    loadFromResource(name: string): boolean;

    /**
     * Loads this instance from the specified file.
     * @param path The location of the file on the file system.
     */
    loadFromFile(path: string): boolean;

    /*
    * Loads this instance from the specified url.
    * @param url location of the video file
    */
    loadFromUrl(url: string): boolean;

    /**
     * Sets the provided native source object.
     * This will update either the android or ios properties, depending on the target os.
     * @param source The native image object. Will be either a Bitmap for Android or a UIImage for iOS.
     */
    setNativeSource(source: any): boolean;
}

/**
 * Creates a new ImageSource instance and loads it from the specified resource name.
 * @param name The name of the resource (without its extension).
 */
export function fromResource(name: string): VideoSource;

/**
 * Creates a new ImageSource instance and loads it from the specified file.
 * @param path The location of the file on the file system.
 */
export function fromFile(path: string): VideoSource;


/**
 * Creates a new ImageSource instance and sets the provided native source object (typically a Bitmap).
 * The native source object will update either the android or ios properties, depending on the target os.
 * @param source The native image object. Will be either a Bitmap for Android or a UIImage for iOS.
 */
export function fromNativeSource(source: any): VideoSource;

/**
 * Downloads the video from the provided Url and creates a new VideoSource instance from it.
 * @param url The link to the remote video file. This operation will download the video.
 */
export function fromUrl(url: string): VideoSource;

/**
 * Creates a new ImageSource instance and loads it from the specified local file or resource(if spexified with "res://" prefix)
 * @param path The location of the file on the file system.
 */
export function fromFileOrResource(path: string): VideoSource;

/**
 * [Obsolete. Please use utils.isFileOrResourcePath instead!] Returns true if the specified path points to a resource or local file.
 * @param path The path.
 */
export function isFileOrResourcePath(path: string): boolean
// }
