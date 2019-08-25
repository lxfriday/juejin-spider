/**
 * 用户数据量很大，需要依据id切分到不同的文件中，使用id查询的时候直接命中这个文件，再从这个文件获取值
 * 用户 objectId 处理算法
 * @author lxfriday
 */

const userTimelineFileName = uid =>
  `${[...uid].reduce((sum, c) => sum + parseInt(c, 16), 0) % 50}.json`

// userTimelineFileName('57a0c28979bc440054958498') === "52.json"

module.exports = userTimelineFileName
