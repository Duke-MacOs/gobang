/**
 * 装饰者模式:
 * 动态添加职责，在函数前面或后面执行，不影响函数
 * 自身的运行
 */
Function.prototype.before = function(fn) {
    var self = this;

    return function() {
        fn.apply(this, arguments);
        self.apply(this, arguments);
    }
}

Function.prototype.after = function(fn, startIndex, endIndex) {
    var self = this;
    var fnList = [];
    fnList.push(fn);
    return function() {
        self.apply(this, arguments);
        for(let i = 0, _fn; _fn = fnList[i++];) {
            _fn.apply(this, [].slice.call(arguments, startIndex, endIndex));
        }
    }
}