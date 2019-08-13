/**
 * 缴费清单
 * @time 2018/11/22
 * @author lxfriday
 */

import request from 'request';
import cheerio from 'cheerio';

const iconv = require('iconv-lite');

const homeUrl = 'http://zizhu.hzau.edu.cn/log/pay';

export default ({ headercsrf, PHPSESSIDStr }, cb, errCb) => {
  try {
    const buffData = [];
    request.get({
      url: homeUrl,
      headers: {
        Cookie: `${headercsrf}; ${PHPSESSIDStr}`,
        // 'Cache-Control': 'max-age=0',
        // Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        // 'Accept-Encoding': 'gzip, deflate',
        // 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7',
        // Host: 'http://zizhu.hzau.edu.cn',
        // Referer: 'http://zizhu.hzau.edu.cn/faults',
        // Connection: 'keep-alive',
      },
    })
      .on('data', function (data) {
        buffData.push(data);
      })
      .on('end', function () {
        try {
          const pageData = iconv.decode(Buffer.concat(buffData), 'utf8');
          const $ = cheerio.load(pageData);
          // 用户自身信息及网络状态
          const thArr = [];
          $('#w0-container thead th').each(function (ind, el) {
            thArr.push($(el).text().trim());
          });

          const recordArr = [];
          $('#w0-container tbody tr').each(function () {
            const tempArr = [];
            $(this).children('td').each(function () {
              tempArr.push($(this).text());
            });
            recordArr.push(tempArr);
          });
          // 判断返回的信息是否正确，不正确则返回异常
          if (thArr.length) {
            cb({
              title: thArr,
              record: recordArr,
            });
          } else {
            errCb('10013000:内部错误,无法获取信息');
          }
        } catch (e) {
          errCb('10013001:内部错误,出现异常');
        }
      })
      .on('error', function () {
        errCb('10013002:内部错误,出现异常');
      });
  } catch (e) {
    errCb('10013003:内部错误,出现异常');
  }
};
