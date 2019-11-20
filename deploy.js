#!/usr/bin/env node
/**
 * 自动执行器
 * 1、自动抓数据，运算排名
 * 2、自动 git add、git commit、git tag、 git push
 */
const request = require('request-promise')
const shell = require('shelljs')

// 获取当前时间
// http://quan.suning.com/getSysTime.do

setTimeout(() => {
  // eslint-disable-next-line
  ;(async () => {
    const { sysTime1 } = await request('http://quan.suning.com/getSysTime.do', {
      json: true,
    })
    const timeStr = sysTime1.substr(0, 8)
    // git
    shell.exec(`npm run sitedata`)
    shell.exec(`git add . && git commit -m "build: ${timeStr}"`)
    shell.exec('git push')
    shell.exec(`git tag ${timeStr}`)
    shell.exec('git push --tags')

    shell.echo('-------')
    shell.echo('start deploy')
    shell.exec('sh ./deploy.sh')
    shell.echo('pushed to gitee')
  })()
}, 0)
