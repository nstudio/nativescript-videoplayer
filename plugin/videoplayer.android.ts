import videoCommon = require("./videoplayer-common");
import videoSource = require("video-source");
import dependencyObservable = require("ui/core/dependency-observable");
import fs = require("file-system");
import proxy = require("ui/core/proxy");
import * as enumsModule from "ui/enums";
import view = require("ui/core/view");
import utils = require("utils/utils");

global.moduleMerge(videoCommon, exports);

function onVideoSourcePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var video = <Video>data.object;
    if (!video.android) {
        return;
    }  

    video._setNativeVideo(data.newValue ? data.newValue.android : null); 
}
// register the setNativeValue callback
(<proxy.PropertyMetadata>videoCommon.Video.videoSourceProperty.metadata).onSetNativeValue = onVideoSourcePropertyChanged;

class MediaPlayerEventListener extends org.videolan.libvlc.MediaPlayer.EventListener {
    private _owner: Video;
    
    constructor(owner) {
        super();
        this._owner = owner;
        return global.__native(this);
    }

    public onEvent(event) {                      
        var args: any = {
            object: this,
            eventName: "",
            value: 1
        };
        
        switch (event.type) {
            case org.videolan.libvlc.MediaPlayer.Event.Opening:                
                args.eventName = videoCommon.Video.openingEvent;
                break;
            case org.videolan.libvlc.MediaPlayer.Event.Playing:                   
                args.eventName = videoCommon.Video.playingEvent;
                break;
            case org.videolan.libvlc.MediaPlayer.Event.TimeChanged:
                args.eventName = videoCommon.Video.timeChangedEvent;
                args.value = event.getTimeChanged();
                break;
            // case org.videolan.libvlc.MediaPlayer.Event.PositionChanged:
            //     console.log("PositionChanged " + event.getPositionChanged());
            //     break;                                
            case org.videolan.libvlc.MediaPlayer.Event.EncounteredError:                
                args.eventName = videoCommon.Video.errorEvent;                
                break;
            case org.videolan.libvlc.MediaPlayer.Event.EndReached:                
                args.eventName = videoCommon.Video.finishedEvent;                
                break;
            default:    
                //console.log(event.type);    
                return; //we don't care about the rest
                
            // case Event.Stopped:            
            // case Event.Paused:
            // case Event.Vout:                
            // case Event.ESAdded:
            // case Event.ESDeleted:
            // case Event.SeekableChanged:
            // case Event.PausableChanged:                    
                                
            // public float getPositionChanged() {        
            // public int getVoutCount() {        
            // public int getEsChangedType() {        
            // public boolean getPausable() {        
            // public boolean getSeekable() {            
        }        
        
        this._owner.notify(args);
    }		
}

export class Video extends videoCommon.Video {
    private _android: com.coolapps.vlcsurfaceviewlib.VlcSurfaceView;
    private _player: org.videolan.libvlc.MediaPlayer;

    get android(): com.coolapps.vlcsurfaceviewlib.VlcSurfaceView {
        return this._android;
    }

    public _createUI() {
        var that = new WeakRef(this);
        
        var vlcTextute = new com.coolapps.vlcsurfaceviewlib.VlcSurfaceView(this._context);        
        var vlc = vlcTextute.getLibVLC();        
        var player = vlcTextute.getMediaPlayer();
        
        var mediaPlayerEventListener = new MediaPlayerEventListener(this);
		player.setEventListener(mediaPlayerEventListener);
        
        this._android = vlcTextute;
        this._player = player;

        if (this.src) {
            var isUrl = false;

            if (this.src.indexOf("://") !== -1) {
                if (this.src.indexOf('res://') === -1) {
                    isUrl = true;
                }
            }

            if (!isUrl) {
                var currentPath = fs.knownFolders.currentApp().path;

                if (this.src[1] === '/' && (this.src[0] === '.' || this.src[0] === '~')) {
                    this.src = this.src.substr(2);
                }

                if (this.src[0] !== '/') {
                    this.src = currentPath + '/' + this.src;
                }
            } else { 
                this.src = android.net.Uri.parse(this.src);
            }
                                    
            var media = new org.videolan.libvlc.Media(vlc, this.src);
            player.setMedia(media);
        }

        if (this.autoplay === true) {
            //todo a bit of an ugly fix
            setTimeout(function() {
                player.play();
            }, 100);
        }        
    }

    public _setNativeVideo(nativeVideo: any) {                 
        if (nativeVideo) { 
            var vlc = this.android.getLibVLC();
            var media = new org.videolan.libvlc.Media(vlc, nativeVideo);
            this._player.setMedia(media);
        } else {
            this.stop();
        }    
    }

    public setNativeSource(nativePlayerSrc: string) {
        this.src = nativePlayerSrc;
    }
    
    public play(): void {                        
        this._player.play();
    }
    
    public pause(): void {                        
        this._player.pause();
    }
    
    public stop(): void {                        
        this._player.stop();
    }
    
    public seekTo(msec: number): void {        
        this._player.setTime(msec);        
    }
    
    public getPosition(): number {
        return this._player.getTime();            
    }
        
    public getDuration(): number {
        return this._player.getLength();            
    }
    
    public isPlaying(): boolean {
        return this._player.isPlaying();
    }
}