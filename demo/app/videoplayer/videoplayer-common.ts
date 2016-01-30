/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/

import view = require("ui/core/view");
import definition = require("videoplayer");
import platform = require("platform");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import * as videoSource from "../video-source/video-source";
import utils = require("utils/utils");


var SRC = "src";
var VIDEO_SOURCE = "videoSource";
var VIDEO = "Video";


// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;


function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var video = <Video>data.object;
    var value = data.newValue;

    value = value.trim();

    video["_url"] = value;

    video._setValue(Video.isLoadingProperty, true);

    if (utils.isFileOrResourcePath(value)) {
        video.videoSource = videoSource.fromFileOrResource(value);
        video._setValue(Video.isLoadingProperty, false);
    } else {
        videoSource.fromUrl(value).then((r) => {
            if (video["_url"] === value) {
                video.videoSource = r;
                video._setValue(Video.isLoadingProperty, false);
            }
        });
    }

    //video._setNativePlayerSource(data.newValue);
}


export class Video extends view.View implements definition.Video {

    public static srcProperty = new dependencyObservable.Property(SRC, VIDEO,
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));


    public static videoSourceProperty = new dependencyObservable.Property(VIDEO_SOURCE, VIDEO,
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));


    public static isLoadingProperty = new dependencyObservable.Property("isLoading", VIDEO,
        new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));

    public static autoplayProperty = new dependencyObservable.Property("autoplay", VIDEO,
        new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));

    constructor(options?: definition.Options) {
        super(options);
    }

    get src(): any {
        return this._getValue(Video.srcProperty);
    }
    set src(value: any) {
        this._setValue(Video.srcProperty, value);
    }

    get videoSource(): videoSource.VideoSource {
        return this._getValue(Video.videoSourceProperty);
    }
    set videoSource(value: videoSource.VideoSource) {
        this._setValue(Video.videoSourceProperty, value);
    }

    get isLoading(): boolean {
        return this._getValue(Video.isLoadingProperty);
    }

    get autoplay(): any {
        return this._getValue(Video.autoplayProperty);
    }
    set autoplay(value: any) {
        this._setValue(Video.autoplayProperty, value);
    }

    public finishedCallback() {} //TODO

}