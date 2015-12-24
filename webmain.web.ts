//Web.ts
module web.ts {
    function main(e): void {
        /* 
            code
         */
        //code for pages
        var path: string = (window.location.href.substr(window.location.href.lastIndexOf("#") + 1));
        var pathIndxSlash: number = path.indexOf("/"), pathIndxQuestion: number = path.indexOf("?");
        switch (path.substr(0, pathIndxSlash < pathIndxQuestion && pathIndxSlash > 0 ? pathIndxSlash : (pathIndxQuestion < pathIndxSlash && pathIndxQuestion > 0 ? pathIndxQuestion : path.length))) {
            case "": case "Index": case "Page": default:
                document.title = "web.ts - Page";
                class Index extends web.ts.Page {
                    //view page for action
                    protected view(): string {
                        return "/Index.txt";
                    }
                    //how to render document method
                    protected render(doc: Document) {
                        document.title = "Index";
                        document.getElementById("content").innerHTML = getElement(doc).innerText;
                    };
                } (new Index());
                break;
            case "view":
                document.title = "web.ts - View";
                //get Template from an element on Page(web ts css class makes the element hidden)
                class example implements web.ts.View<string> {
                    public apply(text: string) {
                        document.getElementById("content").innerHTML = text;
                    };
                } (new example()).apply(new Date().toLocaleString());
                break;
            case "list":
                document.title = "web.ts - List";
                class List extends web.ts.List<string>{
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
                    public length() { return null;}
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
}