#web.ts
Create Web Apps using Object Oriented MVC architecture.

web.ts is designed to make web design better using Object Oriented programing and MVC architecture where is there separation between Views(HTML/CSS) and Controller(.ts classes) in Typescript to create native OO and asynchronous(AJAX) apps. Hence, due to separation, Views are designed using Interactive Web Design softwares such as Visual Studio WebForm Designer and the Controllers are Typescript classes extending WebDocument, WebList or implementing WebView. The framework uses TypeScript and easy to learn.

##main() method:
Allows to execute or create components using hash-link anchors when navigating. 
Cases can be chosen based on specific hash command with format #hash-command[ /?]args...
##WebView Component:
Download a document from the Internet and use it in your page. 
This component has two methods:-
view(): contains the location of the document to be downloaded. If you location last word after “/” contains a “.” Ex: /file.txt it will do a get request, else or it contains a “?” Or ends with “/” it will do a post request.
result(doc:Document): callback with the do omens when it’s finished downloading.
##WebView<T> Interface Component:
Contains apply(item:T) method to use on a specific area on your page document.
##WebList<T> Component:
It's a list component with methods such as add/remove(item:T, I?:number), reset(), and length():number that will need to be implemented to create a functional list. addRange(items:T[], I?:number) is already implemented and will use implementation of add() method internally. More methods can be added or creating a constructor if desired to the extending class.


[Open Source Project Website Link](https://github.com/medozs/web.ts)

[Gif Tutorial](https://github.com/medozs/web.ts/blob/master/example.gif)
