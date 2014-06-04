# push play

prototype app for pushing play data to clients.

the server part polls the music api for new playout data every 10 seconds, when there is a new 'now' arid it pushes this data to the connected clients.

the client parts creates a websocket connection to the server and prints the play arid to the screen

install: npm install
run: npm index.js

open a few browser windows at localhost:3000 and wait for the play arids to be printed

code is based on [Getting Started](http://socket.io/get-started/chat/) guide 
