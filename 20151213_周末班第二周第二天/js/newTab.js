var tab = document.getElementById("tab");
var thead = tab.tHead;
var tbody = tab.tBodies[0];
var trs = tbody.rows;
var td = thead.rows[0].cells;

//数据绑定
function bindData() {
    var frg = document.createDocumentFragment();
    for(var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var cur = data[i];
        cur.name = cur.name || "--";
        cur.age = cur.age || "--";
        cur.score = cur.score || "--";
        cur.sex = cur.sex === 0 ? "男" : "女";
        for(var key in cur) {
            var td = document.createElement("td");
            td.innerHTML = cur[key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tbody.appendChild(frg);
    frg = null;
}
bindData();

//隔行变色
function changeBg() {
    for(var i = 0; i < trs.length; i++) {
        trs[i].className = i%2 ===1 ? "even" : null;
    }
}
changeBg();

//排序
function sortList(n) {
    var _this = this;
    for( var k = 0; k < td.length; k++) {
        k!==n ? td[k].flag = -1 : null;
    }
    _this.flag *= -1;
    //类数组转化为数组
    var ary = utils.listToArray(trs);
    //排序
    ary.sort(function (a,b) {
        var curIn = a.cells[n].innerHTML,
            nextIn = b.cells[n].innerHTML,
            curInNum = parseFloat(curIn),
            nextInNum = parseFloat(nextIn);
        var num = isNaN(curInNum) ? curIn.localeCompare(nextIn) : curInNum -nextInNum;
        return num*_this.flag;
    });
    //重新加到页面
    var frg = document.createDocumentFragment();
    for( var i = 0; i <ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tbody.appendChild(frg);
    frg = null;
    changeBg();
}

for( var i = 0; i < td.length; i++) {
    if(td[i].className === "cursor") {
        td[i].index = i;
        td[i].flag = -1;
        td[i].onclick = function() {
            sortList.call(this,this.index);
        };
    }
}
