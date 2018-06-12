function Player(Chess, option) {
    console.log(option)
    this.canvas = Chess.canvas;
    this.context = Chess.context;
    this.crossData = Chess.crossData;
    this.myTurn = option ? option.turn : true;
    this.color = option && option.color || 'black';
    Event.addListener('clickCanvas', this.clickCanvas.bind(this));
    Event.addListener('turn', this.turn.bind(this));
}

Player.prototype.drawChess = function(position) {
    console.log(arguments)
    this.context.beginPath()
    this.context.arc(position.x, position.y, 15, 0, 2*Math.PI)
    this.context.fillStyle = 'black';
    this.context.fill();
    this.context.closePath();
}

Player.prototype.clickCanvas = function(num) {
    console.log(num)
    console.log(this)
    if(this.crossData[num].has) return;
    if(!this.myTurn) return;

    this.drawChess(this.crossData[num].position, num, 'player');
    this.crossData[num].has = true;
    console.log(num)

    Event.trigger('turn');
}

Player.prototype.sendWebSocket = function(ws) {
    return function(position) {
        var num = `x${position.x}y${position.y}`
        ws.send(num);
    }
}

Player.prototype.turn = function() {
    this.myTurn = !this.myTurn;
}

