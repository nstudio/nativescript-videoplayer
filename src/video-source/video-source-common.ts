import { RESOURCE_PREFIX, isFileOrResourcePath as isFileOrResourcePathCore } from 'tns-core-modules/utils/utils';
import { VideoSource } from './video-source';

export function fromResource(name: string): VideoSource {
  const video = new VideoSource();
  return video.loadFromResource(name) ? video : null;
}

export function fromFile(path: string): VideoSource {
  const video = new VideoSource();
  return video.loadFromFile(path) ? video : null;
}

export function fromNativeSource(source: any): VideoSource {
  const video = new VideoSource();
  return video.setNativeSource(source) ? video : null;
}

export function fromUrl(url: string): VideoSource {
  const video = new VideoSource();
  return video.loadFromUrl(url) ? video : null;
}

export function fromFileOrResource(path: string): VideoSource {
  if (!isFileOrResourcePath(path)) {
    throw new Error(`Path: ${path} is not a valid file or resource.`);
  }

  if (path.indexOf(RESOURCE_PREFIX) === 0) {
    return fromResource(path.substr(RESOURCE_PREFIX.length));
  }
  return fromFile(path);
}

export function isFileOrResourcePath(path: string): boolean {
  return isFileOrResourcePathCore(path);
}
