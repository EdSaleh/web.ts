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
                            document.title = "Index";
                            document.getElementById("content").innerHTML = ts.getElement(doc).innerText;
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
                            var elm = ts.getElement(document.getElementById("element"));
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
    })(ts = web.ts || (web.ts = {}));
})(web || (web = {}));
//# sourceMappingURL=webmain.web.js.map