

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function(fmt) {
    let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours() % 24 == 0 ? 12 : this.getHours() % 24, //小时
        'H+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    let week = {
        '0': '日',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六'

    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[this.getDay() + '']);
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};
/**
 * 计算到期日期和当前日期天数差
 */
global.dateDiff = function(date) {
    var firstDate = new Date(date);
    var secondDate = new Date();
    var diff = Math.abs(firstDate.getTime() - secondDate.getTime());
    var result = parseInt(diff / (1000 * 60 * 60 * 24));
    return result;
};
/**
 * 判断字符串是否为空
 * @param str
 * @returns {boolean}
 */
global.isNotNull = function(obj) {
    if (obj === null || typeof (obj) === 'undefined' || obj === 'undefined' || obj === undefined) {
        return false;
    }
    //判断是否是字符串
    if (obj.constructor === String) {
        if (obj.trim() === 'null' || obj.trim() === 'NULL' || obj.trim().length === 0 || obj === '') {
            return false;
        } else {
            return true;
        }
    }
    //判断是否是数组
    if (obj.constructor === Array) {
        if (obj === [] || obj.length === 0 || obj === '') {
            return false;
        } else {
            return true;
        }
    }

    //判断是否是对象
    if (obj.constructor === Object) {
        if (JSON.stringify(obj) === '{}') {
            return false;
        } else {
            return true;
        }
    }
    return true;
};

global.isNull = function(obj) {
    return !isNotNull(obj);
};



/**
 * 给string 对象 增加原型方法 replaceAll()
 * @param s1      需要替换的字符串
 * @param s2      替换字符串
 * @returns {*}
 */
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, 'gm'), s2);
};

/**
 * 根据对象的指定属性的值，判断是否存在重复的数据
 * @param array
 * @param cfield
 * @returns {number}  返回-1，则没有重复，否则返回重复的值所在位置下标
 */
global.isRepeat = function(array, cfield) {
    let obj = {};
    for (let i = 0; i < array.length; i++) {
        if (!obj[array[i][cfield]]) {  //如果能查找到，证明数组元素重复了
            obj[array[i][cfield]] = 1;
        } else {
            return i;
        }
    }
    return -1;
};



global.showLoad = function(vm, title) {
    return vm.$loading({
        lock: true,
        text: title,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'wj_font_30 wj_load'
    });
};



/**
 * 深度复制
 * @param data
 */
global.copyData = function(data) {
    let jsonStr = JSON.stringify(data);
    return JSON.parse(jsonStr);
};

/**
 * 生成随机数
 * @param min
 * @param max
 * @returns {*}
 */
global.rand = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};



/**
 * 二进制数组转blob
 * @param byteData
 * @returns {Blob}
 */
global.byteToBlob = function(byteData, contentType) {
    let bstr = atob(byteData), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    contentType = contentType || '';
    return new Blob([u8arr], { type: contentType });
};

global.b64toBlob = function(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data.substring(b64Data.indexOf(',') + 1));
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
};

/**
 * 下载文件方法（兼容IE）
 * @param url       需要下载的对象 或者 下载文件的地址
 * @param saveName  保存的文件名
 */
global.downloadFile = function(url, saveName) {
    // for ie 10 and later
    if (window.navigator.msSaveBlob) {
        try {
            var blobObject = new Blob([url]);
            window.navigator.msSaveBlob(blobObject, saveName);
        } catch (e) {
            console.log(e);
        }
    }
    // 谷歌浏览器 创建a标签 添加download属性下载
    else {
        if (typeof url == 'object' && url instanceof Blob) {
            url = URL.createObjectURL(url); // 创建blob地址
        }

        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) {
            event = new MouseEvent('click');
        } else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    }
};

/**
 * base64字符串转二进制数组
 * @param base64
 * @returns {Uint8Array}
 */
global.base64ToBinary = function(base64) {
    /*解决IE兼容的bug,替换掉base64中的换行符*/
    base64 = base64.replace(/[\r\n]/g, '');
    let raw = window.atob(base64);
    let array = new Uint8Array(new ArrayBuffer(raw.length));
    for (let i = 0; i < raw.length; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
};
/**
 * 文件对象转url
 * @param file
 * @returns {*}
 */
global.getObjectURL = function(file) {
    let url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }
    return url;
};

/**
 * blob流转base64
 */
global.blobToBase64 = function(blob, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function(e) {
        callback(e.target.result);
    };
};

/**
 * 关闭指定路由
 * @param vue       指定页面
 * @param route     指定路由
 * @param callback  回调方法
 */
global.closeRoute = function(vue, route, callback = null) {
    if (isNotNull(callback)) {
        vue.$store.dispatch('tagsView/delView', route).then(callback());
    } else {
        vue.$store.dispatch('tagsView/delView', route).then((views) => {
            if (route.path === vue.$route.path) {
                const latestView = views.visitedViews.slice(-1)[0];
                if (latestView) {
                    vue.$router.push(latestView);
                } else {
                    if (route.name === 'Dashboard') {
                        // to reload home page
                        vue.$router.replace({ path: '/redirect' + route.fullPath });
                    } else {
                        vue.$router.push('/');
                    }
                }
            }
        });
    }
};
//判断界面是否已经打开
global.isOpenView = function(vue, path) {
    let flag = false;
    let routeObject = null;
    //判断是否已经打开申请界面
    for (const view of vue.$store.state.tagsView.visitedViews) {
        if (view.path === path) {
            routeObject = view;
            flag = true;
            break;
        }
    }
    return { flag: flag, routeObject: routeObject };
};

/**
 * 根据对象子集获取最大编码
 */
global.getChildMaxCode = function(item, childField, codeField) {
    let newCode = '';
    if (item.hasOwnProperty(childField) && item[childField].length > 0) {
        let child = item[childField];//取所有子节点
        //降序
        let maxItem = _us.sortBy(child, codeField).reverse()[0];
        //取当前最大编码
        let maxCode = maxItem[codeField].substring(item[codeField].length);
        //编码加1
        newCode = Number(maxCode) + 1 + '';
        //加1后拼接父级编码
        newCode = item[codeField] + (newCode.length > 1 ? newCode : ('0' + newCode));
    } else {
        newCode = item[codeField] + '01';
    }
    return newCode;
};


/**
 * 根据对象的指定属性的值，进行去重
 * @param array     待处理集合
 * @param cfield    指定属性
 * @returns {Array}
 */
global.unique = function(array, cfield) {
    let obj = {}, result = [];
    for (let i = 0; i < array.length; i++) {
        if (!obj[array[i][cfield]]) {  //如果能查找到，证明数组元素重复了
            obj[array[i][cfield]] = 1;
            result.push(array[i][cfield]);
        }
    }
    return result;

};


/**
 * 自定义查找字段, 根据最后一级某个字段查找完整树(整个父类)
 * @param {*} val     要查找对比的值
 * @param {*} data    要查找的数据
 * @param {*} fKey    要查找对比的字段
 */
global.recursiveTreeByLastLevel = (val, data, fKey = 'value') => {
    let rData = [];
    for (let i = 0, len = data.length; i < len; i++) {
        rData.push(data[i]);
        if (data[i].children && data[i].children.length > 0) {
            rData = rData.concat(recursiveTreeByLastLevel(val, data[i].children, fKey));
            if (rData.some(item => item[fKey] === val)) return rData;
        }
        if (data[i][fKey] === val) return rData;
        rData = [];
    }
    return rData;
};

//在光标位置插入内容
global.insertContent = function(content) {
    if (!content) {//如果插入的内容为空则返回
        return;
    }
    let sel = null;
    if (document.selection) {//IE9以下
        sel = document.selection;
        sel.createRange().pasteHTML(content);
    } else {
        sel = window.getSelection();
        if (sel.rangeCount > 0) {
            let range = sel.getRangeAt(0);      //获取选择范围
            range.deleteContents();             //删除选中的内容
            let el = document.createElement('div'); //创建一个空的div外壳
            el.innerHTML = content;                 //设置div内容为我们想要插入的内容。
            let frag = document.createDocumentFragment();//创建一个空白的文档片段，便于之后插入dom树

            let node = el.firstChild;
            let lastNode = frag.appendChild(node);
            range.insertNode(frag);                 //设置选择范围的内容为插入的内容
            let contentRange = range.cloneRange();  //克隆选区
            contentRange.setStartAfter(lastNode);          //设置光标位置为插入内容的末尾
            contentRange.collapse(true);                   //移动光标位置到末尾
            sel.removeAllRanges();                  //移出所有选区
            sel.addRange(contentRange);             //添加修改后的选区
        }
    }
};
/**
 * @param {*} obj     要生成字体的父级dom元素对象
 * @param {*} font    渐变的文字内容
 * @param {*} r       颜色R值
 * @param {*} g       颜色G值
 * @param {*} b       颜色B值
 * @param {*} type    渐变方式: 0:灰度渐变 1:R值渐变 2:G值渐变 3:B值渐变
 * @return            字体宽度（用于显示渐变字体时 动态设置margin-right 或者 padding-right 的值）
 */
global.colorful = (obj, font, r, g, b, type) => {
    obj.innerHTML = '';//清空元素
    obj.innerHTML = '<a>' + font + '</a>';
    let el = obj.getElementsByTagName('a')[0];
    var num = el.scrollWidth || el.offsetWidth;
    obj.innerHTML = '';
    for (var i = 0; i <= num; i++) {
        var j = i + 1;
        var c = Math.round(255 / num * i);
        switch (Number(type)) {
            case 0:
                r = c;
                g = c;
                b = c;
                break;
            case 1:
                r = c;
                break;
            case 2:
                g = c;
                break;
            case 3:
                b = c;
                break;
        }
        var iObj = document.createElement('span');
        iObj.innerHTML = font;
        iObj.style.clip = 'rect(auto ' + j + 'px auto ' + i + 'px)';
        iObj.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        iObj.style.position = 'absolute';
        iObj.style.fontStyle = 'normal';
        iObj.style.whiteSpace = 'nowrap';
        obj.appendChild(iObj);
    }
    return num;
};
