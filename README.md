# 🦷 Tooth Inc. MERN application

### Louise Flanagan & Catherine Callcott-Stevens

![Twitter Follow](https://img.shields.io/twitter/follow/flangerhanger?&style=flat&logo=twitter&logoColor=white) ![Twitter Follow](https://img.shields.io/twitter/follow/catcstevens?&style=flat&logo=twitter&logoColor=white)

---

💎 Deployed App: https://www.toothinc.online/
🛠 Staging Environment App: https://www.development.toothinc.online/
🖥 Client Repo: https://github.com/The-Tooth-Business/client
🖥 Server Repo: https://github.com/The-Tooth-Business/server
📖 Part A Documentation Repo: https://github.com/The-Tooth-Business/TheToothFairyDocs

ToothInc.online is a comprehensive booking management system for the Tooth Fairy and a place for parents to book tooth collections. The application has been built with the MERN stack and deployed with Netlify and Heroku.

## Installation Instructions

To use the production app, please visit toothinc.online and create an account.
To use the app locally, please follow the below instructions.

Requirements:

- Node.js
- MongoDB. If you do not have MongoDB installed, please follow the installation instructions here (https://docs.mongodb.com/guides/server/install/) and make sure that Mongo is running locally.

Server:

- Create a directory on your machine named ToothInc and CD into it.
- Whilst in the ToothInc directory, from bash CLI, clone the server repo `$ git clone https://github.com/The-Tooth-Business/server.git`
- CD into the server folder `$ CD server`
- Install npm packages with `$ npm install`
- Make sure that Mongo is running.
- Seed the Mongo database with the following command `$ npm run seed` to view dummy data in your local application
- From bash, `npm start` to start the local server
- The server will run on local host 3030

Client:

- From bash, cd into the ToothInc directory and clone the client repo `$ git clone https://github.com/The-Tooth-Business/client.git`
- Move into the client folder `$ CD client`
- Install npm packages with `$ npm install` or `$ yarn install`
- Make sure that your local server is running.
- From bash, `$ npm start` or `$ yarn start` to start the local client
- The server will allow requests from local host 3000
- A browser window will open - this app has been developed and tested with Google Chrome.
- Enjoy :)

To view as admin:

- The seed data file created an admin account for you with the following credentials to login:
  username: FIC
  password: 123456

To view as a parent:

- The seed data file setup the below parent account with dummy data however you can now also create an account as a new user would.
  username: user1
  password: 123456

---

## API Endpoints

### Authentication:

- POST /auth/register
- POST /auth/login
- GET /auth/logout

### Bookings

- GET /bookings/
- GET /bookings/continent
- GET /bookings/:id
- POST /bookings
- DELETE /bookings/:id
- PATCH /bookings/:id

### Continents

- GET /continents/
- GET /continents/continent
- POST /continents
- DELETE /continents/:id
- PATCH /continents/:id

### Wishes

- GET /wishes/
- GET /wishes/:id
- POST /wishes
- DELETE /wishes/:id
- PATCH /wishes/:id

### Testing

The application has been tested in Chrome on Mac OS Catalina 10.15.6.

The production and development applications have both gone through extensive automated and manual testing with Postman, Mocha and Cypress.

Manual test logs:
Cypress Dashboard logs:

### Server Libraries & Dependencies:

- `express ^4.17.1` -
- `mongoose ^5.9.22` - Mongoose is an Object Data Modelling (ODM) library for MongoDB and Node.js. It allows the creation of strongly-typed schemas for MongoDB documents to provide data validation. Several models have been defined within the server containing Mongoose schemas to better structure and validate database documents.
- `mongoose-Seed ^0.6.0` - Used to create a seed script to seed the local database with default data.
- `mongoose-unique-validator` - A plugin which adds pre-save validation for unique fields within a Mongoose schema. This is used to add an extra layer of validation when new users create accounts.
- `express-session ^1.17.1` - Creates user sessions and stores the session data on the server and gives the client a session ID to access the data.
- `connect-mongo ^3.2.0` - Allows for user sessions created with express-session to be saved in the Mongo database. It automatically removes expired sessions based on the lifespan of the session set in app.js.
- `cors ^2.8.5` - CORS is a node.js package for middleware that enables cross origin resource sharing between the Express server and React client.
- `passport, passport-local and passport-local-mongoose` -
- `dotenv ^8.2.0` - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Env variables have been used to safely store information such as database keys and to conditionally determine which version of the client to connect with.
- `body-parser ^1.19.0` - Body parser extracts the entire body of an incoming request and exposes it on req.body. The body of incoming request objects contains information from the client to access the database and is used in the server for authentication.

#### Server Development dependencies

- `mocha ^8.0.1` - Testing framework used to unit test the different api endpoints within the server.
- `expect ^26.1.0` - as a dependency of mocha
- `nodemon ^2.0.4` -
- `prettier ^2.0.5` - Used to declare a pre-defined code format to maintain consistency across different developer machines.

### Client Libraries & Dependencies:

- `react ^16.13.1`: A Javascript Front-end library for building user interfaces. Maintained by Facebook.
- `react-dom ^16.13.1` -
- `react-router-dom ^5.2.0` -
- `react-scripts 3.4.1` -
- `react-simple-maps ^2.1.2` - Used to create the interactive map of bookings by country in the user dashboard.
- `react-tooltip ^4.2.7` - Used as a dependency to react-simple-maps, this package is used to create tooltips that appear over countries when they are hovered over on the interactive map.
- `material UI core & icons` - Material UI is a
- `axios` - Axios is a Javascript library used to make HTTP requests to the server from the client. Axios configuration has been set in src/config/api.js to use environment variables via `process.env`. Bookings, auth and fairy services each use axios to make HTTP requests to their dedicated api end points on the server.
- `chart.js` - A JavaScript library that provides simple and flexible charting. Chart.js was used to create the animated doughnut diagram displaying bookings by continent on the admin dashboard.
- `env-cmd ^10.1.0` -
- `moment ^2.27.0` -

#### Client Development dependencies

- `cypress ^4.10.0` -
- `eslint-plugin-cypress ^2.11.1` - An additional linter specifically for Cypress testing. Without this linter, VS Code does not recognise some of the Cypress functions as declared.
- `prettier ^2.0.5` - Used to declare a pre-defined code format to maintain consistency across different developer machines.

### Project management

In phase one of this project we undertook extensive market research and planning from briefs given to us by the client. We finished what would be the first sprint with the green-light to run with the project. A sprint review at the end of sprint one had most of the documentation completed:
![Trello at first sprint review](TrelloDay4.jpg)

We had done our preliminary sprint planning where we had added the most obvious tasks to the Trello, but at our agile ceremony we got out the user stories to effectively project manage. As we read through each user story we each discussed which tasks the story entailed. When we reached a consensus we would add the cards to the Trello. We also discussed which tasks were the most important to complete first and stared planning our sprints accordingly. We are a very effective agile team and agreed immediately on an effort estimation of getting as much done in the first two sprints as we could as our experience suggested the client would add new features as the project progressed. This was the longest ceremony and it helped us build a plan, using the Trello, with a comprehensive lists of tasks. The tasks were all given a due-date based on which sprint they were in, and a rating of easy, medium and hard. Tasks for the first sprint were given an estimated turnaround and then were allocated fairly. We were going to use planning poker, but it was quite hard in a team of two and we were pretty much in agreement of how long each task would take.

![Trello at first agile ceremony](TrelloDay5.jpg)
