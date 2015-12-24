module web.ts {
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
            if (view != null && view.length > 1 && view[0] != "#") {
                var xhttp = new XMLHttpRequest();
                xhttp.onload = () => this.render(TextToDocument(xhttp.responseText));
                xhttp.open(view.lastIndexOf("?")<0 && view.lastIndexOf(".") > view.lastIndexOf("/")?"GET":"POST", view, true);
                xhttp.send();
            }
        }
    }
    function TextToDocument(text: string): Document {
        return <Document>(new DOMParser().parseFromString(text, "text/html"));
    }

    export interface  View<T> {
        //Application method to apply work on the view
        apply(item: T);
    }

    export abstract class List< T > {
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
            return (<HTMLElement>((<Document>edoc).body.firstChild.cloneNode(true)));
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