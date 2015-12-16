# web.ts
Create Web Apps the Object Oriented way.
An Easier, faster, and efficient way to create websites. 
*First, you create a ts class file that extends web.ts.Page. 
*Second, Implement the View() Method to return the location of the view page you would like to show, for example, "/Page1.txt".
You can also return #element (id of an element), which returns the outerHTML content of an element in the document page. The View source file can be designed with HTML Designer softwares.
*Third, you implement the Render(document) method callback which is used to render the content when it's already available.
*Forth, create instance of this class and cal Load() method to ask to fethch the document in View() and Render(doc) when it's finished fetching.
*Fifth, Pages are loaded when a Url change is detected and load a different page based on the name of the Hash. 
