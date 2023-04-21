# Northcoder News App

## Live Demo
https://nc-news-react.netlify.app/

## Description
This project is to showcases my Full Stack Development skills for modern Single Page Applications. This repository is for the front-end, you may find the back-end repository [here](https://github.com/northcoders/be-nc-news), which provisions the RESTful API with Express.

In terms of functionality, the application eables the logged in user to browse a list of articles by topics. The user may sort the articles in different perspectives. When clicking into an articles, the user is brought to a detail screen to view the whole article, as well as the comments left by the user or other users. She can choose to vote the article, post a new comment or delete a comment she has posted.

The techniques involved in building this font-end include:
1. React
    - Functional Components
    - States Management
    - Context
    - Effect Hook
    - Router
    - Modal
    - Optimistic Rendering
2. Basic CSS Styling
3. Responsive Web Design

## Prerequisites
- An Unix-like console, recommend Ubuntu 22.04, MacOS 13.3 or Windows 10 with WSL.
- NodeJS runtime environment, recommend 19.6.0 or above.
- Git command, recommend 2.34.1 or above.

## Setup Instructions
1. In you project folder, run `git clone https://github.com/kenchan0824/fe-nc-news` to clone the whole respository to your local file system.
2. Run `npm install` to install all the required Node packages, including React.
3. You may setup your own RESTful API and change the provisioning URL in `/src/api.js`.
4. Run `npm start` to start the React server and you can access the app thru `http://localhost:3000/`