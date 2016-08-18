import { Page } from 'ui/page';
import { EventData } from 'data/observable';
import { HelloWorldModel } from './main-view-model';
import { isAndroid, device } from "platform";
import { Color } from "color";
import { topmost } from "ui/frame";
import { android } from "application";
import { Video } from 'nativescript-videoplayer';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender    
    let page = <Page>args.object;
    page.bindingContext = new HelloWorldModel(page);

    if (isAndroid && device.sdkVersion >= "21") {
        let window = android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#d32f2f").android);
    }

}