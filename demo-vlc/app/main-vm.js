var observable = require("data/observable");
var frameModule = require("ui/frame");
var enums = require("ui/enums").Visibility;

var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    
    function MainViewModel() {
        _super.call(this);   
                            
        this._flag = false; //fix for the lack of event on the slider component
        this._pausedSeekTo = 0; //if you move while paused, the player stops playing anymore :(
        this.updateVisibility(true);
        this.videoTime = 0;
        this.videoDuration = 1;        
        this.videoUrl = "~/videos/big_buck_bunny.mp4"; //"https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"        
    }
    
    Object.defineProperty(MainViewModel.prototype, "videoTime", {
        get: function () {              
            return this._videoTime;
        },
        set: function (value) {
            //there are no events for the slider control - kind of a dirty fix
            //if (Math.abs(this._videoTime - value) > 2000) {
            if (this._flag) {                
                this._videoTime = value;
                this._flag = false;                                
            } else {
                if (this.player) {
                    this._videoTime = value;
                    
                    //todo ugly fix.
                    if (this.player.isPlaying()) {
                        this.player.seekTo(value);
                    } else { 
                        this._pausedSeekTo = value;
                        //this.player.seekTo(value);
                    }
                }
            }                        
        },
        enumerable: true,
        configurable: true
    });
    
    MainViewModel.prototype.updateVisibility = function (isPlaying) {
        //var isPlaying = !this.player ? false : this.player.isPlaying();

        if (isPlaying) {
            this.set("playVisibility", enums.collapse);
            this.set("pauseVisibility", enums.visible);
        } else {
            this.set("playVisibility", enums.visible);
            this.set("pauseVisibility", enums.collapse);
        }
    };
      
    MainViewModel.prototype.play = function (args) {                                              
        this.player.play();
        
        //kind of an ugly fix
        if (this._pausedSeekTo > 0) {
            this.player.seekTo(this._pausedSeekTo);
            this._pausedSeekTo = 0;
        }
        
        this.updateVisibility(true);
        this.set("videoDuration", this.player.getDuration());                
    };

    MainViewModel.prototype.pause = function (args) {        
        this.player.pause();
        this.updateVisibility(false);
    };
    
    MainViewModel.prototype.opening = function (args) {        
        //console.log("opening");
    };
    
    MainViewModel.prototype.playing = function (args) {
        this.set("videoDuration", this.player.getDuration());
    };
    
    MainViewModel.prototype.timeChanged = function (args) {
        this._flag = true;
        this.set("videoTime", args.value);        
    };
    
    MainViewModel.prototype.finished = function (args) {                                      
        this.set("playVisibility", enums.visible);
        this.set("pauseVisibility", enums.collapse);
    };        
    
    MainViewModel.prototype.error = function (args) {                                                
        console.error("ERROR");
    };
      
    MainViewModel.prototype.clean = function (args) {
        //        
    };
        
    return MainViewModel;
})(observable.Observable);

exports.MainViewModel = MainViewModel;