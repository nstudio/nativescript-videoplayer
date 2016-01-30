/**
 * Contains the VideoSource class, which encapsulates the common abstraction behind a platform specific object (typically a Bitmap) that is used as a source for images.
 */
declare module "video-source" {

    /**
     * Encapsulates the common abstraction behind a platform specific object (typically a Bitmap) that is used as a source for images.
     */
    export class VideoSource {

       /**
        * The iOS-specific [UIImage](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/) instance. Will be undefined when running on Android.
        */
        ios: any /* AVPlayer */;

       /**
        * The Android-specific [image](http://developer.android.com/reference/android/graphics/Bitmap.html) instance. Will be undefined when running on iOS.
        */
        android: any /* android.graphics.Bitmap */;

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

       /**
        * Sets the provided native source object (typically a Bitmap).
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
    * Downloads the image from the provided Url and creates a new ImageSource instance from it.
    * @param url The link to the remote image object. This operation will download and decode the image.
    */
    //export function fromUrl(url: string): Promise<VideoSource>;

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
}
