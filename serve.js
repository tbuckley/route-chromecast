var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

app.use("/static", express.static(__dirname + "/static"));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/web/sender.html');
});

app.get('/chromecast/prod', function(req, res) {
  res.sendfile(__dirname + '/web/receiver.html');
});

io.sockets.on("connection", function(socket) {
  socket.on("update", function(value) {
    console.log("Value = ( "+value+" )");
    socket.broadcast.emit("value", value);
  });
});

server.listen(80);