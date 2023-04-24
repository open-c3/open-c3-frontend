import router from "@/router"
import store from "@/store"
import moment from 'moment'

import { ElNotification } from 'element-plus'

import { t } from './language'

export const g_url = 'http://demo01.openc3.polymericcloud.com'

export const jumpPage = (path: string) => { // 页面跳转
  router.push(path)
}

export const notification = (message: string, type?: string, title?: string) => { // 公用弹框
  ElNotification.closeAll()
  const param: any = {
    message: t(message),
    type: type || 'success',
    duration: 4000
  }
  if (title) param.title = title
  ElNotification(param)
}
// 将时间戳转成 年 月 日 时 分 秒
export const formatUnixTime = (time: number, type?: any) => {
  if (time) {
    var unixTimestamp = new Date(time * 1000)
    var Y = unixTimestamp.getFullYear() + '-'
    var M = (unixTimestamp.getMonth() + 1 < 10 ? '0' + (unixTimestamp.getMonth() + 1) : unixTimestamp.getMonth() + 1) + '-'
    var D = unixTimestamp.getDate() < 9 ? '0' + unixTimestamp.getDate() : unixTimestamp.getDate()
    var h = (unixTimestamp.getHours() > 9 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours()) + ':'
    var m = (unixTimestamp.getMinutes() > 9 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes()) + ':'
    var s = unixTimestamp.getSeconds() > 9 ? unixTimestamp.getSeconds() : '0' + unixTimestamp.getSeconds()
    if (typeof type !== 'undefined') {
      if (type === 'month') {
        var mY = unixTimestamp.getFullYear() + '/'
        var mM = (unixTimestamp.getMonth() + 1 < 10 ? '0' + (unixTimestamp.getMonth() + 1) : unixTimestamp.getMonth() + 1)
        return mY + mM
      } else {
        return Y + M + D
      }
    } else {
      return Y + M + D + ' ' + h + m + s
    }
  } else {
    return '0'
  }
}

/**
 * 秒数转化为时分秒格式
 * @param value {string}
 * @returns {string}
 */
export function changeTime(value: string) {
  let secondTime: number = parseInt(value)// 秒
  let minuteTime: number = 0  // 分
  let hourTime: number = 0   // 小时
  if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(String(secondTime / 60));
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(String(secondTime % 60));
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(String(minuteTime / 60));
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(String(minuteTime % 60));
    }
  }
  let time = "" + parseInt(String(secondTime)) + "秒"
  if (minuteTime > 0) {
    time = "" + parseInt(String(minuteTime)) + "分" + time;
  }
  if (hourTime > 0) {
    time = "" + parseInt(String(hourTime)) + "小时" + time;
  }
  return time;
}

/*
 * 判断密码符合几个条件
 * @param { string } value
 */
export function passwordNum(value: any) {
  let n = 0
  // console.log(/^[a-zA-Z0-9\!\@\#\$\%\^\&\*\\\-\_]{8,}$/.test(value))
  // console.log(value)
  if (!/^[a-zA-Z0-9\!\@\#\$\%\^\&\*\\\-\_]{8,}$/.test(value)) {
    return 2
  }
  n += Number(/[a-z]/.test(value))
  n += Number(/[A-Z]/.test(value))
  n += Number(/[0-9]/.test(value))
  const reg = /[\!\@\#\$\%\^\&\*\\\-\_]/
  n += Number(reg.test(value))
  return n
}

export function formatMsTime(time) {
  if (time) {
    var unixTimestamp = new Date(time)
    var Y = unixTimestamp.getFullYear() + '-'
    var M = (unixTimestamp.getMonth() + 1 < 10 ? '0' + (unixTimestamp.getMonth() + 1) : unixTimestamp.getMonth() + 1) + '-'
    var D = unixTimestamp.getDate() + ' '
    var h = (unixTimestamp.getHours() > 9 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours()) + ':'
    var m = (unixTimestamp.getMinutes() > 9 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes()) + ':'
    var s = unixTimestamp.getSeconds() > 9 ? unixTimestamp.getSeconds() : '0' + unixTimestamp.getSeconds()
    return Y + M + D + h + m + s
  } else {
    return '0'
  }
}

// 判断是否有这个路由地址权限
export function checkRouter(path) {
  const allRouters = store.state.app?.allMenus
  return allRouters.findIndex(item => item.link === path) > -1
}

// 菜单处理
export function dealMenus(menus, allRouters) {
  menus.forEach(item => {
    allRouters.push(item)
    if (item?.children?.length) dealMenus(item.children, allRouters)
  })
}

export function findPage1() { // 找到能够跳转的第一个页面的path
  let path = '403'
  const menus = store.state.app.menus
  if (menus.length) {
    const menu0 = menus[0]
    path = menu0?.children?.length ? menu0.children[0].link : menu0.link
  }
  return path
}


// 权限判断

export function hasPermi(value) {
  const allPermission = '*:*:*'
  const permissions = store.getters && store.getters.permissions
  if (value && value instanceof Array && value.length > 0) {
    const permissionFlag = value

    const hasPermissions = permissions.some(permission => {
      return allPermission === permission || permissionFlag.includes(permission)
    })

    if (!hasPermissions) { // 没有权限
      return false
    } else {
      return true
    }
  } else {
    throw new Error('请设置操作权限标签值')
  }
}

export function hasPermiAny(value) {
  const allPermission = '*:*:*'
  const permissions = store.getters && store.getters.permissions
  if (value && value instanceof Array && value.length > 0) {
    const permissionFlag = value
    const ary = []
    permissionFlag.forEach(per => {
      if (permissions.find(item => item === per) || per === allPermission) {
        ary.push(per)
      }
    })
    if (!ary.length) { // 没有权限
      return false
    } else {
      return true
    }
  } else {
    throw new Error('请设置操作权限标签值')
  }
}

export const handleScreenClick = (doName) => {
  if (doName.requestFullscreen) {  // HTML W3C 提议
    doName.requestFullscreen();
  } else if (doName.msRequestFullscreen) {  // IE11
    //@ts-ignore
    doName.msRequestFullscreen()
  } else if (doName.webkitRequestFullscreen) { // Webkit
    doName.webkitRequestFullscreen()
    //@ts-ignore
  } else if (doName.mozRequestFullScreen) { // Firefox
    //@ts-ignore
    doName.mozRequestFullScreen()
  }
}

export const onExitScreenClick = (doName) => {
  // 退出全屏
  if (document.fullscreenElement) {
    document.exitFullscreen()
    //@ts-ignore
  } else if (doName.msRequestFullScreen) {
    //@ts-ignore
    document.msExitFullscreen()
    //@ts-ignore
  } else if (document.webkitIsFullScreen) {
    //@ts-ignore
    document.webkitCancelFullScreen()
    //@ts-ignore
  } else if (doName.mozRequestFullScreen) {
    //@ts-ignore
    document.mozCancelFullScreen()
  }
}


/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: any) {
  let newObj: any
  try {
    newObj = obj.push ? [] : {}
  } catch (error) {
    newObj = {}
  }
  for (let attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepClone(obj[attr])
    } else {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}

export function dashboard_monthFn(month: string) {
  let text
  text = t('dashboard_month_' + month)
  return text
}

/** 
* 获取传入对象的所有非空属性 
* 
* @param obj
*/

export function getNotEmptyObj(obj) {
  const newObj = {}
  for (let key in obj) { 
    if (obj[key]) { 
      newObj[key] = obj[key]
    }
  }
  return newObj
}

/** 
* 根据传入对象过滤数组
* @param ary
* @param obj
*/
export function filterAry(ary: Array<Object>, obj: Object) {
  const newAry = []
  const keys = Object.keys(obj)
  ary.forEach(item => {
    let flag = true
    keys.forEach(key => {
      if (item[key] === null || typeof item[key] === 'undefined') {
        if (obj[key] !== '') {
          flag = false
        }
      } else if(!item[key].toString().includes(obj[key])) {
        flag = false
      }
    })
    if (flag) {
      newAry.push(item)
    }
  })
  return newAry
}

/** 
* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。 
* 
* @param num1被乘数 | num2乘数 
*/
export function numMulti(num1, num2) {
  var baseNum = 0
  try {
    baseNum += num1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split(".")[1].length
  } catch (e) {
  }
  return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum)
}
/** 
* 除法运算，避免数据相除小数点后产生多位数和计算精度损失。 
* 
* @param num1被除数 | num2除数 
*/
export function numDivision(num1, num2) {
  var baseNum1 = 0, baseNum2 = 0
  var baseNum3, baseNum4
  try {
    baseNum1 = num1.toString().split(".")[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum3 = Number(num1.toString().replace(".", ""))
  baseNum4 = Number(num2.toString().replace(".", ""))
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
}

/**
 * 加法运算，避免数据相除小数点后产生多位数和计算精度损失。 
 */

export function numAddition (num1, num2) {
  let r1, r2, m
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (num1 * m + num2 * m) / m
}

/**
 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
 * @param num1 被减数
 * @param num2 减数 
 */

export function numSub (num1, num2) {
  var baseNum, baseNum1, baseNum2
  var precision // 精度
  try {
    baseNum1 = num1.toString().split(".")[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
}

// 获取开始时间到结束时间之内 所有的时间 输入
export function getCycleTime (timeAry, type) {
  if (timeAry.length === 0) return []
  else if (timeAry.length === 1) return timeAry
  else if (timeAry.length === 2) {
    const ary = []
    const start = timeAry[0].split('-')
    const end = timeAry[1].split('-')
    for (let y = start[0]; y <= end[0]; y++) {
      let m = parseInt(y) === parseInt(start[0]) ? start[1] : 1
      const max = parseInt(y) === parseInt(end[0]) ? end[1] : 12
      for (m; m <= max; m++) {
        if (typeof type !== 'undefined') {
          if (m * 1 < 10) {
            ary.push(`${y}-0${m * 1}`)
          } else {
            ary.push(`${y}-${m}`)
          }
        } else {
          ary.push(`${y}-${m}`)
        }
      }
    }
    return ary
  } else return timeAry
}

// 获取货币符号 type:1 obj 类型 { money_type: '', amount: ''}
export function getCurrency(obj, type) {
  let res = obj
  switch (type) {
    case 1:
      res = getCurrencySymbol(obj.money_type) + obj.amount
      break
    default:
  }
  return res
}

export function getCurrencySymbol (type) {
  const obj = {
    CNY: '¥', // 人民币
    USD: '$', // 美元
    EUR: 'EUR', // 欧元
    JPY: 'JPY', // 日元
    HKD: 'HKD', // 港元
    GBP: 'GBP', // 英镑
    AUD: 'AUD', // 澳元
    NZD: 'NZD', // 新西兰元
    SGD: 'SGD', // 新加坡元
    CHF: 'CHF', // 瑞士法郎
    CAD: 'CAD', // 加元
    MYR: 'MYR', // 马来西亚林吉特
    RUB: 'RUB', // 俄罗斯卢布
    ZAR: 'ZAR', // 南非兰特
    KRW: 'KRW', // 韩元
    AED: 'AED', // 阿联酋迪拉姆
    SAR: 'SAR', // 沙特里亚尔
    HUF: 'HUF', // 匈牙利福林
    PLN: 'PLN', // 波兰兹罗提
    DKK: 'DKK', // 丹麦克朗
    SEK: 'SEK', // 瑞典克朗
    NOK: 'NOK', // 挪威克朗
    TRY: 'TRY', // 新土耳其里拉
    MXN: 'MXN', // 墨西哥元
    THB: 'THB' // 泰铢
  }
  return type === '' ? '' : obj[type.toUpperCase()]
}

// 生成pdf在线预览地址
export function getObjectURL (file) {
  let url = null
  if (typeof window['createObjectURL'] !== 'undefined') { // basic
    url = window['createObjectURL'](file)
  } else if (typeof window.webkitURL !== 'undefined') { // webkit or chrome
    try {
      url = window.webkitURL.createObjectURL(file)
    } catch (error) {
      console.log(error)
    }
  } else if (typeof window.URL !== 'undefined') { // mozilla(firefox)
    try {
      url = window.URL.createObjectURL(file)
    } catch (error) {
      console.log(error)
    }
  }
  return url
}

/**
 * 转换存储单位
 */
export function changeSizeType(size) {
  if (!size) return '0 B'
  const kb = 1024
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(size) / Math.log(kb))
  return parseInt(String((size / Math.pow(kb, i)) * 1000)) / 1000 + ' ' + unit[i]
}

/**
 * 处理小数位数 
 */

export function dealFixed(num, size?) {
  if (!size) size = 2
  let value = num.toFixed(size)
  if (value.toString().indexOf('.') > -1) {
    const arr = value.toString().split('.')
    if (arr[1] == 0) value = arr[0]
  }
  return value
}

// 时间转换 
export const seftime = (starttime: string, finishtime: string) => {
  if (!starttime || JSON.stringify(starttime) === '{}') {
    return '0:00:00';
  }
  if (!finishtime || JSON.stringify(finishtime) === '{}') {
    finishtime = moment().format('YYYY-MM-DD HH:mm:ss')
  }

  let S = new Date(starttime.replace(/-/g, "/"))
  let E = new Date(finishtime.replace(/-/g, "/"))

  let sec = ((E.getTime() - S.getTime()) / 1000);
  let s: string | number = sec % 60;
  if (s < 10) {
    s = '0' + s
  }
  let min = Math.trunc(sec / 60);

  let m: string | number = min % 60;
  if (m < 10) {
    m = '0' + m
  }

  return (Math.trunc(min / 60)) + ':' + m + ':' + s;
}

export const time2date = (time:string) => {
  return time.split(" ")[0]
}

// 文件大小转换
export const bytesToSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const  k = 1000 // or 1024
  const  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const  i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
