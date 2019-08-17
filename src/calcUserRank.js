/**
 * 用户站内排名，用户的关注者
 * @author lxfriday
 */
const chalk = require('chalk')
const { createHeap, findMaxPrev } = require('./utils/sortPrev')
const travelArticleData = require('./utils/travelArticleData')
const saveDataTofile = require('./utils/saveDataTofile')

const idSet = new Set()

function compareVal(a) {
  return a.user.followersCount || 0
}

const target = Array(2000).fill({ user: { followersCount: 0 } })

createHeap(target, compareVal)

travelArticleData(articleInfo => {
  const { user } = articleInfo
  if (!idSet.has(user.objectId)) {
    idSet.add(user.objectId)
    console.log(
      chalk.cyan(
        `user => ${user.username}, level => ${user.level}, followersCount => ${user.followersCount}, company => ${user.company}`
      )
    )

    findMaxPrev(articleInfo, target, compareVal)
  }
})

target.sort((a, b) => b.user.followersCount - a.user.followersCount)

saveDataTofile('calcUserRank', `用户followerRank.json`, target)

// save as md
function generateMd() {
  const title = '# 用户follower排行 \r\n\r\n'
  let content = '🎉 等级，👦 关注数，🏠公司 \r\n'
  target.forEach(({ user }, i) => {
    content += `- (${i + 1})[🎉 ${user.level}][👦 ${user.followersCount}] [🏠 ${
      user.company
    }] [${user.username}](https://juejin.im/user/${user.objectId}) \r\n`
  })

  saveDataTofile('calcUserRank', `用户followerRank.md`, title + content, false)
}

generateMd()
