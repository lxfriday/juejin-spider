/**
 * 首页 zizhu.hzau.edu.cn/home 的信息提取
 * @time 2018/11/22
 * @author lxfriday
 */

import request from 'request';
import cheerio from 'cheerio';

const iconv = require('iconv-lite');

const homeUrl = 'http://zizhu.hzau.edu.cn/home';

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
          const userInfo = [];
          $('.wrap .col-lg-4 ul.list-group').children('li').each(function (ind, el) {
            const $label = $(el).find('label');
            userInfo.push(
              [
                $label.text().trim(),
                $label.get(0).nextSibling.data || $label.get(0).nextSibling.children[0].data,
              ],
            );
          });
          // 在线信息
          // thead 标题部分
          const onlineInfo = [];
          $('#w1-container table thead th').each(function (ind, el) {
            onlineInfo.push(
              [
                $(el).text().trim(),
              ],
            );
          });
          $('#w1-container table tbody td').each(function (ind, el) {
            onlineInfo[ind].push($(el).text().trim());
          });

          // 产品信息
          const productInfo = [];
          $('#w3-container table thead th').each(function (ind, el) {
            productInfo.push(
              [
                $(el).text().trim(),
              ],
            );
          });
          $('#w3-container table tbody td').each(function (ind, el) {
            productInfo[ind].push($(el).text().trim());
          });

          // 判断返回的信息是否正确，不正确则返回异常
          if (userInfo.length) {
            cb({
              userInfo,
              onlineInfo,
              productInfo,
            });
          } else {
            errCb('10012000:内部错误,无法获取信息');
          }
        } catch (e) {
          errCb('10012001:内部错误,出现异常');
        }
      })
      .on('error', function () {
        errCb('10012002:内部错误,出现异常');
      });
  } catch (e) {
    errCb('10012003:内部错误,出现异常');
  }
};
