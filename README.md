# Gomoku App

## start the app
At the root directory (you should see docker-compose.yml file)
 - docker-compose up

## stop the app
 - docker-compose down

## Login details for testing
 - Username: admin
 - Password: admin

## Postman collection
https://www.getpostman.com/collections/3bc8c13ab3f7c9249983

## To run using deserializeUser
In both [gameHandler](gomoku-server/src/game/game.handler.ts) and [historyHandler](gomoku-server/src/history/history.handler.ts):
 1. uncomment _handler.use(deserializeUser)_
 2. change _authMethod_ variable to "_deserialize_"

In the postman collection, set the auth on the main folder to "Bearer" and insert a token

