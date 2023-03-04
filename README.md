# FoundInTranslation
<br>

### Brief
This project was developed during the Mountain Madness Hackathon held by CSSS (Computer Science Student Society) of Simon Fraser University.


### Description
This game is written in Javascript for back-end and routing and utilizes JQuery and HTML/CSS for a beautiful yet simple front-end.
It loads questions from a remote database hosted on FireBase using REST APIs and JQuery Ajax.


### User Stories
The user will be presented with a random sentence from a random language and 4 choices of which one is correct and the rest incorrect. They can select one of the 4 choices and then by clicking "Check", they may verify their answer. Further, they can proceed to the next question by clicking "Next".

### How to Run
Simply clone this repository into your local computer and run:
```
npm install
```
This will install all the required dependancies including ```express.js```.

Next, you may run the website on your localhost by typing this command:
```
node index.js
```
This will run the server for our application. All you need to do now is to open your favorite browser (e.g. Google Chrome) and open ```localhost:3000```.

This is a screenshot from the game:
![A screenshot of the game UI](https://i.imgur.com/PGQuMn4.png)
