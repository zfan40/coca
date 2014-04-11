var buf = new Array([8]);

function init() {
    console.log("in init");
    try {
        ctx = new webkitAudioContext(); //is there a better API for this?

    }catch(e) {
        alert('you need webaudio support');
    }
    
    try {loadFile();
    } catch(error) {
        alert('fail loading');
    }
}

//load and decode mp3 file
function loadFile() {
    filedir = ["sound/fountain.mp3","sound/water.wav","sound/chinese.mp3","sound/japanese.mp3","sound/korean.mp3","sound/russian.mp3","sound/indian.mp3","sound/thai.mp3"];
    var req = new Array([8]);
    var index = 0;

    req[0] = new XMLHttpRequest();
    req[0].open("GET",filedir[0],true);
    req[0].responseType = "arraybuffer";
    req[0].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[0].response, function(buffer) {
            buf[0] = buffer;
            //setupButtons();
        });
    };
    req[0].send();

    req[1] = new XMLHttpRequest();
    req[1].open("GET",filedir[1],true);
    req[1].responseType = "arraybuffer";
    req[1].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[1].response, function(buffer) {
            buf[1] = buffer;
        });
    };
    req[1].send();

    req[2] = new XMLHttpRequest();
    req[2].open("GET",filedir[2],true);
    req[2].responseType = "arraybuffer";
    req[2].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[2].response, function(buffer) {
            buf[2] = buffer;
        });
    };
    req[2].send();

    req[3] = new XMLHttpRequest();
    req[3].open("GET",filedir[3],true);
    req[3].responseType = "arraybuffer";
    req[3].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[3].response, function(buffer) {
            buf[3] = buffer;
        });
    };
    req[3].send();

    req[4] = new XMLHttpRequest();
    req[4].open("GET",filedir[4],true);
    req[4].responseType = "arraybuffer";
    req[4].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[4].response, function(buffer) {
            buf[4] = buffer;
        });
    };
    req[4].send();

    req[5] = new XMLHttpRequest();
    req[5].open("GET",filedir[5],true);
    req[5].responseType = "arraybuffer";
    req[5].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[5].response, function(buffer) {
            buf[5] = buffer;
        });
    };
    req[5].send();

    req[6] = new XMLHttpRequest();
    req[6].open("GET",filedir[6],true);
    req[6].responseType = "arraybuffer";
    req[6].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[6].response, function(buffer) {
            buf[6] = buffer;
        });
    };
    req[6].send();

    req[7] = new XMLHttpRequest();
    req[7].open("GET",filedir[7],true);
    req[7].responseType = "arraybuffer";
    req[7].onload = function() {
        //decode the loaded data
        ctx.decodeAudioData(req[7].response, function(buffer) {
            buf[7] = buffer;
        });
    };
    req[7].send();
}




