const task = process.env.TASK

switch (task) {
  case 'tagList': {
    require('./src/getTagList')
    break
  }
  // 获取所有标签下所有的文章的原始数据
  case 'allTagData': {
    require('./src/getAllArticleData')
    break
  }
  // 把元数据合并成单一的大文件，做除重
  case 'composeArticleData': {
    require('./src/composeArticleData')
    break
  }
  case 'userData': {
    require('./src/getAllUsers')
    break
  }
  case 'dianzan': {
    require('./src/calcDianzanRank')
    break
  }
  case 'userdianzan': {
    require('./src/calcUserDianzanRank')
    break
  }
  case 'view': {
    require('./src/calcViewRank')
    break
  }
  case 'comment': {
    require('./src/calcCommentRank')
    break
  }
  case 'follower': {
    require('./src/calcUserRank')
    break
  }

  case 'uidfile': {
    require('./src/sitedata/uidfile/uidfile')
    break
  }
  case 'sitedata': {
    require('./src/sitedata/getData')
    break
  }
  default:
    break
}
