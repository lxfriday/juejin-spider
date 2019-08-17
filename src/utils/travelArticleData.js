/**
 * 读取 articleData 中每个文件的每个文章元数据
 * @author lxfriday
 */
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const async = require('async')

const articleDirPath = path.resolve(__dirname, '../assets/articleData/')

function travelJsonFileData(fileName, cb, travelFunc) {
  if (fileName.split('.')[1] !== 'json') {
    cb()
    return
  }
  console.log(chalk.blue('fileName => ', fileName))

  const filePath = path.resolve(articleDirPath, fileName)
  const data = JSON.parse(fs.readFileSync(filePath))

  async.eachLimit(
    data,
    1,
    (d, callback) => {
      d && travelFunc(d)
      callback()
    },
    err => {
      if (err) throw err
    }
  )

  cb()
}

module.exports = travelFunc => {
  const files = fs.readdirSync(articleDirPath)
  async.eachLimit(
    files,
    1,
    (fileName, cb) => {
      travelJsonFileData(fileName, cb, travelFunc)
    },
    err => {
      if (err) throw err
      console.log('travel finished')
    }
  )
}
