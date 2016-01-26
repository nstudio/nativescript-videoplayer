import definition = require("ui/videoplayer");
import view = require("ui/core/view");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");

export class VideoPlayer extends view.View implements definition.VideoPlayer {
    public static videoProperty = new dependencyObservable.Property(
        "video",
        "VideoPlayer",
        new proxy.PropertyMetadata(null)
    );

    constructor(options?: definition.Options) {
        super(options);
    }

    get video(): string {
        return this._getValue(VideoPlayer.videoProperty);
    }
    set video(value: string) {
        this._setValue(VideoPlayer.videoProperty, value);
    }
}