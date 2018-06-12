var websocket = new WebSocket("ws://localhost: 3000/");
websocket.onopen = function() { 
    console.log('websocket open ');

}
websocket.onclose = function() {
    console.log('websocket close ');
}
websocket.onmessage = function(e) {
    console.log(e.data);
}