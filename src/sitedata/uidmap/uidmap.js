/**
 * 用户时间线数据统计
 * @author lxfriday
 */

const travelArticleData = require('../../utils/travelArticleData')
const uidmap = require('../../utils/uidmap')
const saveDataTofile = require('../../utils/saveDataTofile')

const allUserObj = {}
const idSet = new Set()

travelArticleData(articleInfo => {
  const { user } = articleInfo
  const { objectId } = user
  if (!idSet.has(objectId) && objectId) {
    idSet.add(objectId)
    const filenamne = uidmap(objectId)
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

let content = '# uidmap\n\n'

for (let i = 0; i < info.length; i++) {
  console.log(`${info[i].f} => ${info[i].c}`)
  content += `- ${info[i].f} => ${info[i].c}\n`
}

saveDataTofile('../sitedata/uidmap', `uidmap.md`, content, false)
