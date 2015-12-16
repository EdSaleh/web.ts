/*** Pages ***/
window.onload = function (e) {
    switch (window.location.href.substr(window.location.href.lastIndexOf("#") + 1)) {
        //************Change********************
        case "/Page1": default:
		//Page1 class for /Page1 Page or home Page 
            class Page1 extends web.ts.Page {
				//Input the page name or element# of the template
                protected View(): string {
                    return "/Page1.txt";//The location of the template page
                }
				//Render Content callback
                protected Render(doc: Document) {
                    var elm = document.getElementById("content");//Place to reneder the content into
                    elm.textContent = "";
                    elm.appendChild(doc.querySelector("*"));
                };
                protected Wait() {//Wait Panel
                    var waitDiv = document.createElement("div"); return waitDiv;
                }
            }
            (new Page1()).Load();//Create Page Object and ask to Load() it. 
			//Load() will use abstract methods View() and Render() to get a specific page template form a location to the Render()
			break;
        case "example":
		//get Template from an element on Page(web ts css class makes the element hidden)
            class example extends web.ts.Page {
                //public Renderer: Function;
                protected View(): string {
                    return "#example";//(get element with id #)
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
            class list extends web.ts.List<string>{
                public Add(s:string) { }
                public Remove(i: number) { }
                protected Wait() { }
                protected View(): string { return ""}
            }
            (new example()).Load(); break;
		//************End Change*******************
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
        protected abstract View(): string;//Contains the page location or elements# to get template from
        protected abstract Render(doc: Document): void;//Callback when the template is downloaded and sent for user to render as desired.
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
        abstract Add(item: T, i?: number, doc?:Document):void;
        abstract Remove(i:number):void;
        protected Render(Doc: Document) {
            this.Doc = Doc;
        }
        public List(items: T[]):void {
            this.Load();
            for (var item in items) {
                this.Add(item);
            }
        }
    }
    export function get(url: string, callback: Function, timeout: number = 4000, timeoutcallback: Function = () => { }, type:string="GET", async:boolean=true):void{ 
	                var xhttp = new XMLHttpRequest();
                    xhttp.onload = callback();
					xhttp.timeout = timeout;
					xhttp.ontimeout=timeoutcallback(); 
                    xhttp.open(type, url, async);
                    xhttp.send();
	}
    export function documentify(obj: Object): Document { return new DOMParser().parseFromString(JSON.stringify(obj), "text/xml"); }
}
