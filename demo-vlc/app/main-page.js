var view = require("ui/core/view");
var vm = require("./main-vm");

exports.pageLoaded = function (args) {    
    var page = args.object;    
    page.bindingContext = new vm.MainViewModel();
    var player = page.getViewById("customVideoPlayer");
    page.bindingContext.player = player;    
};

exports.pageUnloaded = function (args) {    
    var page = args.object;    
    page.bindingContext.clean();    
};