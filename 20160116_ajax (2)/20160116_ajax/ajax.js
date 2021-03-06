window.ajax = (function () {
    var getXHR = (function () {
        if (window.XMLHttpRequest) {
            return function () {
                return new XMLHttpRequest();
            }
        }
        return function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    })();

    var each = (function () {
        if ([].forEach) {
            return function (list, callback, context) {
                // 数组类数组都可以循环
                [].forEach.call(list, callback, context);
                // 只能循环数组
                // => list.forEach(callback,context)
            }
        }
        return function (list, callback, context) {
            for (var i = 0, l = list.length; i < l; i++) {
                var item = list[i];
                callback.call(context, item, i, list);
            }
        }
    })();

    var encodeURIString = function (data) {
        if (typeof data === 'string') {
            return data;
        }
        var part = [];
        for (var n in data) {
            part.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
        }
        // www.baidu.com?A=1&B=2&123
        // c=3
        return part.join('&');
    };
    var hasSearch = function (str) {
        return /\?/.test(str);
    };

    var getRandom = function () {
        return (Math.random() * 10000) | 0;
    };

    var JSONParse = (function () {
        if (window.JSON) {
            return function (data) {
                return JSON.parse(data);
            }
        }
        return function (data) {
            return (new Function('return '+data))();
            //return eval('(' + data + ')');
        }
    });
    /**
     * 把ajax封装到这个方法里
     * @param url {string} 请求的路径
     * @param method {string} http方法
     * @param async {boolean} 是否为异步
     * @param success {Function} 回调函数
     */
    //var ajax = function (url,data, method, async, success) {
    var ajax = function (settings) {
        var xhr = getXHR();
        // 把参数解析成URI格式
        settings.data = encodeURIString(settings.data);
        // 判断是不是get系方法
        if (/(get|delete|head)/ig.test(settings.method)) {
            // 如果为true 就表示为get系
            // 把参数到url后面
            if (hasSearch(settings.url)) {
                settings.url += '&' + settings.data;
            } else {
                settings.url += '?' + settings.data;
            }
            // 把data给清空
            settings.data = null;
        }
        // 判断走不走缓存
        if (settings.cache === false) {
            if (hasSearch(settings.url)) {
                settings.url += '&' + getRandom();
            } else {
                settings.url += '?' + getRandom();
            }
        }
        xhr.open(settings.method, settings.url, settings.async);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var text = this.responseText;
                if (settings.dataType === 'json') {
                    try {
                        text = JSONParse(text)
                    } catch (e) {
                        settings.error();
                    }
                }
                settings.success(text);
            }
        };
        xhr.send(settings.data);
    };
    return ajax;
})();