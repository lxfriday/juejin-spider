import moment from 'moment'

/**
 * 获取本周的开始日期和结束日期
 * @param time moment moment可识别的参数
 * @returns {{weekDay: number, weekStartDay: moment.Moment, weekEndDay: moment.Moment}}
 */
export function getWeekInfo(time = new Date()) {
  const startTime = getDateStartAndEnd(time).start

  const weekDay = +moment(startTime).format('E') // 今天是本周的第几天
  const weekStartDay = moment(startTime).subtract(weekDay - 1, 'd') // 本周的周一时间
  const weekEndDay = moment(startTime)
    .add(8 - weekDay, 'd')
    .subtract(1, 's') // 本周的周日时间
  return {
    weekDay,
    weekStartDay,
    weekEndDay,
  }
}

/**
 * 获取日期上某一天的开始时间和结束时间
 * @param date
 * @returns {{start: moment.Moment, end: moment.Moment}}
 */
export function getDateStartAndEnd(date = new Date()) {
  const start = moment(moment(date).format('YYYY-MM-DD') + ' 00:00:00') // 那天的开始的时间
  const end = moment(moment(date).format('YYYY-MM-DD') + ' 23:59:59') // 那天的开始的时间
  return {
    start,
    end,
  }
}

/**
 * 转换单个时间
 * @param timeStamp 10位时间戳
 * @param format 转换的格式
 * @return 转换后的时间
 */
export function timeTransform(timeStamp, format = 'YYYY-MM-DD HH:mm') {
  return moment(timeStamp * 1000).format(format)
}

/**
 * 转换单个时间
 * @param timeStamp 10位时间戳
 * @param format 转换的格式
 * @return 转换后的时间
 */
export function timeFromNow(timeStamp) {
  return moment(timeStamp * 1000).fromNow()
}
