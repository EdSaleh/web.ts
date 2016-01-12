var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* @preserve web.ts | @medozs | MIT/GPL2 Licensed | Open Source at github.com/medozs/web.ts
*/
var web;
(function (web) {
    var ts;
    (function (ts) {
        function main() {
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
                    var Index = (function (_super) {
                        __extends(Index, _super);
                        function Index() {
                            _super.apply(this, arguments);
                        }
                        //view page for action
                        Index.prototype.view = function () {
                            return "./Page.html";
                        };
                        //how to render document method
                        Index.prototype.result = function (doc) {
                            document.getElementById("content").innerHTML = getElement(doc).outerHTML + "<br/>" + new Date().toLocaleString();
                        };
                        ;
                        return Index;
                    })(WebDocument);
                    (new Index());
                    break;
                case "view":
                    document.title = "web.ts - View";
                    var example = (function () {
                        function example() {
                        }
                        //apply string on an element
                        example.prototype.apply = function (text) {
                            document.getElementById("content").innerHTML = text;
                        };
                        ;
                        return example;
                    })();
                    (new example()).apply(new Date().toLocaleString());
                    break;
                case "list":
                    document.title = "web.ts - List";
                    var List = (function (_super) {
                        __extends(List, _super);
                        function List() {
                            _super.apply(this, arguments);
                        }
                        List.prototype.add = function (item, i) {
                            var _this = this;
                            //get Template from an element on Page(web ts css class makes the element hidden)
                            var elm = getElement(document.getElementById("element"));
                            elm.innerText = item;
                            elm.onclick = function () { return _this.remove(item); };
                            document.getElementById("content").appendChild(elm);
                        };
                        List.prototype.remove = function (item, i) {
                            if (i === void 0) { i = null; }
                            if (item != null) {
                                var elms = document.getElementById("content").children;
                                for (var index = 0; index < elms.length; index++)
                                    if (elms[index].innerText == item)
                                        elms[index].remove();
                            }
                            else if (i != null) {
                                document.getElementById("content").children[i].remove();
                            }
                        };
                        List.prototype.length = function () { return null; };
                        List.prototype.reset = function () {
                            document.getElementById("content").innerHTML = "";
                        };
                        return List;
                    })(WebList);
                    var list = new List();
                    var strs = ["click on any item to remove", "a", "b", "c"];
                    list.addRange(strs);
                    list.add("d");
                    list.remove(null, 2);
                    break;
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
                    var elm = elms[i];
                    if (elm.classList.contains("web")) {
                        elm.onclick = function () {
                            var thelm = this;
                            if (window.location.pathname + window.location.search + window.location.hash != (thelm.getAttribute("href").charAt(0) != "/" ? "/" : "") + thelm.getAttribute("href")) {
                                history.pushState("", document.title, ((thelm.getAttribute("href") + "").charAt(0) != "/" ? "/" : "") + thelm.getAttribute("href"));
                                main();
                                history.replaceState("", document.title, ((thelm.getAttribute("href") + "").charAt(0) != "/" ? "/" : "") + thelm.getAttribute("href"));
                            }
                            else
                                main();
                            return false;
                        };
                    }
                }
            }
            else if ('onhashchange' in window || window.onhashchange) {
                onhashchange = main;
                for (var i = 0; i < elms.length; i++) {
                    var elm = elms[i];
                    if (elm.classList.contains("web")) {
                        elm.onclick = function () {
                            var thelm = this;
                            if (window.location.hash != "#" + thelm.getAttribute("href"))
                                window.open("#" + thelm.getAttribute("href"), "_self");
                            else
                                main();
                            return false;
                        };
                    }
                }
            }
        };
        /*** web.ts components ***/
        //Hide Templates
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.web.ts { display: none; clear:both; }';
        document.getElementsByTagName('head')[0].appendChild(style);
        function command() {
            return window.location.hash + "" != "" ? window.location.hash.replace("?", "/").replace("#/", "#!/").substr(window.location.hash.replace("#/", "#!/").indexOf("!/") + 2).split("/")[0] : window.location.pathname.substr(1).split("/")[0];
        }
        ts.command = command;
        function args() {
            var args = "";
            if (window.location.hash + "" != "")
                args = window.location.hash.replace("#/", "#!/").substr(window.location.hash.replace("#/", "#!/").indexOf("!/") + 2).split("?")[(window.location.hash + "").indexOf("?") < 0 ? 0 : 1];
            else
                args = ((window.location.search + "" != "") ? window.location.search : window.location.pathname).substr(1);
            if (args.length > 0)
                args = args.replace("/", "=");
            var pairs = args.split('&');
            var result = {};
            pairs.forEach(function (pair) {
                var kv = pair.split('=');
                result[kv[0]] = decodeURIComponent(kv[1] || '');
            });
            return JSON.parse(JSON.stringify(result));
        }
        ts.args = args;
        //create Query String from object
        function createQueryString(obj) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        }
        ts.createQueryString = createQueryString;
        /*** Library ***/
        var WebDocument = (function () {
            function WebDocument() {
                this.load();
            }
            //Loading Function
            WebDocument.prototype.load = function () {
                var _this = this;
                var view = this.view();
                if (view != null && view.length > 1 && view[0] != "#") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = function () { return _this.result(TextToDocument(xhttp.responseText)); };
                    xhttp.open(view.lastIndexOf("?") < 0 && view.lastIndexOf(".") > view.lastIndexOf("/") ? "GET" : "POST", view, true);
                    xhttp.send();
                }
            };
            return WebDocument;
        })();
        ts.WebDocument = WebDocument;
        function TextToDocument(text) {
            return (new DOMParser().parseFromString(text, "text/html"));
        }
        var WebList = (function () {
            function WebList() {
                this.reset();
            }
            //Start List Item Function
            WebList.prototype.addRange = function (items, i) {
                if (i === void 0) { i = this.length(); }
                for (var indx = 0; indx < items.length; indx++) {
                    this.add(items[indx], i + indx);
                }
            };
            return WebList;
        })();
        ts.WebList = WebList;
        function getElement(edoc) {
            if (edoc.nodeName.toLowerCase() === "#document") {
                return (edoc.getElementsByTagName("div")[0].cloneNode(true));
            }
            else {
                var elm = (edoc.cloneNode(true));
                elm.classList.remove("ts");
                elm.id = "";
                return elm;
            }
        }
        ts.getElement = getElement;
        //ajax get resource
        function get(url, callback, data, timeout, timeoutcallback, type, async) {
            if (data === void 0) { data = null; }
            if (timeout === void 0) { timeout = 4000; }
            if (timeoutcallback === void 0) { timeoutcallback = function () { }; }
            if (type === void 0) { type = "GET"; }
            if (async === void 0) { async = true; }
            var xhttp = new XMLHttpRequest();
            xhttp.onload = callback();
            xhttp.timeout = timeout;
            xhttp.ontimeout = timeoutcallback();
            xhttp.open(type, url, async);
            xhttp.send(data);
        }
        ts.get = get;
    })(ts = web.ts || (web.ts = {}));
})(web || (web = {}));
//# sourceMappingURL=web.js.map