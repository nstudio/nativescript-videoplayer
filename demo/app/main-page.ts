import { Page } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { HelloWorldModel } from "./main-view-model";
import { isAndroid, device } from "tns-core-modules/platform";
import { Color } from "tns-core-modules/color";
import { topmost } from "tns-core-modules/ui/frame";
import { android } from "tns-core-modules/application";

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
