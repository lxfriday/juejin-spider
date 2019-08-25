const path = require('path')

const prjRoot = path.resolve(__dirname, '../../')
const sitedata = path.resolve(__dirname, '../sitedata/data')

module.exports = {
  root: prjRoot,
  sitedataDir: sitedata,
}
