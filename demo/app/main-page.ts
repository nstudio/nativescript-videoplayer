import { android } from '@nativescript/core/application';
import { Color } from '@nativescript/core/color';
import { EventData } from '@nativescript/core/data/observable';
import { device, isAndroid } from '@nativescript/core/platform';
import { confirm } from '@nativescript/core/ui/dialogs';
import { Page } from '@nativescript/core/ui/page';
import { openUrl } from '@nativescript/core/utils/utils';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel(page);

  if (isAndroid && device.sdkVersion >= '21') {
    const window = android.startActivity.getWindow();
    window.setStatusBarColor(new Color('#d32f2f').android);
  }
}

export function nStudioIconTap() {
  confirm({
    message:
      'nStudio, LLC. specializes in custom software applications ranging from mobile, web, desktop, server and more. Would you like to visit nstudio.io?',
    okButtonText: 'Yes',
    cancelButtonText: 'Close',
  }).then((result) => {
    if (result) {
      openUrl('https://nstudio.io');
    }
  });
}
