/**
 * 最大浏览量
 * @author lxfriday
 */
const chalk = require('chalk')
const { createHeap, findMaxPrev } = require('./utils/sortPrev')
const travelArticleData = require('./utils/travelArticleData')
const saveDataTofile = require('./utils/saveDataTofile')

const idSet = new Set()
const allArticleObj = {}

function compareVal(a) {
  return a.viewsCount || 0
}

const target = Array(1000).fill({ viewsCount: 0 })

createHeap(target, compareVal)

travelArticleData(articleInfo => {
  const { objectId, user, viewsCount } = articleInfo
  if (!idSet.has(objectId)) {
    idSet.add(objectId)
    allArticleObj[objectId] = objectId
    console.log(
      chalk.cyan(
        `viewsCount => ${viewsCount}, user => ${user.username}, level => ${user.level}`
      )
    )

    findMaxPrev(articleInfo, target, compareVal)
  }
})

target.sort((a, b) => b.viewsCount - a.viewsCount)

saveDataTofile('calcViewRank', `浏览量rank.json`, target)

// save as md
function generateMd() {
  const title = '# 浏览量排行 \r\n\r\n'
  let content = '👀 浏览量，📌 标签 \r\n'
  target.forEach((v, i) => {
    content += `- (${i + 1})[👀 ${v.viewsCount}][📌 ${v.tags[0].title}] [${
      v.title
    }](${v.originalUrl}) \r\n`
  })

  saveDataTofile('calcViewRank', `浏览量rank.md`, title + content, false)
}

generateMd()
