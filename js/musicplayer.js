/// <reference path="../typings/jquery/jquery.d.ts" />
//module MusicPlayer {
"use strict";
var jqueryMap;
var stateMap;
var configMap;
function timeupdateHandler() {
    if (!stateMap.timeId) {
        setTimeout(function () {
            jqueryMap.$progressBarInner.css('width', function (index, oldValue) {
                var duration = configMap.audio.duration;
                var curTime = configMap.audio.currentTime;
                var percentage = curTime / duration;
                stateMap.timeId = null;
                return configMap.progressBarOuterWidth * percentage;
            });
            var curTime = parseFloat(configMap.audio.currentTime);
            var minutes = parseInt(curTime / 60);
            var seconds = parseInt(curTime % 60);
            if (seconds.toString().length === 1) {
                seconds = '0' + seconds;
            }
            jqueryMap.$songTime.text(minutes + ':' + seconds);
        }, 1);
    }
}
function volumeBarHandler(event) {
    var diff = event.clientX - configMap.volumeBarOuterOffsetLeft;
    var percentage = diff / configMap.volumeBarOuterWidth;
    configMap.audio.volume = percentage;
    jqueryMap.$volumeBarInner.css('width', function (index, oldValue) {
        return configMap.volumeBarOuterWidth * percentage;
    });
}
function progressBarHandler(event) {
    var diff = event.clientX - configMap.progressBarOuterOffsetLeft;
    var percentage = diff / configMap.progressBarOuterWidth;
    var curTime = configMap.audio.duration * percentage;
    configMap.audio.currentTime = curTime;
    jqueryMap.$progressBarInner.css('width', function (index, oldValue) {
        return configMap.progressBarOuterWidth * percentage;
    });
}
function playSong() {
    switch (stateMap.curState) {
        case configMap.playingState.init:
            var songPath = stateMap.playlist[stateMap.curSong];
            jqueryMap.$audio.attr({
                src: songPath
            });
            stateMap.curState = configMap.playingState.playing;
            jqueryMap.$playIcon.css('display', 'none');
            jqueryMap.$pauseIcon.css('display', 'block');
            configMap.audio.play();
            return true;
        case configMap.playingState.playing:
            jqueryMap.$playIcon.css('display', 'block');
            jqueryMap.$pauseIcon.css('display', 'none');
            pauseSong();
            return true;
        case configMap.playingState.pause:
            jqueryMap.$playIcon.css('display', 'none');
            jqueryMap.$pauseIcon.css('display', 'block');
            stateMap.curState = configMap.playingState.playing;
            configMap.audio.play();
            return true;
    }
}
function pauseSong() {
    stateMap.curState = configMap.playingState.pause;
    configMap.audio.pause();
    return true;
}
function prevSong() {
    stateMap.curSong = stateMap.curSong - 1;
    if (stateMap.curSong < 0) {
        stateMap.curSong = 0;
        alert('已经是第一首歌了');
        return false;
    }
    var songPath = stateMap.playlist[stateMap.curSong];
    jqueryMap.$audio.attr({
        src: songPath
    });
    stateMap.curState = configMap.playingState.playing;
    configMap.audio.play();
    return true;
}
function nextSong() {
    stateMap.curSong = stateMap.curSong + 1;
    if (stateMap.curSong > stateMap.playlist.length - 1) {
        stateMap.curSong = stateMap.curSong - 1;
        alert('已经是最后一首歌了');
        return false;
    }
    var songPath = stateMap.playlist[stateMap.curSong];
    jqueryMap.$audio.attr({
        src: songPath
    });
    stateMap.curState = configMap.playingState.playing;
    configMap.audio.play();
    return true;
}
function getPlaylist() {
    stateMap.playlist.push('./assets/music/不要忘记我爱你.mp3');
    stateMap.playlist.push('./assets/music/泡沫.mp3');
    stateMap.playlist.push('./assets/music/多远都要在一起.mp3');
}
function initModule() {
    jqueryMap = {
        $playBtn: $('#play-btn'),
        $prevBtn: $('#prev-btn'),
        $nextBtn: $('#next-btn'),
        $pauseIcon: $('#play-btn').find('i.pause.icon'),
        $playIcon: $('#play-btn').find('i.play.icon'),
        $volumeBarOuter: $('#volume-bar-outer'),
        $volumeBarInner: $('#volume-bar-inner'),
        $progressBarOuter: $('#progress-bar-outer'),
        $progressBarInner: $('#progress-bar-inner'),
        $audio: $('audio'),
        $songTime: $('#song-time')
    };
    configMap = {
        audio: jqueryMap.$audio.get(0),
        volumeBarOuterWidth: jqueryMap.$volumeBarOuter.width(),
        volumeBarOuterOffsetLeft: jqueryMap.$volumeBarOuter.prop('offsetLeft'),
        progressBarOuterWidth: jqueryMap.$progressBarOuter.width(),
        progressBarOuterOffsetLeft: jqueryMap.$progressBarOuter.prop('offsetLeft'),
        playingState: {
            init: 0,
            playing: 1,
            pause: 2
        }
    };
    stateMap = {
        curSong: 0,
        curState: configMap.playingState.init,
        playlist: [],
        timeId: null
    };
    jqueryMap.$playIcon.css('display', 'block');
    jqueryMap.$pauseIcon.css('display', 'none');
    getPlaylist();
    jqueryMap.$volumeBarInner.css('width', function (index, oldValue) {
        var curVolume = configMap.audio.volume;
        var percentage = curVolume / 1;
        return configMap.volumeBarOuterWidth * percentage;
    });
    jqueryMap.$prevBtn.on('click', function (event) {
        prevSong();
        return false;
    });
    jqueryMap.$playBtn.on('click', function (event) {
        playSong();
        return false;
    });
    jqueryMap.$nextBtn.on('click', function (event) {
        nextSong();
        return false;
    });
    jqueryMap.$audio.on('ended', function (event) {
        nextSong();
        return false;
    });
    jqueryMap.$volumeBarOuter.on('click', volumeBarHandler);
    jqueryMap.$progressBarOuter.on('click', progressBarHandler);
    jqueryMap.$audio.on('timeupdate', timeupdateHandler);
}
//}
