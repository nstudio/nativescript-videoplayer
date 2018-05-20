import * as fs from 'tns-core-modules/file-system';
import { isString } from 'tns-core-modules/utils/types';
import { CLog, CLogTypes } from '../videoplayer-common';

// leave the export so the functions in common are exported
export * from './video-source-common';

export class VideoSource {
  public ios: AVPlayerItem;
  height: any;
  width: any;

  public loadFromResource(name: string): boolean {
    CLog(CLogTypes.info, `VideoSource.loadFromResource --- name ${name}`);
    const videoURL = NSBundle.mainBundle.URLForResourceWithExtension(name, null);
    const player = AVPlayerItem.playerItemWithURL(videoURL);
    this.ios = player;
    return this.ios != null;
  }

  public loadFromFile(path: string): boolean {
    CLog(CLogTypes.info, `VideoSource.loadFromFile --- path ${path}`);
    let fileName = isString(path) ? path.trim() : '';

    if (fileName.indexOf('~/') === 0) {
      fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace('~/', ''));
      CLog(CLogTypes.info, `VideoSource.loadFromFile --- fileName ${fileName}`);
    }

    const videoURL = NSURL.fileURLWithPath(fileName);
    const player = AVPlayerItem.playerItemWithURL(videoURL);
    this.ios = player;
    return this.ios != null;
  }

  public loadFromUrl(url: string): boolean {
    CLog(CLogTypes.info, `VideoSource.loadFromUrl --- url ${url}`);
    const videoURL = NSURL.URLWithString(url);
    const player = AVPlayerItem.playerItemWithURL(videoURL);
    this.ios = player;
    return this.ios != null;
  }

  public setNativeSource(source: any): boolean {
    CLog(CLogTypes.info, `VideoSource.setNativeSource --- source ${source}`);
    this.ios = source;
    return source != null;
  }
}
