import view = require("ui/core/view");
import definition = require("ui/switch");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");

export class VideoPlayer extends view.View implements definition.Switch {
    public static videoProperty = new dependencyObservable.Property(
        "video",
        "VideoPlayer",
        new proxy.PropertyMetadata(null)
    );

    get video(): string {
        return this._getValue(VideoPlayer.videoProperty);
    }
    set video(value: string) {
        this._setValue(VideoPlayer.videoProperty, value);
    }
}