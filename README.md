# Mitroon

> A platform that lets you make friends online just like you do in real life.

This is a MERN stack application. It is a small [social network app](https://www.mitroon.herokuapp.com) that includes authentication, authorization, user profiles and forum posts.

## Table of contents

-   [Roadmap](#roadmap)
-   [Contribution guidelines](#contribution-guidelines)
-   [Setup](#setup)
-   [Honorable mentions](#honorable-mentions)
-   [App info](#app-info)

## Roadmap

> COMING SOON.

## Contribution guidelines

> COMING SOON.

## Setup

#### Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret"
}
```

#### Install server dependencies

```bash
npm install
```

#### Install client dependencies

```bash
cd client
npm install
```

#### Run both Express & React from root

```bash
npm run dev
```

#### Build for production

```bash
cd client
npm run build
```

#### Test production before deploy

```bash
NODE_ENV=production node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

## Honorable mentions

-   [MERN Stack Front To Back](https://www.udemy.com/mern-stack-front-to-back) course by Brad Traversy
-   [Node.js: The complete bootcamp 2020](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp) course by Jonas Schmedtmann
-   [React Redux Firebase](https://www.udemy.com/course/build-an-app-with-react-redux-and-firestore-from-scratch) course by Neil Cummings

## App Info

#### Author

Sibasish Mohanty

#### Version

0.1.1

#### License

This project is licensed under the MIT License.
