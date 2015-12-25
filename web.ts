module web.ts {
    function main(): void {
        /* 
            code
         */
        //code for pages
        switch (hashCommand()) {
            case "":
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
                        document.getElementById("content").innerHTML = getElement(doc).outerHTML;
                    };
                }
                (new Index());
                break;
            case "view":
                document.title = "web.ts - View";
                //get Template from an element on Page(web ts css class makes the element hidden)
                class example implements WebView<string> {
                    public apply(text: string) {
                        document.getElementById("content").innerHTML = text;
                    };
                } (new example()).apply(new Date().toLocaleString());
                break;
            case "list":
                document.title = "web.ts - List";
                class List extends WebList<string>{
                    public add(item: string, i?: number) {
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
                var list = new List(); //Do the operation
                document.getElementById("content").innerHTML = "";
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

    //Assign main() to Events
    window.onload = function () {
        main();
        onhashchange = main;
        var elms = document.getElementsByTagName("a");
        for (var i = 0; i < elms.length; i++) {
            if ((<HTMLAnchorElement>elms[i]).classList.contains("web")) {
                (<HTMLAnchorElement>elms[i]).onclick = function () {
                    var href = "#"+(<HTMLAnchorElement>this).href.substr((<HTMLAnchorElement>this).href.lastIndexOf("#") + 1);
                    if ("#"+hashCommand() == href) {
                        //if (href.length > 0 && href[0] != "#" && href.indexOf(".") > 0)
                        //    href = "/#!/" + href.substr(0, href.indexOf("."))
                        window.location.href = href;
                        main();
                        return false;
                    }
                }
            }
        }
    }
    /*** web.ts libraries ***/
    //Hide Templates
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.web.ts { display: none; }';
    document.getElementsByTagName('head')[0].appendChild(style);

    function hashCommand(): string {
        var path: string = (window.location.href.substr(window.location.href.lastIndexOf("#") + 1));
        var pathIndxSlash: number = path.indexOf("/"), pathIndxQuestion: number = path.indexOf("?");
        var hashCommand = path.substr(0, pathIndxSlash < pathIndxQuestion && pathIndxSlash > 0 ? pathIndxSlash : (pathIndxQuestion < pathIndxSlash && pathIndxQuestion > 0 ? pathIndxQuestion : path.length));
        return hashCommand;
    }

    /*** Library ***/
    export abstract class WebDocument{
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
                xhttp.open(view.lastIndexOf("?")<0 && view.lastIndexOf(".") > view.lastIndexOf("/")?"GET":"POST", view, true);
                xhttp.send();
            }
        }
    }
    function TextToDocument(text: string): Document {
        return <Document>(new DOMParser().parseFromString(text, "text/html"));
    }

    export interface  WebView<T> {
        //Application method to apply work on the view
        apply(item: T);
    }

    export abstract class WebList< T > {
        abstract add(item: T, i: number): void;
        abstract remove(item: T, i: number): void;
        abstract reset(): void;
        abstract length(): number;
        //Start List Item Function
        public addRange(items: T[], i: number = this.length()): void {
            for (var indx = 0; indx < items.length;indx++) {
                this.add(<T>items[indx],i+indx);
            }
        }
    }


    export function getElement(edoc: Document | HTMLElement): HTMLElement {
        if (edoc.nodeName.toLowerCase() === "#document") {
            return (<HTMLElement>((<Document>edoc).getElementsByTagName("div")[0].cloneNode(true)));
        }
        else{
            var elm: HTMLElement = <HTMLElement>((<HTMLElement>edoc).cloneNode(true));
            elm.classList.remove("ts");
            elm.id = "";
            return elm;
        }
    }
    //ajax get resource
    export function get(url: string, callback: Function, timeout: number = 4000, timeoutcallback: Function = () => { }, type: string = "GET", async: boolean = true): void {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = callback();
        xhttp.timeout = timeout;
        xhttp.ontimeout = timeoutcallback();
        xhttp.open(type, url, async);
        xhttp.send();
    }
}