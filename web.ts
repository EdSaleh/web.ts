//Code
var extraTitle = " - Richmond Hill Veterinary House Call Services";

//Web.ts
window.onload = function (e) {
    web.ts.beforeLoad();
    switch (window.location.href.substr(window.location.href.lastIndexOf("#") + 1)) {
//change for pages
        case "/": default:
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
            (new Index()).Load();
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
							protected Wait() { }
							protected View(): string { return ""}
						}
						var arr[];
						list.List(arr);
					*/
					var container = document.getElementById("content");
                    container.textContent = "";
                    container.appendChild(doc.querySelector("*"))
                };
            }
            (new example()).Load(); break;
		//************End Change*******************
    }
    web.ts.afterLoad();
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
        protected Wait() {  web.ts.wait();}
        public Load() {
            this.Wait();
           if (this.View() != null && this.View().length > 1) {
                if (this.View()[0] != "#") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = () => this.Render(<Document>(new DOMParser().parseFromString(xhttp.responseText.replace(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi, xhttp.responseText.match(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi)[0].replace(" ts", "")), "text/html")));
                    xhttp.open("GET", this.View(), true);
                    xhttp.send();
                } else {
                    var elm: HTMLElement = document.getElementById(this.View().substr(1));
                    elm.className.replace("ts", ""); 
                    this.Render(<Document>new DOMParser().parseFromString(elm.outerHTML, "text/html"));
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
    export var wait: Function = function () {
        //can change this
        var waitDiv = document.createElement("div"); waitDiv.setAttribute("style", "width:100%; height:250px; background:url(/Images/spinner.gif) no-repeat; background-position:center;"); document.getElementById("content").innerHTML = waitDiv.outerHTML;
    }
    export var beforeLoad: Function = function () {
        var elms = document.querySelectorAll("nav ul li");
        for (var i = 0; i < elms.length; i++) (<HTMLElement>elms[i]).classList.remove("active");
        web.ts.wait = function () { };    //override wait
    }
    export var afterLoad: Function = function () { }
}
