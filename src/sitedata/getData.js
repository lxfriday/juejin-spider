/**
 * 获取指定日期的数据
 * @author
 */
const request = require('request-promise')
const async = require('async')
const path = require('path')
const fs = require('fs')

const travelArticleData = require('../utils/travelArticleData')
const uidfile = require('../utils/uidfile')
const saveDataTofile = require('../utils/saveDataTofile')
const { websitedataDir } = require('../utils/path')

const allUserObj = {}
let userCount = 0
const idSet = new Set()

travelArticleData(articleInfo => {
  const {
    user: {
      followersCount,
      totalCollectionsCount,
      totalCommentsCount,
      objectId,
    },
  } = articleInfo
  if (!idSet.has(objectId) && objectId) {
    idSet.add(objectId)
    userCount++
    const filename = uidfile(objectId)
    if (allUserObj[filename]) {
      allUserObj[filename][objectId] = [
        followersCount,
        totalCollectionsCount,
        totalCommentsCount,
      ]
    } else {
      allUserObj[filename] = {
        // 关注者，总点赞量，总评论量
        // [followersCount, totalCollectionsCount, totalCommentsCount]
        [objectId]: [followersCount, totalCollectionsCount, totalCommentsCount],
      }
    }
  }
})
;(async () => {
  const { sysTime1 } = await request('http://quan.suning.com/getSysTime.do', {
    json: true,
  })

  const yearDate = sysTime1.substr(0, 8) // 20190825
  const yearDateDirPath = path.resolve(websitedataDir, yearDate)

  const yearDateDirExist = fs.existsSync(yearDateDirPath)
  if (!yearDateDirExist) {
    fs.mkdirSync(yearDateDirPath)
  }
  saveDataTofile(
    `../../website/public/data/${yearDate}`,
    `userCount.txt`,
    userCount,
    false
  )

  const filenameArr = Object.keys(allUserObj)
  async.eachLimit(
    filenameArr,
    1,
    (filename, cb) => {
      saveDataTofile(
        `../../website/public/data/${yearDate}`,
        `${filename}`,
        allUserObj[filename]
      )
      cb()
    },
    err => {
      if (err) throw err
      console.log('getData finished')
    }
  )
})()
