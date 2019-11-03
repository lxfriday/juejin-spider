# 根据主题筛选优秀文章

`topics.json` 存放将要获取的关键字数据，一个关键字会生成一个统计，不要带上空格，用 `&` 做 and 查询，用 `|` 做 or 查询

```
搜索标题带有 rn 或者 react-native
["rn|react-native"]
搜索标题带有 rn 而且带有 react-native
["rn&react-native"]
```

执行 `node index.js` 等待筛选排序完毕
