window.onload = () => {
  Date.prototype.getMonthFirstDay = function() {
    let cDate = new Date(this);
    cDate.setDate(1);
    return cDate;
  };

  Date.prototype.getFirstDay = function() {
    let cDate = new Date(this);
    cDate.setDate(1);
    let cWeek = cDate.getDay();
    cDate.setDate(cDate.getDate() - ((cWeek === 0 ? 7 : cWeek) - 1));
    return cDate;
  };

  Date.prototype.getMonthLastDay = function() {
    let cDate = new Date(this);
    cDate.setMonth(cDate.getMonth() + 1);
    cDate.setDate(0);
    return cDate;
  };

  Date.prototype.getLastDay = function() {
    let cDate = new Date(this);
    cDate.setMonth(cDate.getMonth() + 1);
    cDate.setDate(0);
    let cWeek = cDate.getDay();
    cDate.setDate(cDate.getDate() + (7 - (cWeek === 0 ? 7 : cWeek)));

    return cDate;
  };

  Date.prototype.getWeeks = function() {
    let cDate = new Date(this);
    let firstDay = cDate.getFirstDay();
    let lastDay = cDate.getLastDay();
    // 因为没有设置第一天和最后一天的时分秒，所以计算值小一天
    return (Math.abs(lastDay - firstDay) / 1000 / 60 / 60 / 24 + 1) / 7;
  };

  Date.prototype.dateFormat = function() {
    let cDate = new Date(this);
    let year = cDate.getFullYear();
    let month = cDate.getMonth() + 1;
    let date = cDate.getDate();

    return [
      year,
      month >= 10 ? month : "0" + month,
      date >= 10 ? date : "0" + date
    ].join("-");
  };

  let cDate = new Date(); //2020-02-17
  cDate.setMonth(cDate.getMonth() + 1); //2020-03-17

  // console.log("当前日期: " + cDate.dateFormat());
  // console.log("当前月份第一天: " + cDate.getMonthFirstDay().dateFormat());
  // console.log("当前月份最后一天: " + cDate.getMonthLastDay().dateFormat());
  // console.log("自定义日历第一天: " + cDate.getFirstDay().dateFormat());
  // console.log("自定义日历最后一天: " + cDate.getLastDay().dateFormat());
  // console.log("总共多少个星期: " + cDate.getWeeks());
  let htmlTpl = "";
  let weeks = cDate.getWeeks();
  let days = [];

  for (let i = 0; i < weeks; i++) {
    htmlTpl += "<tr>";
    let cFirstDay = cDate.getFirstDay();

    for (let j = 0; j < 7; j++) {
      let cLoopDate = new Date(cFirstDay);
      cLoopDate.setDate(cFirstDay.getDate() + i * 7 + j);
      let itemDate = cLoopDate.getDate();
      let className = "";
      if (cLoopDate.getMonth() < cDate.getMonth()) {
        className = " month-prev ";
      }
      if (cLoopDate.getMonth() > cDate.getMonth()) {
        className = " month-next ";
      }
      htmlTpl += `<td>
                        <div class="day-item${className}">
                          <div class="day">${itemDate}</div>
                        </div>
                      </td>`;
    }
    htmlTpl += "</tr>";
  }

  document
    .getElementById("calendar")
    .querySelector("tbody").innerHTML = htmlTpl;
};
