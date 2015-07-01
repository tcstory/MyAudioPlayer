/// <reference path="data.ts" />
var Modal;
(function (Modal) {
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
    function initModule() {
        return true;
    }
    Modal.initModule = initModule;
})(Modal || (Modal = {}));
//# sourceMappingURL=modal.js.map