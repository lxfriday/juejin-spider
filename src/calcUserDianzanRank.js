/**
 * 计算用户点赞量排名
 * @author lxfriday
 */
const chalk = require('chalk')
const request = require('request-promise')
const { createHeap, findMaxPrev } = require('./utils/sortPrev')
const travelArticleData = require('./utils/travelArticleData')
const saveDataTofile = require('./utils/saveDataTofile')

const idSet = new Set()

function compareVal(a) {
  return a.user.totalCollectionsCount || 0
}

const target = Array(5000).fill({ user: { totalCollectionsCount: 0 } })

createHeap(target, compareVal)

travelArticleData(articleInfo => {
  const { user } = articleInfo
  const { objectId } = user
  if (!idSet.has(objectId)) {
    idSet.add(objectId)
    console.log(
      chalk.cyan(
        `totalCollectionsCount => ${user.totalCollectionsCount}, user => ${user.username}, level => ${user.level}`
      )
    )

    findMaxPrev(articleInfo, target, compareVal)
  }
})

target.sort(
  (a, b) => b.user.totalCollectionsCount - a.user.totalCollectionsCount
)

saveDataTofile('calcUserDianzanRank', `用户点赞rank.json`, target)

// save as md
async function generateMd() {
  const { sysTime1 } = await request('http://quan.suning.com/getSysTime.do', {
    json: true,
  })

  const timeStr = sysTime1.substr(0, 8)
  const title = `# 用户点赞排行(${timeStr})\n\n`
  let content = '🎉 等级，👍 点赞数，🏠公司\n'
  target.forEach(({ user }, i) => {
    content += `- (${i + 1})[🎉 ${user.level}][👍 ${
      user.totalCollectionsCount
    }] [🏠 ${user.company}] [${user.username}](https://juejin.im/user/${
      user.objectId
    })\n`
  })

  saveDataTofile(
    'calcUserDianzanRank',
    `用户点赞rank.md`,
    title + content,
    false
  )
}

generateMd()
