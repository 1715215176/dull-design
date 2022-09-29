function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import style from "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var Calendar = function Calendar(props) {
  var visiable = props.visiable,
      format = props.format;
  var weeks = ['一', '二', '三', '四', '五', '六', '日'];

  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      calendarData = _React$useState2[0],
      setCalendarData = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectDate = _React$useState4[0],
      setSelectDate = _React$useState4[1];

  React.useEffect(function () {
    initCalendarDate();
  }, []);
  /**
   * 初始化日历
   */

  var initCalendarDate = function initCalendarDate() {
    var currenDay = new Date();
    var result = [];
    var currentMonth = currenDay.getMonth() + 1;
    var currentYear = currenDay.getFullYear();
    ;

    for (var index = 0; index < 36; index++) {
      result.push({
        year: "".concat(currentYear, "\u5E74").concat(currentMonth, "\u6708"),
        list: initCalendarCurrentMonthDate(currentMonth, currentYear)
      });

      if (currentMonth % 12 === 0) {
        currentYear += 1;
        currentMonth = 1;
      } else {
        currentMonth += 1;
      }
    }

    getDefaultActiveDay(JSON.parse(JSON.stringify(result))); // setCalendarData();
  };
  /**
   *  默认选择今天
   */


  var getDefaultActiveDay = function getDefaultActiveDay(result) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var currentYearMonth = "".concat(year, "\u5E74").concat(month, "\u6708");
    result.forEach(function (item) {
      if (item.year === currentYearMonth) {
        item.list.forEach(function (element) {
          if (element.day === day) {
            element.active = true;
            element.tipText = '今天';
          }
        });
      }
    });
    setCalendarData(JSON.parse(JSON.stringify(result)));
  };
  /**
   * @name 选择日期
   * @param currentYearMonth 
   * @param day 
   * @returns 
   */


  var handleChangeCalender = function handleChangeCalender(currentYearMonth, day) {
    if (!day) return false;
    var isContinuous = props.isContinuous || true;
    var data = calendarData;
    var selectDates = JSON.parse(JSON.stringify(selectDate));
    var currentChooseDate = getTimes("".concat(currentYearMonth).concat(day));

    if (selectDate.length === 2) {
      selectDates = [];
    }

    if (selectDates.length > 0 && selectDates.length <= 2) {
      var firstChooseDate = getTimes(selectDates[0]);
      selectDates = ["".concat(currentYearMonth).concat(day)].concat(_toConsumableArray(selectDate));

      if (firstChooseDate >= currentChooseDate) {
        // '第1次大于第二次'
        data.forEach(function (item) {
          item.list.forEach(function (element) {
            if (element.tipText === '开始') {
              element.tipText = '结束';
            } // // 开始和结束日期的区间进行选中


            if (getTimes(selectDates[0]) <= getTimes("".concat(item.year).concat(element.day)) && getTimes("".concat(item.year).concat(element.day)) <= getTimes(selectDates[1])) {
              element.active = true;

              if (!element.tipText) {
                element.otherActive = true;
              }
            }
          });

          if (item.year === currentYearMonth) {
            item.list.forEach(function (element) {
              if (element.day === day) {
                element.active = true;
                element.otherActive = false;
                element.tipText = '开始';
                setSelectDate(function (pre) {
                  var result = JSON.parse(JSON.stringify(pre));
                  result = ["".concat(currentYearMonth).concat(day)].concat(_toConsumableArray(selectDate));
                  return result;
                });
              }
            });
          }
        });
      } else {
        // '第2次大于第1次'
        data.forEach(function (item) {
          if (item.year === currentYearMonth) {
            item.list.forEach(function (element) {
              if (element.day === day) {
                element.active = true;
                element.tipText = '结束';
                setSelectDate(function (pre) {
                  var result = JSON.parse(JSON.stringify(pre));
                  result.push("".concat(currentYearMonth).concat(day));
                  return result;
                });
              }
            });
          }

          item.list.forEach(function (element) {
            // // 开始和结束日期的区间进行选中
            if (firstChooseDate <= getTimes("".concat(item.year).concat(element.day)) && getTimes("".concat(item.year).concat(element.day)) <= currentChooseDate) {
              element.active = true;

              if (!element.tipText) {
                element.otherActive = true;
              }
            }
          });
        });
      }

      setTimeout(function () {
        props.closeCalender();
        props.onSuccess(returnDateList(selectDates));
      }, 700);
    } else {
      data.forEach(function (item) {
        item.list.forEach(function (element) {
          element.active = false;
          element.tipText = '';
          element.otherActive = false;
        });

        if (item.year === currentYearMonth) {
          item.list.forEach(function (element) {
            if (element.day === day) {
              // '第1次'
              element.active = true;
              element.tipText = '开始';
              setSelectDate(["".concat(currentYearMonth).concat(day)]);
            }
          });
        }
      });
    }

    setCalendarData(JSON.parse(JSON.stringify(data)));
  };
  /**
   * 获取时间戳
   */


  var getTimes = function getTimes(str) {
    var resultStr = str.replace('年', '-').replace('月', '-');
    var date = new Date(resultStr);
    return date.getTime();
  };
  /**
   *  返回日期值处理
   */


  var returnDateList = function returnDateList(selectDates) {
    console.log(selectDates);
    var arr = [];
    arr = selectDates.map(function (item) {
      if (format === 'YYYY-MM-DD') {
        return item.replace('年', '-').replace('月', '-');
      } else {
        return new Date(item.replace('年', '-').replace('月', '-'));
      }
    });
    if (format === 'MM-DD') return arr.pop();
    if (format === 'YYYY-MM-DD') return arr;
  };
  /**
   *  获取当前页的日历
   * @param currentMonth 
   * @param currentYear
   */


  var initCalendarCurrentMonthDate = function initCalendarCurrentMonthDate(currentMonth, currentYear) {
    var date = new Date(currentYear, currentMonth, 0);
    var days = date.getDate(); // 当前月有多少天

    date.setDate(1);
    var day = date.getDay(); // 第一天是星期几

    var delay = day - 1; // 因为星期天在getDay的返回中是0，固特殊处理

    if (day == 0) {
      delay = 6;
    }

    var list = [];

    for (var i = 0; i < days + delay; i++) {
      if (i < delay) {
        list.push({
          day: 0,
          id: i,
          disable: false,
          active: false,
          otherActive: false
        });
      } else {
        list.push({
          id: i,
          day: i - delay + 1,
          disable: false,
          active: false,
          otherActive: false
        });
      }
    }

    return list;
  };

  return /*#__PURE__*/_jsxs("div", {
    className: "".concat(style.calender_container, " ").concat(visiable ? style.topShowCalenderAnimate : selectDate.length > 0 ? style.topHideCalenderAnimate : ''),
    children: [/*#__PURE__*/_jsx("div", {
      className: style.weeks_fixed,
      children: weeks.map(function (item) {
        return /*#__PURE__*/_jsx("span", {
          className: style.weeks_fixed_item,
          children: item
        }, item);
      })
    }), /*#__PURE__*/_jsx("div", {
      className: style.calender_container_main_warp,
      children: calendarData.map(function (item) {
        return /*#__PURE__*/_jsxs(React.Fragment, {
          children: [/*#__PURE__*/_jsx("div", {
            className: style.calender_header,
            children: item.year
          }, item.year), /*#__PURE__*/_jsx("div", {
            className: style.calender_item_warp,
            children: item.list.map(function (calenderItem, index) {
              return /*#__PURE__*/_jsxs("div", {
                onClick: function onClick() {
                  return handleChangeCalender(item.year, calenderItem.day);
                },
                className: "".concat(style.calender_item, "\n                         ").concat(calenderItem.otherActive ? style.other_active : '', " \n                         ").concat(calenderItem.active ? style.active : '', " "),
                children: [/*#__PURE__*/_jsx("span", {
                  children: calenderItem.day || ''
                }), calenderItem.tipText && /*#__PURE__*/_jsx("span", {
                  className: style.calender_item_tiptext,
                  children: calenderItem.tipText
                })]
              }, calenderItem.id);
            })
          })]
        }, item.year);
      })
    })]
  });
};

export default Calendar;