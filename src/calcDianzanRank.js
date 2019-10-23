const chalk = require('chalk')
const request = require('request-promise')
const { createHeap, findMaxPrev } = require('./utils/sortPrev')
const travelArticleData = require('./utils/travelArticleData')
const saveDataTofile = require('./utils/saveDataTofile')

const idSet = new Set()
const allArticleObj = {}

function compareVal(a) {
  return a.collectionCount || 0
}

const target = Array(10000).fill({ collectionCount: 0 })

createHeap(target, compareVal)

travelArticleData(articleInfo => {
  const { objectId, user, collectionCount } = articleInfo
  if (!idSet.has(objectId)) {
    idSet.add(objectId)
    allArticleObj[objectId] = objectId
    console.log(
      chalk.cyan(
        `collectionCount => ${collectionCount}, user => ${user.username}, level => ${user.level}`
      )
    )

    findMaxPrev(articleInfo, target, compareVal)
  }
})

target.sort((a, b) => b.collectionCount - a.collectionCount)

saveDataTofile('calcDianzanRank', `点赞rank.json`, target)

// save as md
async function generateMd() {
  const { sysTime1 } = await request('http://quan.suning.com/getSysTime.do', {
    json: true,
  })

  const timeStr = sysTime1.substr(0, 8)
  const title = `# 点赞排行(${timeStr})\n\n`
  let content = '👍 点赞数，📌 标签\n'
  target.forEach((v, i) => {
    content += `- (${i + 1})[👍 ${v.collectionCount}][📌 ${v.tags[0].title}][${
      v.user.username
    }] [${v.title}](${v.originalUrl})\n`
  })

  saveDataTofile('calcDianzanRank', `点赞rank.md`, title + content, false)
}

generateMd()
