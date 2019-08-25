const path = require('path')

const prjRoot = path.resolve(__dirname, '../../')
const sitedata = path.resolve(__dirname, '../sitedata/data')
const websitedata = path.resolve(__dirname, '../../website/public/data')

module.exports = {
  root: prjRoot,
  sitedataDir: sitedata,
  websitedataDir: websitedata,
}
