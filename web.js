var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Web.ts
var web;
(function (web) {
    var ts;
    (function (ts) {
        function main(e) {
            /*
                code
             */
            //code for pages
            switch (window.location.href.substr(window.location.href.lastIndexOf("#") + 1)) {
                case "":
                case "Index":
                default:
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
                            document.title = "Index";
                            document.getElementById("content").innerHTML = doc.body.innerHTML;
                        };
                        ;
                        return Index;
                    })(web.ts.Page);
                    (new Index());
                    break;
                case "element":
                    //get Template from an element on Page(web ts css class makes the element hidden)
                    var example = (function (_super) {
                        __extends(example, _super);
                        function example() {
                            _super.apply(this, arguments);
                        }
                        //public Renderer: Function;
                        example.prototype.view = function () {
                            return "#element"; //(get element with id #)
                        };
                        example.prototype.render = function (doc) {
                            document.title = "Element";
                            document.getElementById("content").innerHTML = doc.body.innerHTML;
                        };
                        ;
                        return example;
                    })(web.ts.Page);
                    (new example());
                    break;
                case "list":
                    var List_1 = (function (_super) {
                        __extends(List_1, _super);
                        function List_1() {
                            _super.apply(this, arguments);
                        }
                        List_1.prototype.view = function () {
                            return "#element"; // just use the current document as the view. 
                        };
                        List_1.prototype.add = function (item, i, doc) {
                            var _this = this;
                            if (doc === void 0) { doc = this.doc; }
                            var elm = docElement(doc);
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
                        List_1.prototype.set = function (fill, doc) {
                            if (fill === void 0) { fill = true; }
                            document.getElementById("content").innerHTML = "";
                            if (fill) {
                                var strs = ["click on any item to remove", "a", "b", "c"];
                                this.list(strs);
                                this.add("d");
                                this.remove(null, 2);
                                this.list(["e", "f", "g"]);
                            }
                        };
                        return List_1;
                    })(web.ts.List);
                    var list = new List_1(); //Do the operation
                    break;
                case "view":
                    //View Example
                    var View_1 = (function (_super) {
                        __extends(View_1, _super);
                        function View_1() {
                            _super.apply(this, arguments);
                        }
                        View_1.prototype.apply = function (text, doc) {
                            if (doc === void 0) { doc = this.doc; }
                            var elm = doc.body.children[0];
                            document.title = "View Element";
                            elm.textContent = "a document fetched using View() class. apply() is used to change and apply new items to the template elemnet";
                            document.getElementById("content").appendChild(elm);
                        };
                        View_1.prototype.view = function () { document.getElementById("content").innerText = ""; return "#element"; };
                        return View_1;
                    })(web.ts.View);
                    var view = new View_1();
                    break;
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
            }
            else {
                //If not supported
                var elms = document.getElementsByTagName("a");
                for (var i = 0; i < elms.length; i++)
                    if (elms[i].classList.contains("web")) {
                        elms[i].onclick = function () {
                            window.location.reload();
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
                if (view != null && view.length > 1) {
                    if (view[0] != "#") {
                        var xhttp = new XMLHttpRequest();
                        xhttp.onload = function () { return _this.render(TextToDocument(xhttp.responseText)); };
                        xhttp.open("GET", view, true);
                        xhttp.send();
                    }
                    else {
                        this.render(TextToDocument(document.getElementById(view.substr(1)).outerHTML));
                    }
                }
            };
            return Page;
        })();
        ts.Page = Page;
        function TextToDocument(text) {
            return (new DOMParser().parseFromString(text.replace(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi, text.match(/(class( *)=["'][ \-\w]*web ts[ \-\w]*["'])?/gi)[0].replace(" ts", "")).replace(/(id( *)=["'][ \-\w]*["'])?/gi, ""), "text/html"));
        }
        var View = (function (_super) {
            __extends(View, _super);
            function View() {
                _super.call(this);
                this.doc = document;
            }
            View.prototype.view = function () { return null; };
            //Application method to apply work on the view
            View.prototype.apply = function (item, doc) {
                if (doc === void 0) { doc = this.doc; }
            };
            View.prototype.render = function (doc) {
                this.doc = doc;
                this.apply(null);
            };
            return View;
        })(Page);
        ts.View = View;
        var List = (function (_super) {
            __extends(List, _super);
            function List() {
                _super.call(this);
                this.doc = document;
            }
            //Add and Remove Items Template
            List.prototype.add = function (item, i, doc) {
                if (i === void 0) { i = null; }
                if (doc === void 0) { doc = this.doc; }
            };
            List.prototype.remove = function (item, i, doc) {
                if (i === void 0) { i = null; }
                if (doc === void 0) { doc = this.doc; }
            };
            List.prototype.set = function (fill, doc) {
                if (fill === void 0) { fill = true; }
                if (doc === void 0) { doc = this.doc; }
            };
            List.prototype.length = function () { };
            List.prototype.render = function (doc) {
                this.doc = doc;
                this.set();
            };
            //Start List Item Function
            List.prototype.list = function (items) {
                for (var i = 0; i < items.length; i++) {
                    this.add(items[i]);
                }
            };
            return List;
        })(Page);
        ts.List = List;
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
        function docElement(doc) {
            return (doc.body.firstChild.cloneNode(true));
        }
        ts.docElement = docElement;
    })(ts = web.ts || (web.ts = {}));
})(web || (web = {}));
//# sourceMappingURL=web.js.map