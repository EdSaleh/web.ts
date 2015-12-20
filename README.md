#web.ts
Create Web Apps the Object Oriented way.
An Easier, Faster, and Efficient way to create websites with MVC architecture.

##Introduction
web.ts is designed to make web design easier by using Object Oriented programing where is there separation between views(HTML/CSS) and Controller(.ts classes) in Typescript to create native OO and asynchronous(AJAX) apps. views are designed using Interactive Web Design softwares such as Visual Studio WebForm Designer and the Controllers are Typescript classes of Page, List, and view.


Web Developers are facing problems while designing websites. Javascript and HTML/CSS are all mixed together without structure or organization. With web.ts, there is separation between views and Controllers, also Models to achieve MVC, which is best recommended type of architecture. You will not need to learn any new techniques or languages for as Typescript is merely Javascript with OO added(Future JS), and the library is simple and easy to follow.

##Object Classes(Components)
* For pages, you create a ts class file that extends web.ts.Page. You fetch a and prepare document using view() implement and populate using render() implement. view is called once for the class and all Subclasses. Process are started after Instantiation. 

* For lists, it extends Page class; create a ts class that extends web.ts.List<T>.  You fetch a document from view() implement and populate (add() Implement each item individually), and remove(). Process are started after Instantiation(arr:T)

* For views, it extends Page class; create a ts class that extends web.ts.view<T>.  You fetch a document from view() implement and populate using apply(item:T, doc:?Document). Every time apply(item:T) is called, it preforms the action. Process are started after Instantiation(item:T)

* Use switch(hash) cases of main() method in web.ts to start the process for specific Page or List or view object on a specific hash name so pages are loaded when a Url change is detected and load different pages based on the name of the Hash. links(a element) with "web" css class will continue to work even if "onhashchange" event isn't supported as pages will reload automatically when this happens. Use Interactive Web Design tool for HTML/CSS such as Visual Studio WebForm design mode to design the view. The view can be an element on the document or a seperate html file document that can be fetched.

###Pages
1. Implement the view() Method to return the location of the view page you would like to show, for example, "/Page1.txt".
You can also return #element (id of an element) which could be hidden using "web ts" class, which returns the outerHTML content removing " ts" class of an element in the document page. The view source file can be designed with Interactive HTML Designer softwares such as the free Viusal Studio WebForm design.
You can use the view() Method to prepare the document before view(), it will be used once internally.

2. Implement the render(document) method callback which is used to render the content when it's already available.

3. Create instance of this and it starts automatically.

###Lists
1. Implement the add() and remove() Method to be used in adding or removing items. And implement view() method to return the document that will be used in rendering.
List class uses load() and render() of the page extension internally and the methods, in addition to view() behave the same as Page class.

2. Create an Instance of and it(arr:T[]) and starts automatically.

###views
1. Implement the apply(item:T,doc:?Document) Method to apply the action with item on doc. And implement view() method to return the document that will be used in rendering or not if you want to use the current document as the template.

2. Create an Instance of and it(arr:T[]) and starts automatically.

[Open Source Project Website Link](https://github.com/medozs/web.ts)
