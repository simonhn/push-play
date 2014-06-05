# push play

prototype app for pushing play data to clients (browsers)

## Server
Polls the music api for new playout data for double j every 5 seconds, when there is a new 'now' arid it pushes this data to the connected clients.

## Client
Creates a websocket connection to the server and prints the now playing json object to the screen

## Install
npm install

## Run
node index.js

open a few browser windows at localhost:3000 and wait for the play arids to be printed

## credits
code is based on [Getting Started](http://socket.io/get-started/chat/) guide 
