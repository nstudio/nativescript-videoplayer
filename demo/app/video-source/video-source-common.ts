import utils = require("utils/utils");
import * as httpModule from "http";

// This is used for definition purposes only, it does not generate JavaScript for it.
import definition = require("./video-source");

export function fromResource(name: string): definition.VideoSource {
    var image = new definition.VideoSource();
    return image.loadFromResource(name) ? image : null;
}

export function fromFile(path: string): definition.VideoSource {
    var image = new definition.VideoSource();
    return image.loadFromFile(path) ? image : null;
}


export function fromNativeSource(source: any): definition.VideoSource {
    var image = new definition.VideoSource();
    return image.setNativeSource(source) ? image : null;
}

export function fromUrl(url: string): Promise<definition.VideoSource> {
    var http: typeof httpModule = require("http");

    return http.getImage(url);
}

export function fromFileOrResource(path: string): definition.VideoSource {
    if (!isFileOrResourcePath(path)) {
        throw new Error("Path \"" + "\" is not a valid file or resource.");
    }

    if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
        return fromResource(path.substr(utils.RESOURCE_PREFIX.length));
    }
    return fromFile(path);
}

export function isFileOrResourcePath(path: string): boolean {
    return utils.isFileOrResourcePath(path);
}