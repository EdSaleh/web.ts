var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var web;
(function (web) {
    var ts;
    (function (ts) {
        function main() {
            /*
                code
             */
            //code for pages
            var path = (window.location.href.substr(window.location.href.lastIndexOf("#") + 1));
            var pathIndxSlash = path.indexOf("/"), pathIndxQuestion = path.indexOf("?");
            switch (path.substr(0, pathIndxSlash < pathIndxQuestion && pathIndxSlash > 0 ? pathIndxSlash : (pathIndxQuestion < pathIndxSlash && pathIndxQuestion > 0 ? pathIndxQuestion : path.length))) {
                case "":
                case "Index":
                case "Page":
                default:
                    document.title = "web.ts - Page";
                    var Index = (function (_super) {
                        __extends(Index, _super);
                        function Index() {
                            _super.apply(this, arguments);
                        }
                        //view page for action
                        Index.prototype.view = function () {
                            return "/Index.txt";
                        };
                        //how to render document method
                        Index.prototype.render = function (doc) {
                            document.getElementById("content").innerHTML = getElement(doc).innerText;
                        };
                        ;
                        return Index;
                    })(web.ts.Page);
                    (new Index());
                    break;
                case "view":
                    document.title = "web.ts - View";
                    //get Template from an element on Page(web ts css class makes the element hidden)
                    var example = (function () {
                        function example() {
                        }
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
                    var List_1 = (function (_super) {
                        __extends(List_1, _super);
                        function List_1() {
                            _super.apply(this, arguments);
                        }
                        List_1.prototype.add = function (item, i) {
                            var _this = this;
                            var elm = getElement(document.getElementById("element"));
                            elm.innerText = item;
                            elm.onclick = function () { return _this.remove(item); };
                            document.getElementById("content").appendChild(elm);
                        };
                        List_1.prototype.remove = function (item, i) {
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
                        List_1.prototype.length = function () { return null; };
                        List_1.prototype.reset = function () {
                            document.getElementById("content").innerHTML = "";
                        };
                        return List_1;
                    })(web.ts.List);
                    var list = new List_1(); //Do the operation
                    document.getElementById("content").innerHTML = "";
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
        //Assign main() to Events
        window.onload = function () {
            main();
            var elms = document.getElementsByTagName("a");
            for (var i = 0; i < elms.length; i++) {
                if (elms[i].classList.contains("web")) {
                    elms[i].onclick = function () {
                        window.location.href = this.href;
                        main();
                        return false;
                    };
                }
            }
        };
        /*** web.ts libraries ***/
        //Hide Templates
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.web.ts { display: none; }';
        document.getElementsByTagName('head')[0].appendChild(style);
        /*** Library ***/
        var Page = (function () {
            function Page() {
                this.load();
            }
            //Loading Function
            Page.prototype.load = function () {
                var _this = this;
                var view = this.view();
                if (view != null && view.length > 1 && view[0] != "#") {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = function () { return _this.render(TextToDocument(xhttp.responseText)); };
                    xhttp.open(view.lastIndexOf("?") < 0 && view.lastIndexOf(".") > view.lastIndexOf("/") ? "GET" : "POST", view, true);
                    xhttp.send();
                }
            };
            return Page;
        })();
        ts.Page = Page;
        function TextToDocument(text) {
            return (new DOMParser().parseFromString(text, "text/html"));
        }
        var List = (function () {
            function List() {
            }
            //Start List Item Function
            List.prototype.addRange = function (items, i) {
                if (i === void 0) { i = this.length(); }
                for (var indx = 0; indx < items.length; indx++) {
                    this.add(items[indx], i + indx);
                }
            };
            return List;
        })();
        ts.List = List;
        function getElement(edoc) {
            if (edoc.nodeName.toLowerCase() === "#document") {
                return (edoc.body.firstChild.cloneNode(true));
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
        function get(url, callback, timeout, timeoutcallback, type, async) {
            if (timeout === void 0) { timeout = 4000; }
            if (timeoutcallback === void 0) { timeoutcallback = function () { }; }
            if (type === void 0) { type = "GET"; }
            if (async === void 0) { async = true; }
            var xhttp = new XMLHttpRequest();
            xhttp.onload = callback();
            xhttp.timeout = timeout;
            xhttp.ontimeout = timeoutcallback();
            xhttp.open(type, url, async);
            xhttp.send();
        }
        ts.get = get;
    })(ts = web.ts || (web.ts = {}));
})(web || (web = {}));
//# sourceMappingURL=web.js.map