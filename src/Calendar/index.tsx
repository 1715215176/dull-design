import * as React from 'react';
import style from "./index.less"
interface CalendarItemModul {
  id: number;
  day: number;
  disable: boolean;
  active: boolean;
  tipText?: string;
  otherActive: boolean;
}

interface calendarDataModul {
  year: string;
  list: CalendarItemModul[];
}

interface CalendarProps {
  /**
   * 可以这样写属性描述
   * @description       也可以显式加上描述名
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述，使用 description 兜底
   * @default           支持定义默认值
   */
  className?: string; // 支持识别 TypeScript 可选类型为非必选属性
  visiable: boolean;
  isContinuous: boolean; // 日期连续选择 默认为true
  format: 'YYYY-MM-DD' | 'MM-DD' // 格式化
  closeCalender: () => void // 关闭日期选择
  onSuccess: (e: any) => any // 成功的回掉
}


const Calendar = (props: CalendarProps) => {
  const { visiable, format } = props;
  const weeks = ['一', '二', '三', '四', '五', '六', '日']
  const [calendarData, setCalendarData] = React.useState<calendarDataModul[]>([]);
  const [selectDate, setSelectDate] = React.useState<any>([]);

  React.useEffect(() => {
    initCalendarDate()
  }, [])

  /**
   * 初始化日历
   */
  const initCalendarDate = () => {
    const currenDay = new Date();
    let result = []
    let currentMonth = currenDay.getMonth() + 1;
    let currentYear = currenDay.getFullYear();;
    for (let index = 0; index < 36; index++) {
      result.push({
        year: `${currentYear}年${currentMonth}月`,
        list: initCalendarCurrentMonthDate(currentMonth, currentYear)
      })
      if (currentMonth % 12 === 0) {
        currentYear += 1;
        currentMonth = 1;
      } else {
        currentMonth += 1
      }
    }
    getDefaultActiveDay(JSON.parse(JSON.stringify(result)))
    // setCalendarData();
  }

  /**
   *  默认选择今天
   */
  const getDefaultActiveDay = (result: calendarDataModul[]) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentYearMonth = `${year}年${month}月`;
    result.forEach((item) => {
      if (item.year === currentYearMonth) {
        item.list.forEach((element) => {
          if (element.day === day) {
            element.active = true;
            element.tipText = '今天';
          }
        })
      }
    })
    setCalendarData(JSON.parse(JSON.stringify(result)))
  }

  /**
   * @name 选择日期
   * @param currentYearMonth 
   * @param day 
   * @returns 
   */
  const handleChangeCalender = (currentYearMonth: string, day: number) => {
    if (!day) return false;
    const isContinuous = props.isContinuous || true;
    const data = calendarData;
    let selectDates = JSON.parse(JSON.stringify(selectDate));
    let currentChooseDate = getTimes(`${currentYearMonth}${day}`);
    if (selectDate.length === 2) {
      selectDates = [];
    }
    if (selectDates.length > 0 && selectDates.length <= 2) {
      const firstChooseDate = getTimes(selectDates[0]);
      selectDates = [`${currentYearMonth}${day}`, ...selectDate];
      if (firstChooseDate >= currentChooseDate) {    
        // '第1次大于第二次'
        data.forEach((item) => {
          item.list.forEach((element) => {
            if (element.tipText === '开始') {
              element.tipText = '结束'
            }
            // // 开始和结束日期的区间进行选中
            if (getTimes(selectDates[0]) <= getTimes(`${item.year}${element.day}`) && getTimes(`${item.year}${element.day}`) <= getTimes(selectDates[1])) {
              element.active = true;
              if (!element.tipText) {
                element.otherActive = true;
              }
            }
          })
          if (item.year === currentYearMonth) {
            item.list.forEach((element) => {
              if (element.day === day) {
                element.active = true;
                element.otherActive = false;
                element.tipText = '开始';
                setSelectDate((pre: string[]) => {
                  let result = JSON.parse(JSON.stringify(pre));
                  result = [`${currentYearMonth}${day}`, ...selectDate]
                  return result;
                })
              }
            })
          }
        })
      } else {
        // '第2次大于第1次'
        data.forEach((item) => {
          if (item.year === currentYearMonth) {
            item.list.forEach((element) => {
              if (element.day === day) {
                element.active = true;
                element.tipText = '结束';
                setSelectDate((pre: string[]) => {
                  const result = JSON.parse(JSON.stringify(pre));
                  result.push(`${currentYearMonth}${day}`)
                  return result;
                })
              }
            })
          }
          item.list.forEach((element) => {
            // // 开始和结束日期的区间进行选中
            if (firstChooseDate <= getTimes(`${item.year}${element.day}`) && getTimes(`${item.year}${element.day}`) <= currentChooseDate) {
              element.active = true;
              if (!element.tipText) {
                element.otherActive = true;
              }
            }
          })
        })
      }
      setTimeout(() => {
        props.closeCalender()
        props.onSuccess(returnDateList(selectDates))
      }, 700);
    } else {
      data.forEach((item) => {
        item.list.forEach((element) => {
          element.active = false;
          element.tipText = '';
          element.otherActive = false;
        })
        if (item.year === currentYearMonth) {
          item.list.forEach((element) => {
            if (element.day === day) {
              // '第1次'
              element.active = true;
              element.tipText = '开始';
              setSelectDate([`${currentYearMonth}${day}`])
            }
          })
        }
      })
    }
    setCalendarData(JSON.parse(JSON.stringify(data)))
  }

  /**
   * 获取时间戳
   */
  const getTimes = (str: string) => {
    let resultStr = str.replace('年', '-').replace('月', '-');
    let date = new Date(resultStr)
    return date.getTime()
  }

  /**
   *  返回日期值处理
   */
  const returnDateList = (selectDates: string[])=> {
    console.log(selectDates);
    let arr = [];
    arr = selectDates.map((item: string) => {
      if (format === 'YYYY-MM-DD') {
        return item.replace('年', '-').replace('月', '-')
      } else {
        return new Date(item.replace('年', '-').replace('月', '-'))
      }
    })
    if (format === 'MM-DD') return arr.pop();
    if (format === 'YYYY-MM-DD') return arr;
  }

  /**
   *  获取当前页的日历
   * @param currentMonth 
   * @param currentYear
   */
  const initCalendarCurrentMonthDate = (currentMonth: number, currentYear: number): CalendarItemModul[] => {
    let date = new Date(currentYear, currentMonth, 0);
    let days = date.getDate(); // 当前月有多少天
    date.setDate(1);
    let day = date.getDay(); // 第一天是星期几
    let delay = day - 1;
    // 因为星期天在getDay的返回中是0，固特殊处理
    if (day == 0) {
      delay = 6;
    }
    let list = [];
    for (let i = 0; i < days + delay; i++) {
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
        })
      }
    }
    return list;
  }
  return (
    <div className={`${style.calender_container} ${visiable ? style.topShowCalenderAnimate : selectDate.length > 0 ? style.topHideCalenderAnimate : ''}`}>
      <div className={style.weeks_fixed}>
        {weeks.map((item) => {
          return (
            <span key={item} className={style.weeks_fixed_item}>{item}</span>
          )
        })}
      </div>
      <div className={style.calender_container_main_warp}>
        {calendarData.map((item) => {
          return (
            <React.Fragment key={item.year}>
              <div key={item.year} className={style.calender_header}>{item.year}</div>
              <div className={style.calender_item_warp}>
                {item.list.map((calenderItem, index) => {
                  return (
                    <div onClick={() => handleChangeCalender(item.year, calenderItem.day)}
                      key={calenderItem.id}
                      className={
                        `${style.calender_item}
                         ${calenderItem.otherActive ? style.other_active : ''} 
                         ${calenderItem.active ? style.active : ''} `}>
                      <span>{calenderItem.day || ''}</span>
                      {calenderItem.tipText && <span className={style.calender_item_tiptext}>{calenderItem.tipText}</span>}
                    </div>
                  )
                })}
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
};

export default Calendar;