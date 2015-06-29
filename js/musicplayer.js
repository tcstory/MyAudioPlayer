/// <reference path="../typings/jquery/jquery.d.ts" />
var MusicPlayer;
(function (MusicPlayer) {
    "use strict";
    var jqueryMap = {
        $playBtn: $('#play-btn'),
        $prevBtn: $('#prev-btn'),
        $nextBtn: $('#next-btn'),
        $volumeBarOuter: $('#volume-bar-outer'),
        $volumeBarInner: $('#volume-bar-inner'),
        $progressBarOuter: $('#progress-bar-outer'),
        $progressBarInner: $('#progress-bar-inner'),
        $audio: $('audio'),
        $songTime: $('#song-time')
    };
    var configMap = {
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
    var stateMap = {
        curSong: 0,
        curState: configMap.playingState.init,
        playlist: [],
        timeId: null,
    };
    var audio = jqueryMap.$audio.get(0);
    function timeupdateHandler() {
        if (!stateMap.timeId) {
            setTimeout(function () {
                jqueryMap.$progressBarInner.css('width', function (index, oldValue) {
                    var duration = audio.duration;
                    var curTime = audio.currentTime;
                    var percentage = curTime / duration;
                    stateMap.timeId = null;
                    return configMap.progressBarOuterWidth * percentage;
                });
                // parseFloat和parseInt的参数都是string类型的
                var curTime = parseFloat(audio.currentTime + '');
                var minutes = parseInt(curTime / 60 + '');
                var seconds = parseInt(curTime % 60 + '');
                if (seconds.toString().length === 1) {
                    seconds = '0' + seconds;
                }
                jqueryMap.$songTime.text(minutes + ':' + seconds);
            }, 1);
        }
        return false;
    }
    function volumeBarClickHandler(event) {
        var diff = event.clientX - configMap.volumeBarOuterOffsetLeft;
        var percentage = diff / configMap.volumeBarOuterWidth;
        audio.volume = percentage;
        jqueryMap.$volumeBarInner.css('width', function (index, oldValue) {
            return configMap.volumeBarOuterWidth * percentage;
        });
        return false;
    }
    function progressBarHandler(event) {
        var diff = event.clientX - configMap.progressBarOuterOffsetLeft;
        var percentage = diff / configMap.progressBarOuterWidth;
        var curTime = audio.duration * percentage;
        audio.currentTime = curTime;
        jqueryMap.$progressBarInner.css('width', function (index, oldValue) {
            return configMap.progressBarOuterWidth * percentage;
        });
        return false;
    }
    function playSong() {
        switch (stateMap.curState) {
            case configMap.playingState.init:
                var songPath = stateMap.playlist[stateMap.curSong];
                jqueryMap.$audio.attr({
                    src: songPath
                });
                stateMap.curState = configMap.playingState.playing;
                jqueryMap.$playBtn.css({
                    'background-position': '13px -548px'
                });
                audio.play();
                return true;
            case configMap.playingState.playing:
                jqueryMap.$playBtn.css({
                    'background-position': '13px -448px'
                });
                pauseSong();
                return true;
            case configMap.playingState.pause:
                jqueryMap.$playBtn.css({
                    'background-position': '13px -548px'
                });
                stateMap.curState = configMap.playingState.playing;
                audio.play();
                return true;
        }
    }
    function pauseSong() {
        stateMap.curState = configMap.playingState.pause;
        audio.pause();
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
        audio.play();
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
        audio.play();
        return true;
    }
    function getPlaylist() {
        stateMap.playlist.push('./assets/music/不要忘记我爱你.mp3');
        stateMap.playlist.push('./assets/music/泡沫.mp3');
        stateMap.playlist.push('./assets/music/多远都要在一起.mp3');
        return true;
    }
    function initModule() {
        // --- Initializing User Interface
        getPlaylist();
        jqueryMap.$volumeBarInner.css('width', function (index, oldValue) {
            var curVolume = audio.volume;
            var percentage = curVolume / 1;
            return configMap.volumeBarOuterWidth * percentage;
        });
        // --- End ---
        //  --- Binding events ---
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
        jqueryMap.$volumeBarOuter.on('click', volumeBarClickHandler);
        jqueryMap.$progressBarOuter.on('click', progressBarHandler);
        jqueryMap.$audio.on('timeupdate', timeupdateHandler);
        // --- End ---
        return true;
    }
    MusicPlayer.initModule = initModule;
})(MusicPlayer || (MusicPlayer = {}));
//# sourceMappingURL=musicplayer.js.map