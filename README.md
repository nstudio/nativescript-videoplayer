# NativeScript Video Player :clapper:
A NativeScript plugin to provide an XML widget for playing videos.

#### [Android VideoView](http://developer.android.com/intl/zh-tw/reference/android/widget/VideoView.html)
#### [iOS AVPlayer](https://developer.apple.com/library/prerelease/ios/documentation/AVFoundation/Reference/AVPlayer_Class/index.html)

## Installation
`npm install nativescript-videoplayer`

## Usage

###
```XML
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:VideoPlayer="videoplayer">
        <StackLayout>
            <VideoPlayer:Video id="customVideoPlayer" 
            loaded="videoplayerLoaded" 
            finished="videoFinished" 
            autoplay="true" 
            height="300" 
            src="https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />
        </StackLayout>
</Page>
```

## Attributes
**src** *required*

Attribute to specify the video file to play, can either be a remote file or local video file. 
The file must adhere to the platforms accepted video formats. For reference check the platform specs on playing videos.

**autoplay** *optional*

Attribute to set if the video should start playing as soon as possible or to wait for user interaction.

**finished** *optional*

Attribute to specify an event callback to execute once the video reaches the end of its duration.

