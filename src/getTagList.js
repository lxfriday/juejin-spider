/**
 * 获取掘金标签列表
 * @author lxfriday
 */
const request = require('request-promise')
const saveData = require('./utils/saveDataTofile')

const tagListUrl =
  'https://gold-tag-ms.juejin.im/v1/tags/type/hot/page/1/pageSize/10000'

const requestHeaders = {
  'X-Juejin-Src': 'web',
  'X-Juejin-Token':
    'eyJhY2Nlc3NfdG9rZW4iOiJ3NlpSMDJTb1VxRFo0RThiIiwicmVmcmVzaF90b2tlbiI6IkdZTWxTc2lQTkVtSzFvNmIiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
}

;(async () => {
  const {
    d: { tags },
  } = await request(tagListUrl, {
    json: true,
    headers: requestHeaders,
  })
  saveData('tagList', `tagList.json`, tags)
})()
