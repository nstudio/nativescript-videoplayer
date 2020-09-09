import {
  Application,
  Color,
  Device,
  Dialogs,
  EventData,
  isAndroid,
  Page,
  Utils
} from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel(page);

  if (isAndroid && Device.sdkVersion >= '21') {
    const window = Application.android.startActivity.getWindow();
    window.setStatusBarColor(new Color('#d32f2f').android);
  }
}

export function nStudioIconTap() {
  Dialogs.confirm({
    message:
      'nStudio, LLC. specializes in custom software applications ranging from mobile, web, desktop, server and more. Would you like to visit nstudio.io?',
    okButtonText: 'Yes',
    cancelButtonText: 'Close',
  }).then((result) => {
    if (result) {
      Utils.openUrl('https://nstudio.io');
    }
  });
}
