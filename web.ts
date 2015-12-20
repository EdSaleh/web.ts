//Web.ts
module web.ts {
    function main(e): void {
        /* 
            code
         */
        //code for pages
        switch (window.location.href.substr(window.location.href.lastIndexOf("#") + 1)) {
            case "": default:
                class Index extends web.ts.Page {
                    //view page for action
                    protected view(): string {
                        return "/Page1.txt";
                    }
                    //how to render document method
                    protected render(doc: Document) {
                        document.title = "Page1";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                }(new Index());
                break;
            case "Page2":
                class Page2 extends web.ts.Page {
                    //view page for action
                    protected view(): string {
                        return "/Page2.txt";
                    }
                    //how to render document method
                    protected render(doc: Document) {
                        document.title = "Page2";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                }(new Page2());
                break;
            case "example":
                //get Template from an element on Page(web ts css class makes the element hidden)
                class example extends web.ts.Page {
                    //public Renderer: Function;
                    protected view(): string {
                        return "#example";//(get element with id #)
                    }
                    protected render(doc: Document) {
                        /*
                        //List Example
                            class list extends web.ts.List<string>{
                                public Add(item: T, i?: number, doc?: Document) {document.getElementById("content").innerText += item }
                                public Remove(i: number) { }
                                protected View(): string { document.getElementById("content").innerText=""; return ""}
                            }
                            var arr[];
                            new list(arr);
                        */
                                                /*
                        //View Example
                            class view extends web.ts.View<string>{
                                public Apply(text:string, doc:?Document) {document.getElementById("content").innerText += text }
                                protected View(): string { document.getElementById("content").innerText =""; return ""}
                            }
                            new view("hello");

                        */
                        document.title = "Example";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                } (new example());
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
                    xhttp.onload = () => this.render(this.TextToDocument(xhttp.responseText));
                    xhttp.open("GET", view, true);
                    xhttp.send();
                } else {
                    this.render(this.TextToDocument(document.getElementById(view.substr(1)).outerHTML));
                }
            }
        }
        private TextToDocument(text: string): Document {
            return <Document>(new DOMParser().parseFromString(text.replace(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi, text.match(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi)[0].replace(" ts", "")), "text/html"))
        }
    }
    export abstract class View<T> extends Page {
        private item:T;
        constructor(item: T=null) {
            super();
            this.item = item;
        }
        protected doc: Document = document;
        protected view():string {return null;}
        //Application method to apply work on the view
        public apply(item: T, doc: Document = this.doc): void { }
        protected render(doc: Document) {
            this.doc = doc;
            this.apply(this.item);
        }

    }
    export abstract class List<T> extends Page {
        private items: T[];
        constructor(items: T[]=null) {
            super();
        }
        protected doc: Document = null;
        //Add and Remove Items Template
        public add(item: T, i: number = null, doc: Document = this.doc): void { }
        public remove(item: T, i: number = null, doc: Document = this.doc): void { }
        public reset(): void { }
        protected render(doc: Document) {
            this.doc = doc;
            this.list(this.items);
        }
        //Start List Item Function
        public list(items: T[]): void {
            this.reset();
            for (var item in items) {
                this.add(item);
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
}
