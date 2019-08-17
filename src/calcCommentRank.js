/**
 * 评论量排行
 * @author lxfriday
 */
const chalk = require('chalk')
const { createHeap, findMaxPrev } = require('./utils/sortPrev')
const travelArticleData = require('./utils/travelArticleData')
const saveDataTofile = require('./utils/saveDataTofile')

const idSet = new Set()
const allArticleObj = {}

function compareVal(a) {
  return a.commentsCount || 0
}

const target = Array(1000).fill({ commentsCount: 0 })

createHeap(target, compareVal)

travelArticleData(articleInfo => {
  const { objectId, user, commentsCount } = articleInfo
  if (!idSet.has(objectId)) {
    idSet.add(objectId)
    allArticleObj[objectId] = objectId
    console.log(
      chalk.cyan(
        `commentsCount => ${commentsCount}, user => ${user.username}, level => ${user.level}`
      )
    )

    findMaxPrev(articleInfo, target, compareVal)
  }
})

target.sort((a, b) => b.commentsCount - a.commentsCount)

saveDataTofile('calcCommentRank', `评论量rank.json`, target)

// save as md
function generateMd() {
  const title = '# 评论量排行 \r\n\r\n'
  let content = '🐶 评论数，📌 标签 \r\n'
  target.forEach((v, i) => {
    content += `- (${i + 1})[🐶 ${v.commentsCount}][📌 ${v.tags[0].title}] [${
      v.title
    }](${v.originalUrl}) \r\n`
  })

  saveDataTofile('calcCommentRank', `评论量rank.md`, title + content, false)
}

generateMd()
