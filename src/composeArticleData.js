/**
 * 组合所有的文章元数据到一个文件中
 * 把 600+ 文件的元数据全部组合到一个文件中，使用 `obj.objectId` 取 key
 * @author lxfriday
 */

const chalk = require('chalk')

const travelArticleData = require('./utils/travelArticleData')
const saveDataTofile = require('./utils/saveDataTofile')

let allDataObj = {}
let count = 0
let fileIndex = 0
const idSet = new Set()

travelArticleData(articleInfo => {
  const { objectId } = articleInfo
  if (!idSet.has(objectId)) {
    idSet.add(objectId)
    count++
    allDataObj[objectId] = articleInfo
    if (count % 5000 === 0) {
      fileIndex++
      saveDataTofile(
        'composedData',
        `${fileIndex}-composedData.json`,
        allDataObj
      )
      allDataObj = {}
      console.log(chalk.green(`fileIndex => ${fileIndex}, count => ${count}`))
    }
  }
})

fileIndex++
saveDataTofile('composedData', `${fileIndex}-composedData.json`, allDataObj)
console.log(chalk.green(`fileIndex => ${fileIndex}, count => ${count}`))

allDataObj = {}

saveDataTofile('', 'composedArticleDataCount.txt', count)
