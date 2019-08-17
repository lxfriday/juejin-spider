/**
 * 标签列表相关信息
 * @author lxfriday
 */
const path = require('path')
const qs = require('querystring')
const fs = require('fs')

const tagList = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'tagList/tagList.json'))
)

const token =
  'eyJhY2Nlc3NfdG9rZW4iOiJ3NlpSMDJTb1VxRFo0RThiIiwicmVmcmVzaF90b2tlbiI6IkdZTWxTc2lQTkVtSzFvNmIiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D'

/**
 * 标签下的文章列表
 *
 * @method GET
 * @param page 当前的 page
 */
const tagArticleListUrl = (tagId, page, pageSize = 100, sort = 'hotIndex') => {
  const opts = {
    src: 'web',
    token,
    tagId,
    page,
    pageSize,
    sort, // hotIndex 最热
  }

  return `https://timeline-merger-ms.juejin.im/v1/get_tag_entry?${qs.stringify(
    opts
  )}`
}

module.exports = {
  makeUrl: tagArticleListUrl,
  tagList,
}
