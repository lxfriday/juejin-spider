/**
 * 请求
 * @author lxfriday
 */
import fetch from 'dva/fetch'
import qs from 'qs'
import { notification } from 'antd'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  // notification.error({
  //   message: `请求错误 ${response.status}: ${response.url}`,
  //   description: errortext,
  // })
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, option) {
  const options = {
    ...option,
  }

  const defaultOptions = {
    credentials: 'include',
  }

  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method !== 'GET') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    }
    newOptions.body = JSON.stringify(newOptions.body)
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      return response.json()
    })
    .catch(e => {
      console.log(e)
    })
}

/**
 * GET 请求
 * @param url
 * @param paramsObj {object} 请求的参数
 * @returns {Promise<void>}
 */
export async function GET(url, paramsObj = null) {
  if (paramsObj) {
    return await request(`${url}?${qs.stringify(paramsObj)}`)
  }
  return await request(url)
}

/**
 * POST 请求
 * @param url
 * @param paramsObj {object}
 * @returns {Promise<void>}
 * @constructor
 */
export async function POST(url, data, paramsObj) {
  return await request(url, {
    method: 'POST',
    body: data,
    ...paramsObj,
  })
}

/**
 * DELETE 请求
 * @param url
 * @param paramsObj {object}
 * @returns {Promise<void>}
 * @constructor
 */
export async function DELETE(url, data, paramsObj) {
  return await request(url, {
    method: 'DELETE',
    body: data,
    ...paramsObj,
  })
}

/**
 * PUT 请求
 * @param url
 * @param paramsObj {object}
 * @returns {Promise<void>}
 * @constructor
 */
export async function PUT(url, data, paramsObj) {
  return await request(url, {
    method: 'PUT',
    body: data,
    ...paramsObj,
  })
}
