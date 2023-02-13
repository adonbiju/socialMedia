# SocialMedia
its is **MERN STACK** Project.

## Technologies used for the Frontend.

```bash
* React:front-end JavaScript library for building user interfaces.
* React Router for Navigation
* Formik+YUP for Form amd Form Validation.
* Redux toolkit for state Management.
* Redux with persistent: to store in the local storage.
* React Dropzone for image upload.
* Material UI
```
## Technologies used for the Backtend.

```bash
* Node.js
* Express.js
* Mongoose for mangaing Mongo Database.
* JWT (JSON WEB TOKEN) :for Authentication.
* Multer for File upload.
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/adonbiju/socialMedia.git
```
## To Running the frontend and backend
Follow the steps below to run both the frontend and backend of  MERN stack.

## To Run the server

### Make sure you are in - server/ directory & type the following command

Install dependencies

```bash
  npm install
```
Create a **.env** file inside server directory with fields given below.

```bash
PORT=5000
MONGODB_URL="mongodb://localhost:27017/social_media"
JWT_SECRET="Enter Your JWT Secret"
```
Start the server

```bash
  nodemon
```
## To Run the client

### Make sure you are in - client/ directory & type the following command

Install dependencies

```bash
  npm install
```
Start the Client

```bash
  npm  start
```