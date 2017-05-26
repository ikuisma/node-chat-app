# Node Chat App

This is a very simple chat application made with Node.js for a university summer course. The application allows users to join a room, send messages to the room and share their location. Access is limited to one user and room per browser session. No sign up is required and the selected username is reserved for the duration of the session. 

## Getting Started

### Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) installed on your machine in order to run the application. No other installations are required.

### Installing

Clone this repository to your local machine, navigate to the root directory and execute `npm install` from the command line. All the required modules will be downloaded. You can start the application by executing `node server/server.js` from the root directory. The application will be hosted at localhost:3000/ on your machine. 

## Running the tests

The tests use the Mocha framework which is included in the package. In order to run the tests, simply execute `npm test` frmo the command line at the root directory of the project. 

## Deployment

The application will look for a `PORT` system variable and if none is found it will default to 3000. Set the `PORT` system variable on the server before deploying.    

## Authors

* **Ilkka Kuisma** - *Initial work* 

## License

This project is licensed under the MIT License. 

## Acknowledgments

* Coffee & Pepsi Max - I couldn't have done it without you. 
