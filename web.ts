/**
* @preserve web.ts | @medozs | MIT/GPL2 Licensed | Open Source at github.com/medozs/web.ts
*/
module web.ts {
    function main(): void {
        /* 
            code
         */
        //code for pages
        switch (command()) {
            case "":
            case "Page.html":
            case "!/Index":
            case "!/Page":
            default:
                document.title = "web.ts - Page";
                class Index extends WebDocument {
                    //view page for action
                    protected view(): string {
                        return "/Page.html";
                    }
                    //how to render document method
                    protected result(doc: Document) {
                        document.getElementById("content").innerHTML = getElement(doc).outerHTML + "<br/>" + new Date().toLocaleString();
                    };
                }
                (new Index());

                break;
            case "view":
                document.title = "web.ts - View";
                class example implements WebView<string> {
                    //apply string on an element
                    public apply(text: string) {
                        document.getElementById("content").innerHTML = text;
                    };
                } (new example()).apply(new Date().toLocaleString());
                break;
            case "list":
                document.title = "web.ts - List";
                class List extends WebList<string>{
                    public add(item: string, i?: number) {
                        //get Template from an element on Page(web ts css class makes the element hidden)
                        var elm = getElement(document.getElementById("element"));
                        elm.innerText = item;
                        elm.onclick = () => this.remove(item);
                        document.getElementById("content").appendChild(elm);
                    }
                    public remove(item: string, i: number = null) {
                        if (item != null) {
                            var elms = document.getElementById("content").children;
                            for (var index = 0; index < elms.length; index++)
                                if ((<HTMLDivElement>elms[index]).innerText == item) (<HTMLDivElement>elms[index]).remove();
                        } else if (i != null) {
                            document.getElementById("content").children[i].remove();
                        }
                    }
                    public length() { return null; }
                    public reset() {
                        document.getElementById("content").innerHTML = "";
                    }
                }
                var list = new List();
                var strs = ["click on any item to remove", "a", "b", "c"];
                list.addRange(strs);
                list.add("d");
                list.remove(null, 2);
                break;
            //************End Change*******************
        }
        /*
            code
        */
    }

    //******* web.ts library ************//
    //Assign main() to Events
    window.onload = function () {
        main();
        var elms = document.getElementsByTagName("a");
        if (history.pushState) {
            onpopstate = main;
            for (var i = 0; i < elms.length; i++) {
                var elm = (<HTMLAnchorElement>elms[i]);
                if (elm.classList.contains("web")) {
                    elm.onclick = function () {
                        var thelm = <HTMLAnchorElement>this;
                        if (window.location.pathname + window.location.search + window.location.hash != (thelm.getAttribute("href").charAt(0) != "/" ? "/" : "") + thelm.getAttribute("href")) {
                            history.pushState("", document.title, ((thelm.getAttribute("href") + "").charAt(0)!="/"?"/":"")+ thelm.getAttribute("href"));
                            main();
                            history.replaceState("", document.title, ((thelm.getAttribute("href") + "").charAt(0) != "/" ? "/" : "") +thelm.getAttribute("href"));
                        } else main();
                        return false;
                    }
                }
            }
        }
        else if ('onhashchange' in window || window.onhashchange) {
            onhashchange = main;
            for (var i = 0; i < elms.length; i++) {
                var elm = (<HTMLAnchorElement>elms[i]);
                if (elm.classList.contains("web")) {
                    elm.onclick = function () {
                        var thelm = <HTMLAnchorElement>this;
                        if (window.location.hash != "#" + thelm.getAttribute("href"))
                            window.open("#" + thelm.getAttribute("href"),"_self");
                        else main();
                        return false;
                    }
                }
            }
        }
    }
    /*** web.ts components ***/
    //Hide Templates
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.web.ts { display: none; clear:both; }';
    document.getElementsByTagName('head')[0].appendChild(style);

    export function command(): string {
        return window.location.hash + "" != "" ? window.location.hash.replace("?", "/").replace("#/", "#!/").substr(window.location.hash.replace("#/", "#!/").indexOf("!/") + 2).split("/")[0] : window.location.pathname.substr(1).split("/")[0];
    }

    export function args(): Object {
        var args = "";
        if (window.location.hash + "" != "") args = window.location.hash.replace("#/", "#!/").substr(window.location.hash.replace("#/", "#!/").indexOf("!/") + 2).split("?")[(window.location.hash + "").indexOf("?")<0?0:1]; 
        else args = ((window.location.search + "" != "") ? window.location.search : window.location.pathname).substr(1);
        if (args.length > 0) args = args.replace("/", "=");
        var pairs = args.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            var kv = pair.split('=');
            result[kv[0]] = decodeURIComponent(kv[1] || '');
        });
        return JSON.parse(JSON.stringify(result));
    }
    //create Query String from object
    export function createQueryString(obj: Object): string {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }

    /*** Library ***/
    export abstract class WebDocument {
        constructor() {
            this.load();
        }
        protected abstract view(): string;//Contains the page location or elements# to get template from and what to do while loading is taking place
        protected abstract result(doc: Document): void;//Callback when the template is downloaded and sent for user to render as desired.
        //Loading Function
        private load() {
            var view: string = this.view();
            if (view != null && view.length > 1 && view[0] != "#") {
                var xhttp = new XMLHttpRequest();
                xhttp.onload = () => this.result(TextToDocument(xhttp.responseText));
                xhttp.open(view.lastIndexOf("?") < 0 && view.lastIndexOf(".") > view.lastIndexOf("/") ? "GET" : "POST", view, true);
                xhttp.send();
            }
        }
    }
    function TextToDocument(text: string): Document {
        return <Document>(new DOMParser().parseFromString(text, "text/html"));
    }

    export interface WebView<T> {
        //Application method to apply work on the view
        apply(item: T);
    }

    export abstract class WebList<T> {
        constructor() { this.reset(); }
        abstract add(item: T, i: number): void;
        abstract remove(item: T, i: number): void;
        abstract reset(): void;
        abstract length(): number;
        //Start List Item Function
        public addRange(items: T[], i: number = this.length()): void {
            for (var indx = 0; indx < items.length; indx++) {
                this.add(<T>items[indx], i + indx);
            }
        }
    }

    export function getElement(edoc: Document | HTMLElement): HTMLElement {
        if (edoc.nodeName.toLowerCase() === "#document") {
            return (<HTMLElement>((<Document>edoc).getElementsByTagName("div")[0].cloneNode(true)));
        }
        else {
            var elm: HTMLElement = <HTMLElement>((<HTMLElement>edoc).cloneNode(true));
            elm.classList.remove("ts");
            elm.id = "";
            return elm;
        }
    }
    //ajax get resource
    export function get(url: string, callback: Function, data: string | Document | any = null, timeout: number = 4000, timeoutcallback: Function = () => { }, type: string = "GET", async: boolean = true): void {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = callback();
        xhttp.timeout = timeout;
        xhttp.ontimeout = timeoutcallback();
        xhttp.open(type, url, async);
        xhttp.send(data);
    }
}