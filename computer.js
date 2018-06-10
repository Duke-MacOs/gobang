function Computer(Chess) {
    this.canvas = Chess.canvas;
    this.context = Chess.context;
    this.crossData = Chess.crossData;
    Event.addListener('clickCanvas', this.clickCanvas.bind(this));
}

Computer.prototype.drawChess = function() {
    this.context.beginPath()
    this.context.arc(position.x, position.y, 15, 0, 2*Math.PI)
    this.context.fillStyle = '#D1D1D1';
    this.context.fill();
    this.context.closePath();
}

Computer.prototype.clickCanvas = function(num) {

}