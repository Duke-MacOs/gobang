function Computer(Chess) {
    this.canvas = Chess.canvas;
    this.context = Chess.context;
    this.crossData = Chess.crossData;
    this.lines = Chess.lines;
    this.myTurn = false;
    Event.addListener('clickCanvas', this.clickCanvas.bind(this));
    Event.addListener('turn', this.turn.bind(this));
}

Computer.prototype.drawChess = function(position) {
    this.context.beginPath()
    this.context.arc(position.x, position.y, 15, 0, 2*Math.PI)
    this.context.fillStyle = '#D1D1D1';
    this.context.fill();
    this.context.closePath();
}

var drop = {
    getXY: function(num) {
        const yIndex = num.indexOf('y');
        const x = Number(num.substring(1, yIndex));
        const y = Number(num.substring(yIndex + 1));
        return {x, y};
    },
    allowDrop: function(num) {
        console.log('是否允许落子: ' + num)
        var position = drop.getXY(num);
        // 越过边界 or 已经有棋子，则不允许落子
        if(position.x < 0 || position.x > this.lines) return false;
        if(position.y < 0 || position.y > this.lines) return false;
        if(!this.crossData.hasOwnProperty(num) || this.crossData[num].has) return false;

        return true;
    },
    top: function(num) {
        // 在高分点下方落子
        var position = drop.getXY(num);
        var _num = `x${position.x}y${position.y + 1}`;
        if(drop.allowDrop.call(this, _num)) {
            position.y++;
            console.log(position)
            return position;
        }
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.y >= 1) {
            _num = `x${position.x}y${position.y - i}`;
            position = drop.getXY(_num);
        }
        
        return position;
    },
    right: function(num) {
        var position = drop.getXY(num);
        var _num = num;
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.x <= this.lines) {
            _num = `x${position.x + i}y${position.y}`;
            position = drop.getXY(_num);
        }
        

        return position;

    },
    bottom: function(num) {
        var position = drop.getXY(num);
        var _num = num;
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.y <= this.lines) {
            _num = `x${position.x}y${position.y + i}`;
            position = drop.getXY(_num);
        }
        

        return position;
    },
    left: function(num) {
        var position = drop.getXY(num);
        var _num = num;
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.x >= 1) {
            _num = `x${position.x - i}y${position.y}`;
            position = drop.getXY(_num);
        }
        

        return position;
    },
    slant1: function(num) {
        var position = drop.getXY(num);
        var _num = num;
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.x >= 1 && position.y >= 1) {
            _num = `x${position.x - i}y${position.y - i}`;
            position = drop.getXY(_num);
        }
        

        return position;
    },
    slant2: function(num) {
        var position = drop.getXY(num);
        var _num = num;
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.x <= this.lines && position.y >= 1) {
            _num = `x${position.x + i}y${position.y - i}`;
            position = drop.getXY(_num);
        }
        

        return position;
    },
    slant3: function(num) {
        var position = drop.getXY(num);
        var _num = num;
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.x <= this.lines && position.y <= this.lines) {
            _num = `x${position.x + i}y${position.y + i}`;
            position = drop.getXY(_num);
        }
        
        return position;
    },
    slant4: function(num) {
        var position = drop.getXY(num);
        var _num = num;
        var i = 1;
        while(!drop.allowDrop.call(this, _num) && position.x >= 1 && position.y <= this.lines) {
            _num = `x${position.x - i}y${position.y + i}`;
            position = drop.getXY(_num);
        }
        

        return position;
    }
};

/**
 * 计算AI 需要落子的位置
 * @return {[type]} [description]
 */
Computer.prototype.calculate = function() {
    const playerMax = this.crossData.playermax;
    const AIMax = this.crossData.AImax;

    if(playerMax.point >= AIMax.point) {
        console.log('最大方向: ' + playerMax.direction)
        var position = drop[playerMax.direction].call(this, playerMax.num);
        console.log('在这个位置落子：')
        console.log(position)
    }
    return position;
};

Computer.prototype.clickCanvas = function() {
    console.log('click Computer')
    if(!this.myTurn) return;
    console.log(this.crossData);

    var position = this.calculate();
    var num = `x${position.x}y${position.y}`;
    position.x = position.x * 30;
    position.y = position.y * 30;
    this.drawChess(position, num, 'AI');
    this.crossData[num].has = true;
    

    Event.trigger('turn');
};

Computer.prototype.turn = function() {
    this.myTurn = !this.myTurn;
};














