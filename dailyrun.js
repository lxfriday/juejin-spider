#!/usr/bin/env node
/**
 * 自动执行器
 * 1、自动抓数据，运算排名
 * 2、自动 git add、git commit、git tag、 git push
 */
const shell = require('shelljs')

// 获取当前时间
// http://quan.suning.com/getSysTime.do

// eslint-disable-next-line
;(async () => {
  // wait
  shell.exec('npm run all')
})()
