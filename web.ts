/*** Pages ***/
window.onload = function (e) {
    switch (window.location.href.substr(window.location.href.lastIndexOf("#") + 1)) {
        //Change
        case "/Page1": default:
            class Page1 extends web.ts.Page {
                //public Renderer: Function;
                protected View(): string {
                    return "/Page1.txt";
                }
                protected Render(doc: Document) {
                    var elm = document.getElementById("content");
                    elm.textContent = "";
                    elm.appendChild(doc.querySelector("*"));
                };
                protected Wait() {
                    var waitDiv = document.createElement("div"); return waitDiv;
                }
            }
            (new Page1()).Load(); break;
        case "example":
            class example extends web.ts.Page {
                //public Renderer: Function;
                protected View(): string {
                    return "#example";
                }
                protected Render(doc: Document) {
                    var container = document.getElementById("content");
                    container.textContent = "";
                    container.appendChild(doc.querySelector("*"))
                };
                protected Wait() {
                    var waitDiv = document.createElement("div");
                }
            }
            (new example()).Load(); break;
    }
}
window.onhashchange = window.onload;
//Hide Templates
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.web.ts { display: none; }';
document.getElementsByTagName('head')[0].appendChild(style);
/*** Library ***/
module web.ts {
    export abstract class Page {
        protected abstract View(): string;
        protected abstract Render(doc: Document): void;
        protected abstract Wait(): void;
        public Load() {
            this.Wait();
            if (this.View() != null && this.View().length > 1) {
                if (this.View()[0] != "#") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = () => this.Render(<Document>new DOMParser().parseFromString(xhttp.responseText, "text/xml"));
                    xhttp.open("GET", this.View(), true);
                    xhttp.send();
                } else {
                    var elm: HTMLElement = document.getElementById(this.View().substr(1));
                    elm.className.replace("web ts", ""); 
                    this.Render(<Document>new DOMParser().parseFromString(elm.outerHTML, "text/xml"));
                }
            }
        }
    }
    export abstract class List<T> extends Page {
        private Doc: Document;
        abstract Item(doc: Document, item: T)
        public Add(item:T) {
            this.Item(this.Doc, item);
        }
        abstract Remove();
        Render(Doc: Document) {
            this.Doc = Doc;
        }
        List(items: T[]) {
            this.Load();
            for (var item in items) {
                this.Add(item);
            }
        }
    }
    export function documentify(obj: Object): Document { return new DOMParser().parseFromString(JSON.stringify(obj), "text/xml"); }
}
