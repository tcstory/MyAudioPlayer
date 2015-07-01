/// <reference path="musicplayer.ts" />
/// <reference path="modal.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
var Shell;
(function (Shell) {
    "use strict";
    var jqueryMap = {
        $searchBar: $('#search-bar'),
        $suggestionBox: $('#suggestion-box'),
        $inputBar: $('#search-bar').find('input')
    };
    var stateMap = {
        $currentItem: null,
        $candidates: null,
        queryString: '',
        jobID: 0 // 用来处理chrome下keyup问题而设置的setTimeout的id
    };
    var configMap = {
        timeout: 500
    };
    var sendSuggestionRequest = function () {
        // 假如是非firefox浏览器
        if (navigator.userAgent.search(/khtml/i) != -1) {
            return function () {
                // 该函数添加了一个计时器,避免在中文输入法打开的情况下,输入搜索字符串的时候,
                // 由于keyup事件频繁促发而导致的过多jsonp请求
                if ($.trim(jqueryMap.$inputBar.val()) === '') {
                    refreshSuggestionWindow();
                    return false;
                }
                clearTimeout(stateMap.jobID);
                stateMap.jobID = setTimeout(function () {
                    stateMap.queryString = $.trim(jqueryMap.$inputBar.val());
                    Modal.getSuggestions($.trim(jqueryMap.$inputBar.val()), {
                        success: showSuggestion,
                        error: function (textStatus) {
                            console.log(textStatus);
                        }
                    });
                }, configMap.timeout);
            };
        }
        else if (navigator.userAgent.search(/firefox/i) != -1) {
            return function () {
                if ($.trim(jqueryMap.$inputBar.val()) === '') {
                    refreshSuggestionWindow();
                    return false;
                }
                stateMap.queryString = $.trim(jqueryMap.$inputBar.val());
                Modal.getSuggestions($.trim(jqueryMap.$inputBar.val()), {
                    success: showSuggestion,
                    error: function (textStatus) {
                        console.log(textStatus);
                    }
                });
            };
        }
    }();
    function responseKeyboard(event) {
        //console.log('keyup: ' + event.keyCode);
        // 按下回车键
        if (event.which === 13) {
            refreshSuggestionWindow();
        }
        else if (event.which === 40) {
            if (!stateMap.$candidates) {
                // 候选项为空,直接返回
                return false;
            }
            else if (!stateMap.$currentItem) {
                stateMap.$currentItem = stateMap.$candidates.first();
                stateMap.$currentItem.addClass('choosed-item');
                jqueryMap.$inputBar.val(stateMap.$currentItem.text());
            }
            else {
                if (stateMap.$currentItem.next().length === 1) {
                    stateMap.$currentItem.removeClass('choosed-item');
                    stateMap.$currentItem = stateMap.$currentItem.next();
                    stateMap.$currentItem.addClass('choosed-item');
                    jqueryMap.$inputBar.val(stateMap.$currentItem.text());
                }
            }
        }
        else if (event.which === 38) {
            if (!stateMap.$candidates) {
                // 候选项为空,直接返回
                return false;
            }
            else if (!stateMap.$currentItem) {
                return false;
            }
            else {
                if (stateMap.$currentItem.prev().length === 1) {
                    stateMap.$currentItem.removeClass('choosed-item');
                    stateMap.$currentItem = stateMap.$currentItem.prev();
                    stateMap.$currentItem.addClass('choosed-item');
                    jqueryMap.$inputBar.val(stateMap.$currentItem.text());
                }
            }
        }
        else if ($.trim(jqueryMap.$inputBar.val()) != stateMap.queryString) {
            sendSuggestionRequest();
        }
        return false;
    }
    function showSuggestion(data) {
        refreshSuggestionWindow();
        console.log(data);
        var result = data.data;
        if (result.length === 0) {
            // 搜索的歌曲(歌手)不存在时,返回的数组为空
            return false;
        }
        var fragment = document.createDocumentFragment();
        result.forEach(function (item, index, array) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(item));
            fragment.appendChild(li);
        });
        jqueryMap.$suggestionBox.append($(fragment));
        // 缓存所有候选项
        stateMap.$candidates = $('#suggestion-box').children();
        return true;
    }
    function refreshSuggestionWindow() {
        // 刷新状态
        jqueryMap.$suggestionBox.html('');
        stateMap.$currentItem = null;
        stateMap.$candidates = null;
        return true;
    }
    function initModule() {
        jqueryMap.$searchBar.on('keyup', responseKeyboard);
        $('body').on('click', function (event) {
            jqueryMap.$suggestionBox.html('');
            return false;
        });
    }
    Shell.initModule = initModule;
})(Shell || (Shell = {}));
//# sourceMappingURL=shell.js.map