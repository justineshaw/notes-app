# Notes App

By [Justin Shaw](mailto:easyworkemail@gmail.com)

[github.com/justineshaw](https://github.com/justineshaw)

<a href="https://www.youtube.com/watch?v=9XuHW5r782c&feature=youtu.be" target="_blank"><img src="http://img.youtube.com/vi/9XuHW5r782c/0.jpg" alt="real leads" width="240" height="180"/></a>

## Instructions

1. Navigate to [repo](https://github.com/justineshaw/notes-app)
2. Clone locally using
   `git clone https://github.com/justineshaw/notes-app.git`
3. Install dependencies by using `npm install` in both the `client` and `backend` directories
4. Run tests using `jest` in `backend` directory
5. Start app front-end using `npm start` in `client` directory
6. Start the server using `npm start` in `backend` directory
7. Navigate to app in [browser](http://localhost:3000/)
8. Have fun!

## Discussion

I used the following technologies: HTML, CSS, React, Axios, Jest, 
Express, Express Validator and Lowdb.

I used [create-react-app](https://github.com/facebook/create-react-app) 
to generate the scaffolding for the app front-end.

I used [express-generator](https://www.npmjs.com/package/express) 
to generate the scaffolding for this server.

## Requirements Met

#### Build a notes app to display a list of notes using a frontend framework, a service, and persistence.

I used `React`, `Express`, and `Lowdb` to create an app that displays a list of notes that are persisted from a database. The app also offers immediate feedback to users so they know a new note was successfully added to the database.

#### Notes should be persisted and retrieved via a service, where the user can (1) add a note (2) edit a note and (3) access a note directly via a url.

I built an API that has `GET`, `POST`, and `PUT` endpoints so the `React` frontend can access endpoints exposed by the server and access particular data in the database.

## Stretch Goals!

#### Include Input Validation

I used `Express Validator` to perform server-side Input Validation. For example, the user is prevented from entering an empty string/note. Also, if a user enters an invalid note index, they are notified.

#### Include Unit Testing

I used `Jest` to create 4 unit tests to ensure that an HTTP request to the API yields the expected response.
