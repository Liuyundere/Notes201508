var tab = document.getElementById("tab");
var thead = tab.tHead;
var tbody = tab.tBodies[0];
var rows = tbody.rows;
var thds = thead.rows[0].cells;

//数据绑定
function bindData () {
    var frg = document.createDocumentFragment();
    for(var i = 0; i < data.length; i++) {
        var cur = data[i];
        cur.name = cur.name || "--";
        cur.age = cur.age || "--";
        cur.score = cur.score || "--";
        cur.sex = cur.sex === 0 ? "男" : "女";
        var tr = document.createElement("tr");
        for( var key in cur) {
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
    for(var i = 0; i < rows.length; i++) {
        rows[i].className = i%2 === 1 ? "even" : null;
    }
}
changeBg();

//排序
function sortAry(n) {
    var _this = this;
    for (var k = 0; k < thds.length; k++) {
        k !== n ? thds[k].flag = -1 : null;
    }
    _this.flag *= -1;
    //讲类数组转化为数组
    var ary = utils.listToArray(rows);
    //排序 
    ary.sort(function (a,b) {
        var curIn = a.cells[n].innerHTML,
            nextIn = b.cells[n].innerHTML,
            curInNum = parseFloat(curIn),
            nextInNum = parseFloat(nextIn);
        var num = isNaN(curInNum) ? curIn.localeCompare(nextIn) : curInNum - nextInNum;
        return num * _this.flag;
    });

    //重新排序
    var frg = document.createDocumentFragment();
    for(var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tbody.appendChild(frg);
    frg = null;
    changeBg();
}
for( var i = 0; i < thds.length; i++) {
    thds[i].index = i;
    thds[i].flag = -1;
    if(thds[i].className === "cursor") {
        thds[i].onclick = function() {
            sortAry.call(this,this.index);
        }
    }
}

