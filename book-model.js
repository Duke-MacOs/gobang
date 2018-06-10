var Event = (function bookModel() {
    var eventMap = {};

    function addListener(type, fn) {
        if(eventMap[type]) {
            eventMap[type].push(fn);
        }else {
            eventMap[type] = [];
            eventMap[type].push(fn);
        }
    }

    function trigger(type) {
        if(!eventMap[type]) throw new Error('不存在该类型订阅');
        if(eventMap[type].length === 0) return false;

        var keys = [].slice.call(arguments, 1);
        for(var i = 0, fn; fn = eventMap[type][i++];) {
            fn.apply(this, keys);
        }
    }

    function delListener(type, key) {
        if(!type) throw new Error('请输入需要删除的类型');
        if(type && !key) eventMap[type] = [];

        if(type && key) {
            var arr = eventMap[type];

            for(var i, fn; fn = arr[i++];) {
                if(fn === key) {
                    return arr.splice(i, 1);
                }
            }
        }
    }


    return {
        eventMap,
        addListener,
        trigger,
        delListener
    }
})();

// export {Event};
