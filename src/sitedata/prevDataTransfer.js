/**
 * 对以往产生的数据进行转移补充
 * @author lxfriday
 */
const chalk = require('chalk')
const async = require('async')
const path = require('path')
const fs = require('fs')

const uidfile = require('../utils/uidfile')
const saveDataTofile = require('../utils/saveDataTofile')
const { sitedataDir } = require('../utils/path')

const yearDate = '20190824'

const targetDir = path.resolve(sitedataDir, `../prevdata/${yearDate}/`)
const allUserObj = {}
let userCount = 0
const idSet = new Set()

function travelJsonFileData(fileName, cb, travelFunc) {
  if (fileName.split('.')[1] !== 'json') {
    cb()
    return
  }
  console.log(chalk.blue('fileName => ', fileName))

  const filePath = path.resolve(targetDir, fileName)
  const jsonData = JSON.parse(fs.readFileSync(filePath))

  async.eachLimit(
    Object.keys(jsonData),
    1,
    (objectId, callback) => {
      objectId && travelFunc(jsonData[objectId])
      callback()
    },
    err => {
      if (err) throw err
    }
  )

  cb()
}

function travelArticleData(travelFunc) {
  const files = fs.readdirSync(targetDir)
  async.eachLimit(
    files,
    1,
    (fileName, cb) => {
      travelJsonFileData(fileName, cb, travelFunc)
    },
    err => {
      if (err) throw err
      console.log('travelArticleData finished')
    }
  )
}

travelArticleData(user => {
  const {
    followersCount,
    totalCollectionsCount,
    totalCommentsCount,
    objectId,
  } = user
  console.log(objectId)

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
  const yearDateDirPath = path.resolve(sitedataDir, yearDate)

  const yearDateDirExist = fs.existsSync(yearDateDirPath)
  if (!yearDateDirExist) {
    fs.mkdirSync(yearDateDirPath)
  }
  saveDataTofile(
    `../sitedata/data/${yearDate}`,
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
        `../sitedata/data/${yearDate}`,
        `${filename}`,
        allUserObj[filename]
      )
      cb()
    },
    err => {
      if (err) throw err
      console.log('sitedata finished')
    }
  )
})()
