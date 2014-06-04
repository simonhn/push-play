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
  socket.on('play', function(msg){
    console.log('message: ' + msg);
    io.emit('play', msg);
  });
});

var options = {
  host: 'music-dev.abcradio.net.au',
  port: 80,
  path: '/api/v1/plays/doublej/now.json',
};

var old_arid;
var id = setInterval(function() {
  http_client.get(options, function(res) {
    var data = '';

    res.on('data', function (chunk){
        data += chunk;
    });

    res.on('end',function(){
      var obj = JSON.parse(data);
      console.log( obj.now.arid);
      if(obj.now.arid != old_arid){
        // send arid to all clients
        io.emit('play', JSON.stringify(obj.now.arid));
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
