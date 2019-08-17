/**
 * 获取所有的作者信息
 * @author lxfriday
 */

const chalk = require('chalk')

const travelArticleData = require('./utils/travelArticleData')
const saveDataTofile = require('./utils/saveDataTofile')

let allUserObj = {}
let count = 0
let fileIndex = 0
const idSet = new Set()

travelArticleData(articleInfo => {
  const { user } = articleInfo
  const { objectId } = user
  if (!idSet.has(objectId)) {
    idSet.add(objectId)
    count++
    allUserObj[objectId] = user
    console.log(
      chalk.cyan(`username => ${user.username}, company => ${user.company}`)
    )
    if (count % 5000 === 0) {
      fileIndex++
      saveDataTofile('userData', `${fileIndex}-userData.json`, allUserObj)
      allUserObj = {}
      console.log(chalk.green(`fileIndex => ${fileIndex}, count => ${count}`))
    }
  }
})

fileIndex++
saveDataTofile('userData', `${fileIndex}-userData.json`, allUserObj)
console.log(chalk.green(`fileIndex => ${fileIndex}, count => ${count}`))

allUserObj = {}

saveDataTofile('', 'userDataCount.txt', count)
