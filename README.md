# Gomoku App

## install dependencies
yarn

## start the server
 - cd gomoku-server
 - yarn run dev

## start the app
 - cd gomoku-react
 - yarn start
 - go to localhost:3000

## Login details for testing
 - Username: admin
 - Password: admin

## Postman collection
Link here

## To run using deserializeUser
In both [gameHandler](gomoku-server/src/game/game.handler.ts) and [historyHandler](gomoku-server/src/history/history.handler.ts):
 1. uncomment _handler.use(deserializeUser)_
 2. change _authMethod_ variable to "_deserialize_"

In the postman collection, set the auth on the main folder to "Bearer" and insert a token

### BONUS FEATURES

* A1: The user is able to customise how many stones in a row are needed to win. This allows the user to set up harder or easier games.
* A2: nil 
* A3: NA