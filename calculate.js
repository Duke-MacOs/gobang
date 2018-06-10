/**
 * 计算函数：
 * 每次点击棋盘时，
 * 修改当前交叉点的数据
 */
function Calculate(chess) {
    this.crossData = chess.crossData;
    this.lines = chess.lines;
    console.log(this.lines)
}

// type: player / AI 
Calculate.prototype.setType = function(num, type) {
    console.log(num);
    console.log(type);
    this.crossData[num].type = type;
    return this;
}

Calculate.prototype.getType = function(num) {
    console.log(this)
    console.log(num)
    console.log(this.crossData[num])
    return this.crossData[num].type;
}

Calculate.prototype.hasChess = function(num) {
    this.crossData[num].has = true;
    return this;
}

Calculate.prototype.noChess = function(num) {
    this.crossData[num].has = false;
    return this;
}

Calculate.prototype.setPosition = function(num) {
    const x = Number(num.substring(1, 2));
    const y = Number(num.substring(3));

    this.crossData[num].position.x = x;
    this.crossData[num].position.y = y;
    return this;
}

/**
 * 计算八个方向数据
 */
Calculate.prototype.calculateDirectionOrder = function(num) {
    const yIndex = num.indexOf('y');
    const x = Number(num.substring(1, yIndex));
    const y = Number(num.substring(yIndex + 1));
    const type = this.getType(num);

    // num: 当前落子位置， _num: 向量上交叉点位置
    function pushOrder(d, num, _num) {
        if(this.crossData[num].has && this.getType(_num) === type) {
            this.crossData[num].direction[d].order.push(1);
        }else {
            this.crossData[num].direction[d].order.push(0);
        }
    }

    for(let key in this.crossData[num].direction) {
        this.crossData[num].direction[key].order.push(1);
    }
    // top方向
    if(this.crossData[num].direction.hasOwnProperty('top')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((y - i) < 1) break;
            
            let _num = `x${x}y${y - i}`;
            console.log(top);
            pushOrder.call(this, 'top', num, _num);
        }
    }
    // right方向
    if(this.crossData[num].direction.hasOwnProperty('right')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x + i) > this.lines) break;
            
            let _num = `x${x + i}y${y}`;
            console.log('rigth')
            pushOrder.call(this, 'right', num, _num);
        }
    }
    // bottom方向
    if(this.crossData[num].direction.hasOwnProperty('bottom')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((y + i) > this.lines) break;
            
            let _num = `x${x}y${y + i}`;
            console.log('bottom')
            pushOrder.call(this, 'bottom', num, _num);
        }
    }
    // left方向
    if(this.crossData[num].direction.hasOwnProperty('left')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x - i) < 1) break;
            
            let _num = `x${x - i}y${y}`;
            console.log('left')
            pushOrder.call(this, 'left', num, _num);
        }
    }
    // slant1 第一象限
    if(this.crossData[num].direction.hasOwnProperty('slant1')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x - i) < 1 || (y - i) < 1) break;
            
            let _num = `x${x - i}y${y - i}`;
            console.log('第一象限')
            pushOrder.call(this, 'slant1', num, _num);
        }
    }
    // slant2 第二象限
    if(this.crossData[num].direction.hasOwnProperty('slant2')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x + i) > this.lines || (y - i) < 1) break;
            
            let _num = `x${x + i}y${y - i}`;
            console.log('第二象限')
            pushOrder.call(this, 'slant2', num, _num);
        }
    }
    // slant3 第三象限
    if(this.crossData[num].direction.hasOwnProperty('slant3')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            console.log(this.lines)
            if((x + i) > this.lines || (y + i) > this.lines) break;
            
            let _num = `x${x + i}y${y + i}`;
            console.log('第三象限')
            pushOrder.call(this, 'slant3', num, _num);
        }
    }
    // slant4 第四象限
    if(this.crossData[num].direction.hasOwnProperty('slant4')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x - i) < 1 || (y + i) > this.lines) break;
            
            let _num = `x${x - i}y${y + i}`;
            console.log('第四象限')
            pushOrder.call(this, 'slant4', num, _num);
        }
    }
    return this;
}





















