/// <reference path="data.ts" />
module Modal {
    interface Callback {
        success:(any)=>any;
        error:(any)=>any;
    }
    export function getSuggestions(name:string, callbacks:Callback):boolean {
        var data = {
            q: name,
            size: 5
        };
        var url = "http://so.ard.iyyin.com/suggest.do?";
        Data.send(url, 3000, data, callbacks);
        return true;
    }
    export function initModule():boolean {
        return true;
    }
}
