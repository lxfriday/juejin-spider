/**
 * 用户 objectId 经 uidfile 算法处理之后的分布状况
 * @author lxfriday
 */

const travelArticleData = require('../../utils/travelArticleData')
const uidfile = require('../../utils/uidfile')
const saveDataTofile = require('../../utils/saveDataTofile')

const allUserObj = {}
let userCount = 0
const idSet = new Set()

travelArticleData(articleInfo => {
  const { user } = articleInfo
  const { objectId } = user
  if (!idSet.has(objectId) && objectId) {
    idSet.add(objectId)
    userCount++
    const filenamne = uidfile(objectId)
    if (allUserObj[filenamne]) {
      allUserObj[filenamne] += 1
    } else {
      allUserObj[filenamne] = 1
    }
  }
})

const info = Object.keys(allUserObj)
  .map(filename => ({ f: filename, c: allUserObj[filename] }))
  .sort((a, b) => a.c - b.c)

let content = `# uidfile\n\n 统计用户数：${userCount}\n\n`

for (let i = 0; i < info.length; i++) {
  console.log(
    `${info[i].f} => ${info[i].c} ${((info[i].c * 100) / userCount).toFixed(
      1
    )}%`
  )
  content += `- ${info[i].f} => ${info[i].c} **${(
    (info[i].c * 100) /
    userCount
  ).toFixed(1)}%**\n`
}

saveDataTofile('../sitedata/uidfile', `uidfile.md`, content, false)
