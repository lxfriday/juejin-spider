/**
 * 把获取的数据保存到文件中
 * @author lxfriday
 */
const path = require('path')
const fs = require('fs')

function escape(fileName) {
  // eslint-disable-next-line no-useless-escape
  const reg = /[\/]/g
  const newName = fileName.replace(reg, () => {
    return '_'
  })
  return newName
}

module.exports = (dir, fileName, data, stringify = true) => {
  const filePath = path.resolve(__dirname, '../assets', dir, escape(fileName))
  if (stringify) {
    fs.writeFileSync(filePath, JSON.stringify(data))
  } else {
    fs.writeFileSync(filePath, data)
  }
}
