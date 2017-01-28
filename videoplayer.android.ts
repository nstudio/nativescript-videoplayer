import videoCommon = require("./videoplayer-common");
import videoSource = require("./video-source/video-source");
import dependencyObservable = require("ui/core/dependency-observable");
import fs = require("file-system");
import proxy = require("ui/core/proxy");
import view = require("ui/core/view");
import utils = require("utils/utils");
import timer = require("timer");

global.moduleMerge(videoCommon, exports);

function onVideoSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    let video = <Video>data.object;
    if (!video.android) {
        return;
    }

    video._setNativeVideo(data.newValue ? data.newValue.android : null);
}

// register the setNativeValue callback
(<proxy.PropertyMetadata>videoCommon.Video.videoSourceProperty.metadata).onSetNativeValue = onVideoSourcePropertyChanged;

declare const android: any, java: any;

const STATE_IDLE = 0;
const STATE_PLAYING = 1;
const STATE_PAUSED = 2;

const SURFACE_WAITING = 0;
const SURFACE_READY = 1;



export class Video extends videoCommon.Video {
    private _android: any; /// android.widget.VideoView
    private videoWidth;
    private videoHeight;
    private _src;
    private playState;
    private mediaState;
    private textureSurface;
    private mediaPlayer;
    private audioSession;
    private mediaController;
    private preSeekTime;
    private currentBufferPercentage;
    private _playbackTimeObserver;
    private _playbackTimeObserverActive: boolean;

    constructor() {
        super();
        this._android = null;
        this.videoWidth = 0;
        this.videoHeight = 0;

        this._src = null;

        this.playState = STATE_IDLE;
        this.mediaState = SURFACE_WAITING;
        this.textureSurface = null;
        this.mediaPlayer = null;
        this.audioSession = null;
        this.mediaController = null;
        this.preSeekTime = -1;
        this.currentBufferPercentage = 0;
    }

    get android(): any {
        return this._android;
    }

    public _createUI(): void {
        let that = new WeakRef(this);

        this._android = new android.view.TextureView(this._context);
        this._android.setFocusable(true);
        this._android.setFocusableInTouchMode(true);
        this._android.requestFocus();
        this._android.setOnTouchListener(new android.view.View.OnTouchListener({
            get owner(): Video {
                return that.get();
            },
            onTouch: function (/* view, event */) {
                this.owner.toggleMediaControllerVisibility();
                return false;
            }
        }));

        this._android.setSurfaceTextureListener(new android.view.TextureView.SurfaceTextureListener(
            {
                get owner(): Video {
                    return that.get();
                },
                onSurfaceTextureSizeChanged: function (surface, width, height) {
                    console.log("SurfaceTexutureSizeChange", width, height);
                    // do nothing
                },

                onSurfaceTextureAvailable: function (surface /*, width, height */) {
                    this.owner.textureSurface = new android.view.Surface(surface);
                    this.owner.mediaState = SURFACE_WAITING;
                    this.owner._openVideo();
                },

                onSurfaceTextureDestroyed: function (/* surface */) {
                    // after we return from this we can't use the surface any more
                    if (this.owner.textureSurface !== null) {
                        this.owner.textureSurface.release();
                        this.owner.textureSurface = null;
                    }
                    if (this.owner.mediaController !== null) {
                        this.owner.mediaController.hide();
                    }
                    this.owner.release();

                    return true;
                },

                onSurfaceTextureUpdated: function (/* surface */) {
                    // do nothing
                }
            }
        ));
    }

    public toggleMediaControllerVisibility(): void {
        if (!this.mediaController) { return; }
        if (this.mediaController.isShowing()) {
            this.mediaController.hide();
        } else {
            this.mediaController.show();
        }
    }

    private _setupMediaPlayerListeners(): void {
        let that = new WeakRef(this);
        this.mediaPlayer.setOnPreparedListener(new android.media.MediaPlayer.OnPreparedListener({
            get owner(): Video {
                return that.get();
            },
            onPrepared: function (mp) {
                if (this.owner) {
                    if (this.owner.muted === true) {
                        mp.setVolume(0, 0);
                    }

                    if (this.owner.mediaController != null) {
                        this.owner.mediaController.setEnabled(true);
                    }

                    if (this.owner.preSeekTime > 0) {
                        mp.seekTo(this.owner.preSeekTime);
                    }
                    this.owner.preSeekTime = -1;

                    this.owner.videoWidth = mp.getVideoWidth();
                    this.owner.videoHeight = mp.getVideoHeight();

                    this.owner.mediaState = SURFACE_READY;

                    if (this.owner.fill !== true) {
                        this.owner._setupAspectRatio();
                    }

                    if (this.owner.videoWidth !== 0 && this.owner.videoHeight !== 0) {
                        this.owner.android.getSurfaceTexture().setDefaultBufferSize(this.owner.videoWidth, this.owner.videoHeight);
                    }

                    if (this.owner.autoplay === true || this.owner.playState === STATE_PLAYING) {
                        this.owner.play();
                    }

                    if (this.owner.observeCurrentTime && !this.owner._playbackTimeObserverActive) {
                        this._addPlaybackTimeObserver();
                    }


                    this.owner._emit(videoCommon.Video.playbackReadyEvent);
                    if (this.owner.loop === true) {
                        mp.setLooping(true);
                    }
                }
            }
        }));

        this.mediaPlayer.setOnSeekCompleteListener(new android.media.MediaPlayer.OnSeekCompleteListener({
            get owner(): Video {
                return that.get();
            },
            onSeekComplete: function (/* mediaPlayer */) {
                if (this.owner) {
                    this.owner._emit(videoCommon.Video.seekToTimeCompleteEvent);
                }
            }
        }));

        this.mediaPlayer.setOnVideoSizeChangedListener(new android.media.MediaPlayer.OnVideoSizeChangedListener({
            get owner(): Video {
                return that.get();
            },
            onVideoSizeChanged: function (mediaPlayer /*, width, height */) {
                if (this.owner) {
                    this.owner.videoWidth = mediaPlayer.getVideoWidth();
                    this.owner.videoHeight = mediaPlayer.getVideoHeight();
                    if (this.owner.videoWidth !== 0 && this.owner.videoHeight !== 0) {
                        this.owner._android.getSurfaceTexture().setDefaultBufferSize(this.owner.videoWidth, this.owner.videoHeight);
                        if (this.owner.fill !== true) {
                            this.owner._setupAspectRatio();
                        }
                    }
                }
            }
        }));

        this.mediaPlayer.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({
            get owner(): Video {
                return that.get();
            },
            onCompletion: function (/* mp */) {
                if (this.owner) {
                    this.owner._emit(videoCommon.Video.finishedEvent);
                }
            }
        }));

        this.mediaPlayer.setOnBufferingUpdateListener(new android.media.MediaPlayer.OnBufferingUpdateListener({
            get owner(): Video {
                return that.get();
            },
            onBufferingUpdate: function (mediaPlayer, percent) {
                this.owner.currentBufferPercentage = percent;
            }
        }));
        this.currentBufferPercentage = 0;
    }

    private _setupMediaController(): void {
        let that = new WeakRef(this);
        if (this.controls !== false || this.controls === undefined) {
            if (this.mediaController == null) {
                this.mediaController = new android.widget.MediaController(this._context);
            } else {
                // Already setup
                return;
            }
            let mediaPlayerControl = new android.widget.MediaController.MediaPlayerControl({
                get owner(): Video {
                    return that.get();
                },
                canPause: function () {
                    return true;
                },
                canSeekBackward: function () {
                    return true;
                },
                canSeekForward: function () {
                    return true;
                },
                getAudioSessionId: function () {
                    return this.owner.audioSession;
                },
                getBufferPercentage: function () {
                    return this.owner.currentBufferPercentage;
                },
                getCurrentPosition: function () {
                    return this.owner.getCurrentTime();
                },
                getDuration: function () {
                    return this.owner.getDuration();
                },
                isPlaying: function () {
                    return this.owner.isPlaying();
                },
                pause: function () {
                    this.owner.pause();
                },
                seekTo: function (v) {
                    this.owner.seekToTime(v);
                },
                start: function () {
                    this.owner.play();
                }
            });

            this.mediaController.setMediaPlayer(mediaPlayerControl);
            this.mediaController.setAnchorView(this._android);
            this.mediaController.setEnabled(true);
        }
    }

    private _setupAspectRatio(): void {

        /* console.log("!!!!Sizes are", this. videoHeight, "x", this. videoWidth);
         console.log("!!!!CSizes are", this.height, "x", this.width);
         console.dump(this._getCurrentLayoutBounds()); */

        let viewWidth = this._android.getWidth();
        let viewHeight = this._android.getHeight();
        let aspectRatio = this.videoHeight / this.videoWidth;
        //console.log("W/H", viewHeight, "x", viewWidth, "x", aspectRatio);


        let newWidth, newHeight;
        if (viewHeight > (viewWidth * aspectRatio)) {
            // limited by narrow width; restrict height
            newWidth = viewWidth;
            newHeight = (viewWidth * aspectRatio);
        } else {
            // limited by short height; restrict width
            newWidth = (viewHeight / aspectRatio);
            newHeight = viewHeight;
        }

        let xoff = (viewWidth - newWidth) / 2;
        let yoff = (viewHeight - newHeight) / 2;

        let txform = new android.graphics.Matrix();
        this._android.getTransform(txform);
        txform.setScale(newWidth / viewWidth, newHeight / viewHeight);
        txform.postTranslate(xoff, yoff);
        this._android.setTransform(txform);

    }

    private _openVideo(): void {
        if (this._src === null || this.textureSurface === null) {
            // We have to protect In case something else calls this before we are ready
            // The Surface event will then call this when we are ready...
            return;
        }
        console.log("Openvideo", this._src);

        // Clear any old stuff
        this.release();

        let am = utils.ad.getApplicationContext().getSystemService(android.content.Context.AUDIO_SERVICE);
        am.requestAudioFocus(null, android.media.AudioManager.STREAM_MUSIC, android.media.AudioManager.AUDIOFOCUS_GAIN);

        try {
            this.mediaPlayer = new android.media.MediaPlayer();

            if (this.audioSession !== null) {
                this.mediaPlayer.setAudioSessionId(this.audioSession);
            } else {
                this.audioSession = this.mediaPlayer.getAudioSessionId();
            }

            this._setupMediaPlayerListeners();

            this.mediaPlayer.setDataSource(/* utils.ad.getApplicationContext(),*/ this._src);
            this.mediaPlayer.setSurface(this.textureSurface);
            this.mediaPlayer.setAudioStreamType(android.media.AudioManager.STREAM_MUSIC);
            this.mediaPlayer.setScreenOnWhilePlaying(true);
            this.mediaPlayer.prepareAsync();

            this._setupMediaController();

        } catch (ex) {
            console.log("Error:", ex, ex.stack);
        }
    }

    public _setNativeVideo(nativeVideo: any): void {
        this._src = nativeVideo;
        this._openVideo();
    }

    public setNativeSource(nativePlayerSrc: string): void {
        this._src = nativePlayerSrc;
        this._openVideo();
    }

    public play(): void {
        this.playState = STATE_PLAYING;
        if (this.mediaState === SURFACE_WAITING) {
            this._openVideo();
        } else {
            this.mediaPlayer.start();
        }
    }

    public pause(): void {
        this.playState = STATE_PAUSED;
        this.mediaPlayer.pause();
    }

    public mute(mute: boolean): void {
        if (this.mediaPlayer) {
            if (mute === true) {
                this.mediaPlayer.setVolume(0, 0);
            }
            else if (mute === false) {
                this.mediaPlayer.setVolume(1, 1);
            }
        }
    }

    public stop(): void {
        this.mediaPlayer.stop();
        this.playState = STATE_IDLE;
        this.release();
    }

    public seekToTime(ms: number): void {
        if (!this.mediaPlayer) {
            this.preSeekTime = ms;
            return;
        } else {
            this.preSeekTime = -1;
        }
        this.mediaPlayer.seekTo(ms);
    }

    public isPlaying(): boolean {
        if (!this.mediaPlayer) { return false; }
        return this.mediaPlayer.isPlaying();
    }

    public getDuration(): number {
        if (!this.mediaPlayer || this.mediaState === SURFACE_WAITING || this.playState === STATE_IDLE) {
            return 0;
        }
        return this.mediaPlayer.getDuration();
    }

    public getCurrentTime(): number {
        if (!this.mediaPlayer) {
            return 0;
        }
        return this.mediaPlayer.getCurrentPosition();
    }

    public setVolume(volume: number) {
        this.mediaPlayer.setVolume(volume, volume);
    }

    public destroy() {
        this.release();
        this.src = null;
        this._android = null;
        this.mediaPlayer = null;
        this.mediaController = null;
    }

    private release(): void {
        if (this.mediaPlayer !== null) {
            this.mediaState = SURFACE_WAITING;
            this.mediaPlayer.reset();
            this.mediaPlayer.release();
            this.mediaPlayer = null;
            if (this._playbackTimeObserverActive) {
                this._removePlaybackTimeObserver();
            }
            let am = utils.ad.getApplicationContext().getSystemService(android.content.Context.AUDIO_SERVICE);
            am.abandonAudioFocus(null);
        }
    }

    public suspendEvent(): void {
        this.release();
    }

    public resumeEvent(): void {
        this._openVideo();
    }

    private _addPlaybackTimeObserver() {
        this._playbackTimeObserverActive = true;
        this._playbackTimeObserver = timer.setInterval(() => {
            if (this.mediaPlayer.isPlaying) {
                let _milliseconds = this.mediaPlayer.getCurrentPosition();
                this._setValue(Video.currentTimeProperty, _milliseconds);
            }
        }, 500);
    }

    private _removePlaybackTimeObserver() {
        timer.clearInterval(this._playbackTimeObserver);
        this._playbackTimeObserverActive = false;
    }

}