import common = require("./videoplayer-common");
import utils = require("utils/utils")

global.moduleMerge(common, exports);

export class VideoPlayer extends common.VideoPlayer {
    private _android: android.widget.VideoView;

    constructor() {
        super();
    }

    get android(): android.widget.VideoView {
        return this._android;
    }

    public _createUI() {

        var that = new WeakRef(this);

        this._android = new android.widget.VideoView(this._context);
        console.log('this._android: ' + this._android);

        var mMediaController = new android.widget.MediaController(this._context);
        this._android.setMediaController(mMediaController);

        if (this.video)
            var url = android.net.Uri.parse(this.video);
            this._android.setVideoURI(url);

        //this._android.setOnClickListener(new android.view.View.OnClickListener(
        //    <utils.Owned & android.view.View.IOnClickListener>{
        //        get owner() {
        //            return that.get();
        //        },

        //        onClick: function (v) {
        //            if (this.owner) {
        //                this.owner._emit(common.Button.tapEvent);
        //            }
        //        }
        //    }));
    }
}