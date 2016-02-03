function videoplayerLoaded(args) {
    try {
        var video = args.object;
        console.log('video: ' + video);
        console.log('video android: ' + video.android);
        console.log('video src: ' + video.src);
    } catch (error) {
        console.log(error);
    }
}
exports.videoplayerLoaded = videoplayerLoaded;

function videoFinished(args) {
    // alert('Video finished :)');
    console.log('video finished event executed');
    // args.object.src = 'http://techslides.com/demos/sample-videos/small.mp4';
}
exports.videoFinished = videoFinished;