<a align="center" href="https://www.npmjs.com/package/nativescript-videoplayer">
    <h3 align="center">NativeScript VideoPlayer</h3>
</a>
<h4 align="center">A NativeScript plugin to provide the ability to play local and remote videos.</h4>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-videoplayer">
        <img src="https://img.shields.io/npm/v/nativescript-videoplayer.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/nativescript-videoplayer">
        <img src="https://img.shields.io/npm/dt/nativescript-videoplayer.svg?label=npm%20downloads" alt="npm">
    </a>
    <a href="https://github.com/bradmartin/nativescript-videoplayer/stargazers">
        <img src="https://img.shields.io/github/stars/bradmartin/nativescript-videoplayer.svg" alt="stars">
    </a>
     <a href="https://github.com/bradmartin/nativescript-videoplayer/network">
        <img src="https://img.shields.io/github/forks/bradmartin/nativescript-videoplayer.svg" alt="forks">
    </a>
    <a href="https://github.com/bradmartin/nativescript-videoplayer/blob/master/src/LICENSE.md">
        <img src="https://img.shields.io/github/license/bradmartin/nativescript-videoplayer.svg" alt="license">
    </a>
    <a href="https://paypal.me/bradwayne88">
        <img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="donate">
    </a>
    <a href="http://nstudio.io">
      <img src="./images/nstudio-banner.png" alt="nStudio banner">
    </a>
    <h5 align="center">Do you need assistance on your project or plugin? Contact the nStudio team anytime at <a href="mailto:team@nstudio.io">team@nstudio.io</a> to get up to speed with the best practices in mobile and web app development.
    </h5>
</p>

---

### Installation

From your command prompt/terminal go to your app's root folder and execute:

`tns plugin add nativescript-videoplayer`

#### Platform controls used:

| Android                                                                                       | iOS                                                                                                                               |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [Android MediaPlayer](https://developer.android.com/reference/android/media/MediaPlayer.html) | [iOS AVPlayer](https://developer.apple.com/library/prerelease/ios/documentation/AVFoundation/Reference/AVPlayer_Class/index.html) |

| Sample 1                            | Sample 2                              |
| ----------------------------------- | ------------------------------------- |
| ![Sample Usage](./images/video.gif) | ![Sample 2](./images/videoplayer.gif) |

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

```TS
// somewhere at top of your component or bootstrap file
import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
registerElement("VideoPlayer", () => Video);
// documentation: https://docs.nativescript.org/angular/plugins/angular-third-party.html#simple-elements
```

_With AngularNative you have to explicitly close all components so the correct template code is below._

```XML
  <VideoPlayer
      src="https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      autoplay="true"
      height="300"></VideoPlayer>
```

## Properties

* **src** - _required_

Set the video file to play, for best performance use local video files if possible. The file must adhere to the platforms accepted video formats. For reference check the platform specs on playing videos.

* **autoplay - (boolean)** - _optional_

Set if the video should start playing as soon as possible or to wait for user interaction.

* **finished - (function)** - _optional_

Attribute to specify an event callback to execute when the video reaches the end of its duration.

* **controls - (boolean)** - _optional_

Set to use the native video player's media playback controls.

* **muted - (boolean)** - _optional_

Mutes the native video player.

* **loop - (boolean)** - _optional_

Sets the native video player to loop once playback has finished.

* **fill - (boolean)** - _optional_ **ANDROID ONLY**

If set to true, the aspect ratio of the video will not be honored and it will fill the entire space available.

* **playbackReady - (function)** - _optional_

Attribute to specify an event callback to execute when the video is ready to play.

* **seekToTimeComplete - (function)** - _optional_

Attribute to specify an event callback to execute when the video has finished seekToTime.

* **observeCurrentTime - (boolean)** - _optional_

If set to true, currentTimeUpdated callback is possible.

* **currentTimeUpdated - (function)** - _optional_

Attribute to specify an event callback to execute when the time is updated.

* **headers - (Map<string, string>)** - _optional_

Set headers to add when loading a video from URL.

## API

* **play()** - Start playing the video
* **pause()** - Pause the video
* **seekToTime(time: number)** - Seek the video to a time (milliseconds)
* **getCurrentTime()** - Returns the current time in the video duration (milliseconds)
* **getDuration()** - Returns the duration of the video (milliseconds)
* **destroy()** - Destroy the video player and free resources
* **mute(boolean)** - Mute the current video
* **setVolume()** - Set the volume - Must be between 0 and 1.

### Android only

* **stop()** - Stop the playback - this resets the player and remove the video src

## Observable Properties

* **currentTime()** - Current time of video.

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

* Alex Ziskind [@digitalix](https://twitter.com/digitalix)
* Nathanael Anderson [@CongoCart](https://twitter.com/CongoCart)
* Blake Nussey
