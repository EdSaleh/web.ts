#web.ts
Create Web Apps using Object Oriented MVC architecture.

web.ts is designed to make web design better using Object Oriented programing and MVC architecture where is there separation between Views(HTML/CSS) and Controller(.ts classes) in Typescript to create native OO and asynchronous(AJAX) apps. 
Due to the separation, views can be easily designed using Interactive Web Design softwares such as Visual Studio WebForm Designer and the Controllers are Typescript classes extending WebDocument, WebList or implementing WebView. The framework uses TypeScript and easy to learn.
History and same hash navigation is supported.

##WebView Component:
Download a document from the Internet and use it in your page. 
This component has two methods:-
view(): contains the location of the document to be downloaded. If you location last word after “/” contains a “.” Ex: /file.txt it will do a get request, else or it contains a “?” Or ends with “/” it will do a post request.
result(doc:Document): callback with the document when it’s finished downloading.
getElement(doc) method takes first div clone in the document.
##WebView<T> Interface Component:
Contains apply(item:T) method to use on a specific area on your page document. getElement(elm) removes "ts" class and id from clone, displaying it.
##WebList<T> Component:
It's a list component with methods such as add/remove(item:T, I?:number), reset(), and length():number that will need to be implemented to create a functional list. addRange(items:T[], I?:number) is already implemented and will use implementation of add() method internally. More methods can be added or creating a constructor if desired to the extending class.
##General:
* main() Method: Allows to execute or create components using hash-link anchors when navigating,
Switch cases can be assigned based on specific hash command with format #hash-command[/?]args..
* You use hashCommand():string, hashArgs():Object to get the command and the arguments, and hashFile():string to get the file path before hash.
* .web.ts elements are hidden elements.
* a.web are specialized web.ts hash-links - anchors not including "#" in [href] will converted to Hijax links, making this link navigate to /#!/[href(no extensions)] ex: href="Page.html" automatically or use [webhref] as navigation link if found.

[Open Source Project Website Link](https://github.com/medozs/web.ts)
