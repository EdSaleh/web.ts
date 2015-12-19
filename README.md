#web.ts
Create Web Apps the Object Oriented way.
An Easier, Faster, and Efficient way to create websites. 

* For pages, you create a ts class file that extends web.ts.Page. You fetch a and prepare document using View() implement and populate using Render() implement. View is called once for the class and all Subclasses. Process are started after Instantiation. 

* For lists, it extends pages; create a ts class that extends web.ts.List<T>.  You fetch a document from View() implement and populate (Add() Implement each item individually), and Remove. Process are started after Instantiation(arr:T)

* For views, it extends pages; create a ts class that extends web.ts.View<T>.  You fetch a document from View() implement and populate using Apply(item:T, doc:?Document). Every time Apply(item:T) is called, it preforms the action. Process are started after Instantiation(item:T)

* Use switch(hash) cases of main() method in web.ts to start the process for specific Page or List or View object on a specific hash name. Hash links with "web" css class will continue to work even if "onhashchange" event isn't supported as pages will reload automatically when this happens.

##Pages
1. Implement the View() Method to return the location of the view page you would like to show, for example, "/Page1.txt".
You can also return #element (id of an element), which returns the outerHTML content of an element in the document page. The View source file can be designed with HTML Designer softwares.
You can use the View() Method to prepare the document before View(), it will be used once internally.

2. Implement the Render(document) method callback which is used to render the content when it's already available.

3. create instance of this and it starts automatically.

4. Pages are loaded when a Url change is detected and load a different page based on the name of the Hash. 

##Lists
1. Implement the Add() and Remove() Method to be used in adding or removing items. And implement View() method to return the document that will be used in rendering.
List class uses Load() and Render() of the page extension internally and the methods, in addition to View() behave the same as Page class.

2. Create an Instance of and it(arr:T[]) and starts automatically.

##Views
1. Implement the Apply(item:T,doc:?Document) Method to apply the action with item on doc. And implement View() method to return the document that will be used in rendering.

2. Create an Instance of and it(arr:T[]) and starts automatically.