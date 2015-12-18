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
                    protected View(): string {
                        return "/Page1.txt";
                    }
                    //how to render document method
                    protected Render(doc: Document) {
                        document.title = "Page1";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                }
                (new Index());
                break;
            case "Page2":
                class Page2 extends web.ts.Page {
                    //view page for action
                    protected View(): string {
                        return "/Page2.txt";
                    }
                    //how to render document method
                    protected Render(doc: Document) {
                        document.title = "Page2";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                }
                (new Page2());
                break;
            case "example":
                //get Template from an element on Page(web ts css class makes the element hidden)
                class example extends web.ts.Page {
                    //public Renderer: Function;
                    protected View(): string {
                        return "#example";//(get element with id #)
                    }
                    protected Render(doc: Document) {
                        /*
                        //List Example
                            class list extends web.ts.List<string>{
                                public Add(s:string) { }
                                public Remove(i: number) { }
                                protected View(): string { return ""}
                            }
                            var arr[];
                            list.List(arr);
                        */
                        document.title = "Example";
                        document.getElementById("content").innerHTML = doc.body.innerHTML;
                    };
                }
                (new example()); break;
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
            this.Load();
        }
        protected abstract View(): string;//Contains the page location or elements# to get template from and what to do while loading is taking place
        protected abstract Render(doc: Document): void;//Callback when the template is downloaded and sent for user to render as desired.
        //Loading Function
        private Load() {
            var view: string = this.View();
            if (view != null && view.length > 1) {
                if (view[0] != "#") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = () => this.Render(this.TextToDocument(xhttp.responseText));
                    xhttp.open("GET", view, true);
                    xhttp.send();
                } else {
                    this.Render(this.TextToDocument(document.getElementById(view.substr(1)).outerHTML));
                }
            }
        }
        private TextToDocument(text: string): Document {
            return <Document>(new DOMParser().parseFromString(text.replace(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi, text.match(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi)[0].replace(" ts", "")), "text/html"))
        }
    }
    export abstract class View<T> extends Page {
        private item:T;
        constructor(item: T) {
            super();
            this.item = item;
        }
        private Doc: Document;
        //Add and Remove Items Template
        public abstract Apply(item: T, Doc?: Document): void;
        protected Render(Doc: Document) {
            this.Doc = Doc;
            this.Apply(this.item);
        }

    }
    export abstract class List<T> extends Page {
        constructor(items: T[]) {
            super();
            this.List(items);
        }
        private Doc: Document;
        //Add and Remove Items Template
        abstract Add(item: T, i?: number, doc?: Document): void; 
        abstract Remove(i: number): void;
        protected Render(Doc: Document) {
            this.Doc = Doc;
        }
        //Start List Item Function
        private List(items: T[]): void {
            for (var item in items) {
                this.Add(item);
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
