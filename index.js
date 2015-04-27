var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('state', function(state) {
        io.emit('state', state);
    });

    socket.on('videoIdentifier', function(vid) {
        var newRL = vid.split("=")[1];
        io.emit('videoIdentifier', newRL);
    });

    socket.on("time", function(time) {
        io.emit("time", time);
    });
});

http.listen(3000, function() {
    console.log("Listening...");
});