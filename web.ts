//Web.ts
module web.ts {
    function main(e): void {
        /* 
            code
         */
        //code for pages
        switch (window.location.href.substr(window.location.href.lastIndexOf("#") + 1)) {
            case "": case "Index": default:
                class Index extends web.ts.Page {
                    //view page for action
                    protected view(): string {
                        return "/Index.txt";
                    }
                    //how to render document method
                    protected render(doc: Document) {
                        document.title = "Index";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                } (new Index());
                break;
            case "element":
                //get Template from an element on Page(web ts css class makes the element hidden)
                class example extends web.ts.Page {
                    //public Renderer: Function;
                    protected view(): string {
                        return "#element";//(get element with id #)
                    }
                    protected render(doc: Document) {
                        document.title = "Element";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                } (new example());
                break;
            case "list":
                class List extends web.ts.List<string>{
                    protected view() {
                        return "#element";// just use the current document as the view. 
                    }
                    public add(item: string, i?: number, doc: Document = this.doc) {
                        var elm = docElement(doc); 
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
                    public set(fill: boolean = true, doc?: Document) {
                        document.getElementById("content").innerHTML = "";
                        if (fill) {
                            var strs = ["click on any item to remove", "a", "b", "c"];
                            this.list(strs);
                            this.add("d");
                            this.remove(null, 2);
                            this.list(<string[]>["e", "f", "g"])
                        }
                    }
                }
                var list = new List(); //Do the operation
                break;
            case "view":
                //View Example
                class View extends web.ts.View<string>{
                    public apply(text: string, doc: Document = this.doc) {
                        var elm = doc.body.children[0];
                        document.title = "View Element";
                        elm.textContent = "a document fetched using View() class. apply() is used to change and apply new items to the template elemnet";
                        document.getElementById("content").appendChild(elm);
                    }
                    protected view(): string { document.getElementById("content").innerText = ""; return "#element" }
                }
                var view = new View();
                break;
            //************End Change*******************
        }
        /*
            code
        */
    }
    //Assign main() to Events
    window.onload = function () {
        main(null);
        if ("onhashchange" in window) {
            onhashchange = main;
        } else {
        //If not supported
            var elms = document.getElementsByTagName("a");
            for (var i = 0; i < elms.length; i++)
                if ((<HTMLAnchorElement>elms[i]).classList.contains("web")) {
                    (<HTMLAnchorElement>elms[i]).onclick = function () {
                        window.location.reload();
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
    /*** Library ***/
    export abstract class Page {
        constructor() {
            this.load();
        }
        protected abstract view(): string;//Contains the page location or elements# to get template from and what to do while loading is taking place
        protected abstract render(doc: Document): void;//Callback when the template is downloaded and sent for user to render as desired.
        //Loading Function
        private load() {
            var view: string = this.view();
            if (view != null && view.length > 1) {
                if (view[0] != "#") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = () => this.render(TextToDocument(xhttp.responseText));
                    xhttp.open(view.lastIndexOf(".") > view.lastIndexOf("/")?"GET":"POST", view, true);
                    xhttp.send();
                } else {
                    this.render(TextToDocument(document.getElementById(view.substr(1)).outerHTML));
                }
            }
        }
    }
    function TextToDocument(text: string): Document {
        return <Document>(new DOMParser().parseFromString(text.replace(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi, text.match(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi)[0].replace(" ts", "")).replace(/(id( *)=["'][ \-\w]*["'])?/gi, ""), "text/html"))
    }
    export abstract class View<T> extends Page {
        constructor() {
            super();
        }
        protected doc: Document = document;
        protected view():string {return null;}
        //Application method to apply work on the view
        public apply(item: T, doc: Document = this.doc): void { }
        protected render(doc: Document) {
            this.doc = doc;
            this.apply(null);
        }
    }

    export abstract class List<T> extends Page {
        constructor() {
            super();
        }
        protected doc: Document = document;
        //Add and Remove Items Template
        public add(item: T, i: number = null, doc: Document = this.doc): void { }
        public remove(item: T, i: number = null, doc: Document = this.doc): void { }
        public set(fill: boolean = true, doc: Document = this.doc): void { }
        public length(): void { }
        protected render(doc: Document) {
            this.doc = doc;
            this.set();
        }
        //Start List Item Function
        public list(items: T[]): void {
            for (var i = 0; i < items.length;i++) {
                this.add(<T>items[i]);
            }
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
    export function docElement(doc: Document) {
        return (<HTMLElement>(doc.body.firstChild.cloneNode(true)));
    }
}