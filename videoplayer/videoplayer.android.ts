import common = require("./videoplayer-common");
import utils = require("utils/utils")

global.moduleMerge(common, exports);

export class Video extends common.Video {
    private _android: android.widget.VideoView;
    private _mediaController: android.widget.MediaController;
    private _MediaPlayer: android.media.MediaPlayer;

    get android(): android.widget.VideoView {
        return this._android;
    }

    public _createUI() {

        var that = new WeakRef(this);

        this._android = new android.widget.VideoView(this._context);       
        this._mediaController = new android.widget.MediaController(this._context);
        this._MediaPlayer = new android.media.MediaPlayer;

        this._android.setMediaController(this._mediaController);

        if (this.src) {
            var url = android.net.Uri.parse(this.src);
            this._android.setVideoURI(url);
        }

        if (this.autoplay === true) {
            this._android.requestFocus();
            this._android.start();
        }

        //if (this.onComplete) {
        //    // Create the Complete Listener - this is triggered once a video reaches the end
        //    this._android.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({
        //        //onCompletion: this.onComplete;
        //        onCompletion: function (args) {
        //            console.log('Video Done');
        //        }
        //    }));
        //}        
                
    }
}