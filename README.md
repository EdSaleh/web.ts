#web.ts
Create Web Apps the Object Oriented way.
An Easier, Faster, and Efficient way to create websites. 

* For pages, you create a ts class file that extends web.ts.Page. You fetch a document and populate, then render it by implement View() and Render() methods and start the process using instance.Load() method 

* For lists, create a ts class that extends web.ts.List<T>.  You fetch a document and populate (Add() each item individually) items using the template document render them by implement View(), Add(), Remove() methods in class and start process using instance.List(arr:T).

* Use switch(hash) cases of main() method in web.ts to load/List a specific Page or List object on a specific hash name. Hash links with "web" css class will continue to work even if "onhashchange" event isn't supported as pages will reload automatically when this happens.

##Pages
1. Implement the View() Method to return the location of the view page you would like to show, for example, "/Page1.txt".
You can also return #element (id of an element), which returns the outerHTML content of an element in the document page. The View source file can be designed with HTML Designer softwares.
You can use the View() Method to prepare the document before View(), it will be used once internally.

2. Implement the Render(document) method callback which is used to render the content when it's already available.

3. create instance of this class and call Load() method to ask to fethch the document in View() and Render(doc) when it's finished fetching.

4. Pages are loaded when a Url change is detected and load a different page based on the name of the Hash. 

##Lists
1. Implement the Add() and Remove() Method to be used in adding or removing items. And implement View() method to return the document that will be used in rendering.
List class uses Load() and Render() of the page extension internally and the methods, in addition to View() behave the same as Page class.

2. Create an Instance of the class and call List(arr:T) to start the process.