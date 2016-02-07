function videoplayerLoaded(args) {
    console.log('video player loaded: ' + args.object);
}
exports.videoplayerLoaded = videoplayerLoaded;

function videoFinished(args) {
    console.log('video finished event executed'); 
}
exports.videoFinished = videoFinished;