import * as app from '@nativescript/core/application';
import * as fs from '@nativescript/core/file-system';
import { isString } from '@nativescript/core/utils/types';
import * as utils from '@nativescript/core/utils/utils';
import { CLog, CLogTypes } from '../videoplayer-common';

// leave the export so the functions in common are exported
export * from './video-source-common';

export class VideoSource {
  public android: any; /// android.widget.VideoView;
  public ios: any;

  public loadFromResource(name: string): boolean {
    CLog(CLogTypes.info, `VideoSource.loadFromResource ---`, `name: ${name}`);

    this.android = null;

    const res = utils.ad.getApplicationContext().getResources();
    if (res) {
      const packageName = app.android.context.getPackageName();
      const UrlPath = `android.resource://${packageName}/R.raw.${name}`;
      CLog(
        CLogTypes.info,
        `VideoSource.loadFromResource ---`,
        `UrlPath: ${UrlPath}`
      );
      this.android = UrlPath;
    }

    return this.android != null;
  }

  public loadFromUrl(url: string): boolean {
    CLog(CLogTypes.info, `VideoSource.loadFromUrl ---`, `url: ${url}`);
    this.android = null;
    this.android = url;
    return this.android != null;
  }

  public loadFromFile(path: string): boolean {
    CLog(CLogTypes.info, `VideoSource.loadFromFile ---`, `path: ${path}`);
    let fileName = isString(path) ? path.trim() : '';
    if (fileName.indexOf('~/') === 0) {
      fileName = fs.path.join(
        fs.knownFolders.currentApp().path,
        fileName.replace('~/', '')
      );
      CLog(
        CLogTypes.info,
        `VideoSource.loadFromFile ---`,
        `fileName: ${fileName}`
      );
    }

    this.android = fileName;
    return this.android != null;
  }

  public setNativeSource(source: any): boolean {
    CLog(
      CLogTypes.info,
      `VideoSource.setNativeSource ---`,
      `source: ${source}`
    );
    this.android = source;
    return source != null;
  }

  get height(): number {
    if (this.android) {
      const h = this.android.getHeight();
      CLog(CLogTypes.info, `VideoSource.height --- returning ${h}`);
      return h;
    }

    return NaN;
  }

  get width(): number {
    if (this.android) {
      const w = this.android.getWidth();
      CLog(CLogTypes.info, `VideoSource.width --- returning ${w}`);
      return w;
    }

    return NaN;
  }
}
