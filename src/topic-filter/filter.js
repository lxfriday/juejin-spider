const chalk = require('chalk')
const request = require('request-promise')
const { createHeap, findMaxPrev } = require('../utils/sortPrev')
const travelArticleData = require('../utils/travelArticleData')
const saveDataTofile = require('../utils/saveDataTofile')

module.exports = function filter(filterName, cb) {
  const calcStart = Date.now()
  console.log(`topic-filter ${filterName} start`)

  const idSet = new Set()
  const allArticleObj = {}

  function compareVal(a) {
    return a.collectionCount || 0
  }

  const target = Array(1000).fill({ collectionCount: 0 })

  createHeap(target, compareVal)

  travelArticleData(articleInfo => {
    const { objectId, user, collectionCount, title } = articleInfo
    if (
      !idSet.has(objectId) &&
      title
        .toLowerCase()
        .replace(/[\s]/g, '')
        .includes(filterName)
    ) {
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

  saveDataTofile('../topic-filter/assets', `filter-${filterName}.json`, target)

  // save as md
  async function generateMd() {
    const { sysTime1 } = await request('http://quan.suning.com/getSysTime.do', {
      json: true,
    })

    const timeStr = sysTime1.substr(0, 8)
    const title = `# ${filterName} 排行(${timeStr})\n\n`
    let content = '👍 点赞数，📌 标签\n'
    target.forEach((v, i) => {
      try {
        content += `- (${i + 1})[👍 ${v.collectionCount}][📌 ${
          v.tags[0].title
        }][${v.user.username}] [${v.title}](${v.originalUrl})\n`
      } catch (e) {
        console.log('maybe some error', e)
        console.log(v)
      }
    })

    saveDataTofile(
      '../topic-filter/assets',
      `filter-${filterName}.md`,
      title + content,
      false
    )
  }

  generateMd()
  console.log(`topic-filter ${filterName} end`)
  console.log(`${((Date.now() - calcStart) / 1000).toFixed(2)} s`)
  cb()
}
