# Project description
MeanCo is a single page MEAN app to help connect blood donors and patients who need blood. It allows donors to advertise their location, contact info and blood type and patients to see the world map of advertisements. The donor pins on the map are updated live with the help of web sockets so the patients won't miss any change to the listings they might be interesed in.

Donor? Click on the map to put down a blood offer pin. Patient? Check out the pins close to you.
https://meanco.herokuapp.com/

![map](http://i.imgur.com/dbEeYv1.gif)

# Steps to initialize and run the application

Prerequisites: Node 6.9.0 or higher and NPM 3 or higher

a. Install angular-cli globally: `npm install -g @angular/cli`  
b. Install dependencies: `npm install` (in project directory)  
c. Build for local instance envars: `ng build`   
d. Start application: `npm start`  

Running tests: `npm run test`
