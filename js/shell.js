/// <reference path="musicplayer.ts" />
var Shell;
(function (Shell) {
    "use strict";
    function initModule() {
        MusicPlayer.initModule();
    }
    Shell.initModule = initModule;
})(Shell || (Shell = {}));
//# sourceMappingURL=shell.js.map