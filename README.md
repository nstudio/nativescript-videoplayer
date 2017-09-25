[![npm](https://img.shields.io/npm/v/nativescript-videoplayer.svg)](https://www.npmjs.com/package/nativescript-videoplayer)
[![npm](https://img.shields.io/npm/dt/nativescript-videoplayer.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-videoplayer)

# NativeScript Video Player :clapper:
A NativeScript plugin to provide the ability to play local and remote videos.

#### Platform controls used: 
Android | iOS
---------- | -----------
[Android MediaPlayer](https://developer.android.com/reference/android/media/MediaPlayer.html) |  [iOS AVPlayer](https://developer.apple.com/library/prerelease/ios/documentation/AVFoundation/Reference/AVPlayer_Class/index.html)


## Sample Usage

                Sample 1             |              Sample 2
-------------------------------------| -------------------------------------
![Sample Usage](./screens/video.gif) | ![Sample 2](./screens/videoplayer.gif)


## Installation
From your command prompt/terminal go to your app's root folder and execute:

`tns plugin add nativescript-videoplayer`

## Usage

###
```XML
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:VideoPlayer="nativescript-videoplayer">
        <StackLayout>
               
            <VideoPlayer:Video id="nativeVideoPlayer"
            controls="true" finished="{{ videoFinished }}"
            loop="true" autoplay="false" height="280" 
            src="~/videos/big_buck_bunny.mp4" />

            <!-- Remote file to test with https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4 -->
            
        </StackLayout>
</Page>
```

## Angular Native (NativeScript Angular) Usage
``` TS
// somewhere at top of your component or bootstrap file
import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);
// documentation: https://docs.nativescript.org/angular/plugins/angular-third-party.html#simple-elements
```
 *With AngularNative you have to explicitly close all components so the correct template code is below.*
``` XML
  <VideoPlayer
      src="https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      autoplay="true" 
      height="300"></VideoPlayer>
```

## Properties
- **src** - *required*

Set the video file to play, for best performance use local video files if possible. The file must adhere to the platforms accepted video formats. For reference check the platform specs on playing videos.

- **autoplay - (boolean)** - *optional*

Set if the video should start playing as soon as possible or to wait for user interaction.

- **finished - (function)** - *optional*

Attribute to specify an event callback to execute when the video reaches the end of its duration.

- **controls - (boolean)** - *optional*

Set to use the native video player's media playback controls.

- **muted - (boolean)** - *optional*

Mutes the native video player.

- **loop - (boolean)** - *optional*

Sets the native video player to loop once playback has finished.

- **fill - (boolean)** - *optional*  **ANDROID ONLY**

If set to true, the aspect ratio of the video will not be honored and it will fill the entire space available.

- **playbackReady - (function)** - *optional*

Attribute to specify an event callback to execute when the video is ready to play.

- **seekToTimeComplete - (function)** - *optional*

Attribute to specify an event callback to execute when the video has finished seekToTime.

- **observeCurrentTime - (boolean)** - *optional*

If set to true, currentTimeUpdated callback is possible.

- **currentTimeUpdated - (function)** - *optional*

Attribute to specify an event callback to execute when the time is updated.

- **headers - (Map<string, string>)** - *optional*

Set headers to add when loading a video from URL.


## API

- **play()** - Start playing the video
- **pause()** - Pause the video
- **seekToTime(time: number)** - Seek the video to a time (milliseconds)
- **getCurrentTime()** - Returns the current time in the video duration (milliseconds)
- **getDuration()** - Returns the duration of the video (milliseconds)
- **destroy()** - Destroy the video player and free resources
- **mute(boolean)** - Mute the current video
- **setVolume()** - Set the volume - Must be between 0 and 1.

### Android only

- **stop()** - Stop the playback - this resets the player and remove the video src

## Observable Properties

- **currentTime()** - Current time of video.

## iOS Logging

When running the iOS Simulator, after playing a video the iOS system may write
log messages to the console every few seconds of the form
```
[aqme] 254: AQDefaultDevice (173): skipping input stream 0 0 0x0
```
They will continue being logged even after the video has been properly destroyed.
These messages can be safely ignored. To turn them off completely, run the following
command in your shell before running `tns run ios`:
```
export SIMCTL_CHILD_OS_ACTIVITY_MODE="disable"
```

### Contributors

- Alex Ziskind [@digitalix](https://twitter.com/digitalix)
- Nathanael Anderson [@CongoCart](https://twitter.com/CongoCart)
- Blake Nussey
