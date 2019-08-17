/**
 * 获取标签下的所有文章信息
 * @author lxfriday
 */
const request = require('request-promise')
const async = require('async')
const { makeUrl, tagList } = require('./assets/tagList')
const saveData = require('./utils/saveDataTofile')

const pageSize = 100
let articleCount = 0
let rank = tagList.length + 1
async function spider({ id, title, entryCount, subscribersCount }, cb) {
  const urls = []
  rank--
  for (let i = 0; i <= Math.ceil(entryCount / pageSize); i++) {
    urls.push(makeUrl(id, i, pageSize))
  }
  const fileName = `${rank}-${title}-${id}`
  await async.mapLimit(
    urls,
    3,
    async function(url) {
      console.log(url)

      const response = await request(url, {
        json: true,
      })

      return response.d.entrylist
    },
    (err, contents) => {
      if (err) throw err
      let res = []

      // flatten
      for (let i = 0; i < contents.length; i++) {
        res = res.concat(contents[i])
      }

      articleCount += res.length
      saveData('articleData', `${fileName}.json`, res)

      console.log(
        `排名： ${rank}, id： ${id}, 标题： ${title}, 文章数： ${entryCount}, 关注数： ${subscribersCount}`
      )

      cb()
    }
  )
}

async.eachLimit(
  tagList.reverse(),
  1,
  (tag, cb) => {
    spider(tag, cb)
  },
  err => {
    if (err) throw err
    console.log('finished')
    console.log('articleCount =>', articleCount)
  }
)
