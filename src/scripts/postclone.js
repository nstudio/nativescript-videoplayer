var fs = require('fs');
var prompt = require('prompt');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var class_name,
    inputParams = {
        plugin_name: undefined,
        github_username: undefined,
        init_git: undefined
    },
    seed_plugin_name = "yourplugin",
    seed_class_name = "YourPlugin",
    seed_demo_property_name = "yourPlugin",
    seed_github_username = "YourName",
    demo_folder = "../demo",
    screenshots_dir = "../screenshots",
    seed_tests_dir = "../seed-tests",
    scripts_dir = "scripts",
    filesToReplace = {
        readmeFile: {
            source: "README.md",
            destination: "../README.md"
        },
        travisFile: {
            source: ".travis.yml",
            destination: "../.travis.yml"
        }
    };

console.log('NativeScript Plugin Seed Configuration');

var parseArgv = function () {
    var argv = Array.prototype.slice.call(process.argv, 2);
    var result = {};
    argv.forEach(function (pairString) {
        var pair = pairString.split('=');
        result[pair[0]] = pair[1];
    });
    return result;
};
var argv = parseArgv();

if (argv.gitHubUsername !== undefined && argv.pluginName !== undefined && argv.initGit !== undefined) {
    inputParams.github_username = argv.gitHubUsername;
    inputParams.plugin_name = argv.pluginName;
    inputParams.init_git = argv.initGit
}

askGithubUsername();

function askGithubUsername() {
    if (inputParams.github_username !== undefined) {
        askPluginName();
    } else {
        prompt.start();
        prompt.get({
            name: 'github_username',
            description: 'What is your GitHub username (used for updating package.json)? Example: NathanWalker / EddyVerbruggen'
        }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            if (!result.github_username) {
                return console.log("Your GitHub username is required to configure plugin's package.json.");
            }
            inputParams.github_username = result.github_username;
            askPluginName();
        });
    }
}

function askPluginName() {
    if (inputParams.plugin_name !== undefined) {
        generateClassName();
    } else {
        prompt.get({
            name: 'plugin_name',
            description: 'What will be the name of your plugin? Use lowercase characters and dashes only. Example: yourplugin / google-maps / bluetooth'
        }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            if (!result.plugin_name) {
                return console.log("Your plugin name is required to correct the file names and classes.");
            }

            inputParams.plugin_name = result.plugin_name;

            if (inputParams.plugin_name.startsWith("nativescript-")) {
                inputParams.plugin_name = inputParams.plugin_name.replace("nativescript-", "");
            }

            generateClassName();
        });
    }
}

function generateClassName() {
    // the classname becomes 'GoogleMaps' when plugin_name is 'google_maps'
    class_name = "";
    var plugin_name_parts = inputParams.plugin_name.split("-");
    for (var p in plugin_name_parts) {
        var part = plugin_name_parts[p];
        class_name += (part[0].toUpperCase() + part.substr(1));
    }
    console.log('Using ' + class_name + ' as the TypeScript Class name..');
    renameFiles();
}

function renameFiles() {
    console.log('Will now rename some files..');
    var files = fs.readdirSync(".");
    for (var f in files) {
        var file = files[f];
        if (file.indexOf(seed_plugin_name) === 0) {
            var newName = inputParams.plugin_name + file.substr(file.indexOf("."));
            fs.renameSync(file, newName);
        }
    }

    adjustScripts();
}

function adjustScripts() {
    console.log('Adjusting scripts..');

    // add all files in the root
    var files = fs.readdirSync(".");

    // add include.gradle
    files.push("platforms/android/include.gradle");

    // add demo's package.json
    files.push(demo_folder + "/package.json");

    // add the demo files
    var demoFiles = fs.readdirSync(demo_folder + "/app/");
    for (var d in demoFiles) {
        var demoFile = demoFiles[d];
        files.push(demo_folder + "/app/" + demoFile);
    }
    // add the tests
    files.push(demo_folder + "/app/tests/tests.js");

    // prepare and cache a few Regexp thingies
    var regexp_seed_plugin_name = new RegExp(seed_plugin_name, "g");
    var regexp_seed_class_name = new RegExp(seed_class_name, "g");
    var regexp_seed_demo_property_name = new RegExp(seed_demo_property_name, "g");
    var regexp_seed_github_username = new RegExp(seed_github_username, "g");

    for (var f in files) {
        var file = files[f];

        if (fs.lstatSync(file).isFile()) {
            var contents = fs.readFileSync(file, 'utf8');
            var result = contents.replace(regexp_seed_plugin_name, inputParams.plugin_name);
            result = result.replace(regexp_seed_class_name, class_name);
            result = result.replace(regexp_seed_demo_property_name, class_name[0].toLowerCase() + class_name.substr(1));
            result = result.replace(regexp_seed_github_username, inputParams.github_username);
            fs.writeFileSync(file, result);
        }
    }

    replaceFiles();
}

function replaceFiles() {
    for (key in filesToReplace) {
        var file = filesToReplace[key];
        var contents = fs.readFileSync(file.source);
        fs.writeFileSync(file.destination, contents);
        fs.unlinkSync(file.source);
    }

    rimraf(screenshots_dir, function () {
        console.log('Screenshots removed.');
        rimraf(seed_tests_dir, function () {
            console.log('Seed tests removed.');

            // delete postclone.js
            rimraf.sync('../CONTRIBUTING.md');
            rimraf.sync('../CODE_OF_CONDUCT.md');
            rimraf.sync(scripts_dir + '/postclone.js');

            askInitGit();
        });
    });
}

function askInitGit() {
    if (inputParams.init_git !== undefined) {
        initGit();
    } else {
        prompt.get({
            name: 'init_git',
            description: 'Do you want to init a fresh local git project? If you previously \'git clone\'d this repo that would be wise (y/n)',
            default: 'y'
        }, function (err, result) {
            if (err) {
                return console.log(err);
            }

            inputParams.init_git = result.init_git;
            initGit();
        });
    }
}

function initGit() {
    if (inputParams.init_git && inputParams.init_git.toLowerCase() === 'y') {
        rimraf.sync('../.git');
        exec('git init -q ..', function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                finishSetup();
            } else {
                exec("git add \"../*\" \"../.*\"", function (err, stdout, stderr) {
                    if (err) {
                        console.log(err);
                    }
                    finishSetup();
                });
            }
        });
    } else {
        finishSetup();
    }
}

function finishSetup() {
    console.log("Configuration finished! If you're not happy with the result please clone the seed again and rerun this script.");
    console.log("You can now continue by running 'npm run plugin.tscwatch' in this window and in another one - 'npm run demo.ios' or 'npm run demo.android'!");

    process.exit();
}