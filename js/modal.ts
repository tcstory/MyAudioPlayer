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
    export function getSongs(name:string, page:number, callbacks:Callback):number {
        var data = {
            q: name,
            size: 50,
            page: page
        };
        var url = 'http://so.ard.iyyin.com/s/song_with_out?';
        Data.send(url, 3000, data, callbacks);
        return page;
    }
    export function initModule():boolean {
        return true;
    }
}
