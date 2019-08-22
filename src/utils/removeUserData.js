/**
 * 移除 userData 文件夹下面的文件，每天重新生成
 * @author lxfriday
 */
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const userDataDirPath = path.resolve(__dirname, '../assets/userData')

module.exports = () => {
  const files = fs.readdirSync(userDataDirPath)
  files.forEach(v => {
    shell.rm(path.resolve(userDataDirPath, v))
  })
  console.log('userData dir cleaned!')
}
