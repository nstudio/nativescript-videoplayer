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

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;


export class Video extends view.View implements definition.Video {

    public static srcProperty = new dependencyObservable.Property("src", "Video",
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));

    public static isLoadingProperty = new dependencyObservable.Property("isLoading", "Video",
        new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));

    public static autoplayProperty = new dependencyObservable.Property("autoplay", "Video",
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

    get isLoading(): boolean {
        return this._getValue(Video.isLoadingProperty);
    }

    get autoplay(): any {
        return this._getValue(Video.autoplayProperty);
    }
    set autoplay(value: any) {
        this._setValue(Video.autoplayProperty, value);
    }

    

}