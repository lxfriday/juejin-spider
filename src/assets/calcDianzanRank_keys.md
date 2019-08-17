# 统计的字段

```js
// 提取和排序
const keys = (pi) => {
  return {
    "collectionCount": pi.collectionCount, // 点赞数
      "commentsCount": pi.commentsCount, // 评论数
      "tags": pi.tags,
      "originalUrl": pi.originalUrl, // 文章的 url
      "user": pi.user,
      "hotIndex": pi.hotIndex,
      "title": pi.title,
  }
}

// target obj
{
  "collectionCount": 5, // 点赞数
  "commentsCount": 2, // 评论数
  "tags": [
    {
      "title": "React.js",
      "id": "555e99ffe4b00c57d99556aa"
    }
  ],
  "originalUrl": "https://juejin.im/post/5d3ef3646fb9a06b1b1999fd", // 文章的 url
  "user": {
    "collectedEntriesCount": 154, // 点赞数
    "company": "小米", // 公司
    "followersCount": 35, // 被关注数
    "followeesCount": 70, // 关注数
    "postedPostsCount": 19, // 发布的专栏数
    "level": 2, // 用户等级
    "totalCommentsCount": 16, // 总评论数
    "viewedEntriesCount": 1347, // 查看的文章数
    "jobTitle": "前端", // 工作：前端
    "username": "云影sky", // 用户名
    "objectId": "57a0c28979bc440054958498" // 用户 id
  },
  "hotIndex": 21.2095,
  "title": "React 源码系列-Component、PureComponent、function Component 分析",
}
```
