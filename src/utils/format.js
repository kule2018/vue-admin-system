export default {
  padLeftZero: function(str) {
    return ("00" + str).substr(str.length);
  },
  formatDate(date, fmt) {
    date = new Date(date);
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : this.padLeftZero(str)
        );
      }
    }
    return fmt;
  },
  formatMoney(number, decimals, prefix, dec_point, thousands_sep) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * prefix：前缀
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + "").replace(/[^0-9+-Ee.]/g, "");
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
      pre = typeof prefix === "undefined" ? "" : prefix,
      sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      s = "",
      toFixedFix = function(n, prec) {
        let k = Math.pow(10, prec);
        return "" + Math.ceil(n * k) / k;
      };

    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    let re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return `${pre}${s.join(dec)}`;
  }
};
