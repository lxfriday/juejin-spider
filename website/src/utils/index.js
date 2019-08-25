import cloneDeep from 'lodash/cloneDeep'
import pathToRegexp from 'path-to-regexp'
import moment from 'moment'

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname)
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public'

  const isMatch = regexp => {
    return regexp instanceof RegExp ? regexp.test(pathname) : pathMatchRegexp(regexp, pathname)
  }

  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regexp of item.include) {
        if (isMatch(regexp)) {
          include = true
          break
        }
      }
    }

    if (include && item.exclude) {
      for (const regexp of item.exclude) {
        if (isMatch(regexp)) {
          exclude = true
          break
        }
      }
    }

    if (include && !exclude) {
      result = item.name
      break
    }
  }
  return result
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(array, id = 'id', parentId = 'pid', children = 'children') {
  const result = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))

  const getPath = current => {
    const currentParentId = hashMap.get(current[id])[parentId]
    if (currentParentId) {
      result.push(hashMap.get(currentParentId))
      getPath(hashMap.get(currentParentId))
    }
  }

  getPath(current)
  return result
}

/**
 * 转换单个时间
 * @param timeStamp 10位时间戳
 * @param format 转换的格式
 * @return 转换后的时间
 */
export function timeTransform(timeStamp, format = 'YYYY/MM/DD HH:mm') {
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

/**
 * 用户数据量很大，需要依据id切分到不同的文件中，使用id查询的时候直接命中这个文件，再从这个文件获取值
 * uidfile('57a0c28979bc440054958498') === "52.json"
 * 用户 objectId 处理算法
 */
export const uidfile = uid => `${[...uid].reduce((sum, c) => sum + parseInt(c, 16), 0) % 50}.json`

export function getLastSevenDay() {
  const ret = []
  const today = moment()
  ret.push(today.format('YYYYMMDD'))
  today.subtract(1, 'd')
  ret.push(today.format('YYYYMMDD'))
  today.subtract(1, 'd')
  ret.push(today.format('YYYYMMDD'))
  today.subtract(1, 'd')
  ret.push(today.format('YYYYMMDD'))
  today.subtract(1, 'd')
  ret.push(today.format('YYYYMMDD'))
  today.subtract(1, 'd')
  ret.push(today.format('YYYYMMDD'))
  today.subtract(1, 'd')
  ret.push(today.format('YYYYMMDD'))
  return ret // ["20190824", "20190823", "20190822", "20190821", "20190820", "20190819", "20190818"]
}
