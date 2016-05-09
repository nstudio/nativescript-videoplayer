"use strict";
var utils = require("utils/utils");
var definition = require("./video-source");
function fromResource(name) {
    var video = new definition.VideoSource();
    return video.loadFromResource(name) ? video : null;
}
exports.fromResource = fromResource;
function fromFile(path) {
    var video = new definition.VideoSource();
    return video.loadFromFile(path) ? video : null;
}
exports.fromFile = fromFile;
function fromNativeSource(source) {
    var video = new definition.VideoSource();
    return video.setNativeSource(source) ? video : null;
}
exports.fromNativeSource = fromNativeSource;
function fromUrl(url) {
    var video = new definition.VideoSource();
    return video.loadFromUrl(url) ? video : null;
}
exports.fromUrl = fromUrl;
function fromFileOrResource(path) {
    if (!isFileOrResourcePath(path)) {
        throw new Error("Path \"" + "\" is not a valid file or resource.");
    }
    if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
        return fromResource(path.substr(utils.RESOURCE_PREFIX.length));
    }
    return fromFile(path);
}
exports.fromFileOrResource = fromFileOrResource;
function isFileOrResourcePath(path) {
    return utils.isFileOrResourcePath(path);
}
exports.isFileOrResourcePath = isFileOrResourcePath;
//# sourceMappingURL=video-source-common.js.map