const format = function (date){
    var time = new Date(date);
    var m = time.getMonth()+1;
    var d = time.getDate();
    return (m<10?'0'+m:m) +'/'+ (d<10?'0'+d:d);
}


const formatDate = function(date, format) { /*格式化时间*/
    //new Date( year, month, date, hrs, min, sec)
    //new Date() ;     //参数可以为整数; 也可以为字符串; 但格式必须正确
    //examplenew Date(2009,1,1);       //正确  new Date("2009/1/1");    //正确
    //example  formatDate(new Date(), "当前日期为：YYYY-MM-DD，星期w，为第qq季度，时间为：hh:mm:ss:c")
    date = new Date(date);
    var o = {
        "M+": date.getMonth() + 1, //month  MM
        "D+": date.getDate(), //day  DD
        "h+": date.getHours(), //hour  hh
        "m+": date.getMinutes(), //minute mm
        "s+": date.getSeconds(), //second ss
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 季度 q
        "c": date.getMilliseconds(), //millisecond 毫秒 c
        "w": ['一', '二', '三', '四', '五', '六', '日'][date.getDay() - 1] //week 星期 w
    };
    if (/(Y+)/.test(format)) { //year  YYYY
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

// formatDate(new Date(), "当前日期为：YYYY-MM-DD，星期w，为第qq季度，时间为：hh:mm:ss:c")


export  {format,formatDate}