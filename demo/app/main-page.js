var vmModule = require("./main-view-model");
             
function pageLoaded(args) {     
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;


function videoplayerLoaded(args) {
    var video = args.object;
    console.log('video: ' + video);
    console.log('video src: ' + video.src);
}
exports.videoplayerLoaded = videoplayerLoaded;

function videoFinished(args) {
    console.log('video finished playing, move to next track.');
}
exports.videoFinished = videoFinished;
 