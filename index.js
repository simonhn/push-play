var app = require('express')();
var http_client = require('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var options = {
  host: 'music-dev.abcradio.net.au',
  port: 80,
  path: '/api/v1/plays/doublej/now.json',
};

var old_arid;

// the method that polls the music api every 10 seconds
var id = setInterval(function() {
  http_client.get(options, function(res) {
    var data = '';

    res.on('data', function (chunk){
        data += chunk;
    });

    res.on('end',function(){
      var obj = JSON.parse(data);      
      // only push when there is new data 
      if(obj.now.arid != old_arid){
        // send arid to all clients
        io.emit('play', JSON.stringify(obj.now, undefined, 2));
        // io.emit('play', JSON.stringify(obj.now.recording.title + ' - ' + obj.now.recording.artists[0].name));
        old_arid = obj.now.arid;
      }
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  })
}, 10000);

http.listen(3000, function(){
  console.log('listening on *:3000');
});