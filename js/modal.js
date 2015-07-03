/// <reference path="data.ts" />
var Modal;
(function (Modal) {
    var _playlist = [];
    var stateMap = {
        playlist: _playlist
    };
    function getSuggestions(name, callbacks) {
        var data = {
            q: name,
            size: 5
        };
        var url = "http://so.ard.iyyin.com/suggest.do?";
        Data.send(url, 3000, data, callbacks);
        return true;
    }
    Modal.getSuggestions = getSuggestions;
    function getSongs(name, page, callbacks) {
        var data = {
            q: name,
            size: 50,
            page: page
        };
        var url = 'http://so.ard.iyyin.com/s/song_with_out?';
        Data.send(url, 3000, data, callbacks);
        return page;
    }
    Modal.getSongs = getSongs;
    function storePlaylist(item) {
        stateMap.playlist.push(item);
    }
    Modal.storePlaylist = storePlaylist;
    function getPlaylist() {
        return stateMap.playlist;
    }
    Modal.getPlaylist = getPlaylist;
    function emptyPlaylist(flag) {
        if (flag) {
            stateMap.playlist = [];
        }
    }
    Modal.emptyPlaylist = emptyPlaylist;
    function initModule() {
        return true;
    }
    Modal.initModule = initModule;
})(Modal || (Modal = {}));
//# sourceMappingURL=modal.js.map