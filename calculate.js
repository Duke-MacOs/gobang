/**
 * 计算函数：
 * 每次点击棋盘时，
 * 修改当前交叉点的数据
 */
function Calculate(chess) {
    this.crossData = chess.crossData;
    this.lines = chess.lines;
};

// type: player / AI 
Calculate.prototype.setType = function(num, type) {
    this.crossData[num].type = type;
    return this;
};

Calculate.prototype.getType = function(num) {
    return this.crossData[num].type;
};

Calculate.prototype.hasChess = function(num) {
    this.crossData[num].has = true;
    return this;
};

Calculate.prototype.noChess = function(num) {
    this.crossData[num].has = false;
    return this;
};

Calculate.prototype.setPosition = function(num) {
    const x = Number(num.substring(1, 2));
    const y = Number(num.substring(3));

    this.crossData[num].position.x = x;
    this.crossData[num].position.y = y;
    return this;
};

/**
 * 计算八个方向数据
 */
Calculate.prototype.calculateDirectionOrder = function(num) {
    const yIndex = num.indexOf('y');
    const x = Number(num.substring(1, yIndex));
    const y = Number(num.substring(yIndex + 1));
    const type = this.getType(num);

    /**
     * 落子点八个方向的棋子颜色添加排序
     * @param  {string direction} d    方向
     * @param  {string} num  当前落子位置
     * @param  {string} _num 向量上交叉点位置
     * @return {null}      [description]
     */
    function pushOrder(d, num, _num) {
        if(this.crossData[_num].has && this.getType(_num) === this.getType(num)) {
            this.crossData[num].direction[d].order.push(1);
        }else if(this.crossData[_num].has && this.getType(_num) !== this.getType(num)) {
            this.crossData[num].direction[d].order.push(2);
        }else {
            this.crossData[num].direction[d].order.push(0);
        }
    }

    for(let key in this.crossData[num].direction) {
        this.crossData[num].direction[key].order = [];
        this.crossData[num].direction[key].order.push(1);
    }
    // top方向
    if(this.crossData[num].direction.hasOwnProperty('top')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((y - i) < 1) break;
            
            let _num = `x${x}y${y - i}`;
            pushOrder.call(this, 'top', num, _num);
        }
    }
    // right方向
    if(this.crossData[num].direction.hasOwnProperty('right')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x + i) > this.lines) break;
            
            let _num = `x${x + i}y${y}`;
            pushOrder.call(this, 'right', num, _num);
        }
    }
    // bottom方向
    if(this.crossData[num].direction.hasOwnProperty('bottom')) {

        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((y + i) > this.lines) break;
            
            let _num = `x${x}y${y + i}`;
            pushOrder.call(this, 'bottom', num, _num);
        }
    }
    // left方向
    if(this.crossData[num].direction.hasOwnProperty('left')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x - i) < 1) break;
            
            let _num = `x${x - i}y${y}`;
            pushOrder.call(this, 'left', num, _num);
        }
    }
    // slant1 第一象限
    if(this.crossData[num].direction.hasOwnProperty('slant1')) {
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x - i) < 1 || (y - i) < 1) break;
            
            let _num = `x${x - i}y${y - i}`;
            pushOrder.call(this, 'slant1', num, _num);
        }
    }
    // slant2 第二象限
    if(this.crossData[num].direction.hasOwnProperty('slant2')) {
        
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x + i) > this.lines || (y - i) < 1) break;
            
            let _num = `x${x + i}y${y - i}`;
            pushOrder.call(this, 'slant2', num, _num);
        }
    }
    // slant3 第三象限
    if(this.crossData[num].direction.hasOwnProperty('slant3')) {
        
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x + i) > this.lines || (y + i) > this.lines) break;
            
            let _num = `x${x + i}y${y + i}`;
            pushOrder.call(this, 'slant3', num, _num);
        }
    }
    // slant4 第四象限
    if(this.crossData[num].direction.hasOwnProperty('slant4')) {
        
        for(let i = 1; i < 5; i++) {
            // 如果 < 1，则说明越过顶部边界，退出循环；
            if((x - i) < 1 || (y + i) > this.lines) break;
            
            let _num = `x${x - i}y${y + i}`;
            pushOrder.call(this, 'slant4', num, _num);
        }
    }
    return this;
};

/**
 * 给出八个方向的评分
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
Calculate.prototype.calculatePoint = function(num) {
    // direction = {
    //     left: {order: [], point: },
    //     bottom: {order: [], point: }
    // }
    const direction = this.crossData[num].direction;
    console.log('进入评分系统')
    for(let key in direction) {
        var _d = direction[key];
        var first = _d.order[0];
        var type = _d.order.join('-');

        if(_d.order.length === 0) continue;
        // 如果数组长度小于5，则分值为-1；
        if(_d.order.length < 5){
            _d.point = -1;
            continue;
        }
        // 如果有两种不同颜色的，则分值为-1；
        if((first === 1 && _d.order.includes(first + 1)) || (first === 2 && _d.order.includes(first - 1))){
             console.info('出现不同颜色棋子')
             _d.point = -1;
             continue;
        }
        
        // 单个棋子
        if(`${first}-0-0-0-0` === type) {
            _d.point = 10;
        }
        // 两连株
        if(`${first}-${first}-0-0-0` === type) {
            _d.point = 100;
        }
        // 三连珠
        if(`${first}-${first}-${first}-0-0` === type) {
            _d.point = 1000;
        }
        // 四连珠
        if(`${first}-${first}-${first}-${first}-0` === type) {
            _d.point = 10000;
        }    
        // 五连珠
        if(`${first}-${first}-${first}-${first}-${first}` === type) {
            _d.point = 1000000;
        }

        // player or AI 作前缀
        var pre = `${this.crossData[num].type}max`;
        var _num = this.crossData[pre].num || num;
        var _direction = this.crossData[pre].direction || 'top';
        // 如果大于最高评分，则替换
        if(_d.point >= this.crossData[_num].direction[_direction].point) {
            this.crossData[pre].num = num;
            this.crossData[pre].point = _d.point;
            this.crossData[pre].direction = key;
        }   
        console.log('在评分系统内：')
        console.log(this.crossData) 
        
    }
}

Calculate.prototype.reCalculate = function(num) {
    
    const yIndex = num.indexOf('y');
    const x = Number(num.substring(1, yIndex));
    const y = Number(num.substring(yIndex + 1));
    // 确定受影响的边界
    const x0 = (x - 5 >= 1) ? x - 5 : 1;
    const y0 = (y - 5 >= 1) ? y - 5 : 1;
    const x1 = (x + 5 <= this.lines) ? x + 5 : this.lines;
    const y1 = (y + 5 <= this.lines) ? y + 5 : this.lines;
   
    this.calculateDirectionOrder(num);
    this.calculatePoint(num);
    for(let i = 1; i < 5; i++) {
        var top = `x${x}y${y - i}`;
        var right = `x${x + i}y${y}`;
        var bottom = `x${x}y${y + i}`;
        var left = `x${x - i}y${y}`;
        var slant1 = `x${x - i}y${y - i}`;
        var slant2 = `x${x + i}y${y - i}`;
        var slant3 = `x${x + i}y${y + i}`;
        var slant4 = `x${x - i}y${y + i}`;

        function filter(num) {
            const yIndex = num.indexOf('y');
            const x = Number(num.substring(1, yIndex));
            const y = Number(num.substring(yIndex + 1));

            if(x < 1 || y < 1 || x > this.lines || y > this.lines) return;
            if(!this.crossData[num].has) return;
            this.calculateDirectionOrder(num);
            this.calculatePoint(num);
        }
        filter.call(this, top);
        filter.call(this, right);
        filter.call(this, bottom);
        filter.call(this, left);
        filter.call(this, slant1);
        filter.call(this, slant2);
        filter.call(this, slant3);
        filter.call(this, slant4);


    }
}

















