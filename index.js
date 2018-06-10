function Player(Chess) {
    this.canvas = Chess.canvas;
    this.context = Chess.context;
    this.crossData = Chess.crossData;
    this.myTurn = true;
    Event.addListener('clickCanvas', this.clickCanvas.bind(this));
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
    if(!this.myTurn) return;
    if(this.crossData[num].has) return;

    this.drawChess(this.crossData[num].position, num, 'player');
    this.crossData[num].has = true;
    
    console.log(num)
    
}

