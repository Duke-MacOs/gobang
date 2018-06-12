var ws = require("nodejs-websocket")
var PORT = 3000

var clientCount = 0 

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++
    if(clientCount > 2) return;
    conn.nickname = 'user' + clientCount;
    broadcast(clientCount);
    conn.on("text", function (str) {
        console.log("Received "+str)
        broadcast(str);        
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        broadcast(conn.nickname + 'left')
    })
    conn.on("error", function(err) {
        conosle.log('handle error');
        console.log(err)
    })
}).listen(PORT)

console.log("websocket server listening on port " + PORT)

function broadcast(str) {
    server.connections.forEach(function(connection) {
        connection.sendText(str);
    })
}