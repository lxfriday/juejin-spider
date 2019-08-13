/**
 * 华中农业大学现代教育技术中心，获取登录页面的 cookie + 验证码
 * @time 2018/11/21
 * @author lxfriday
 */
import request from 'request';
import cheerio from 'cheerio';

// 验证码地址 PHPSESSID
const verifyCodeUrl = 'http://zizhu.hzau.edu.cn/site/captcha';
// 登录页面的地址 _csrf
const indexUrl = 'http://zizhu.hzau.edu.cn/';

export default (cb, errCb) => {
  const base64ImageSource = [];
  let base64Image = '';
  let PHPSESSIDStr = '';
  request(verifyCodeUrl)
    .on('data', function (data) {
      try {
        base64ImageSource.push(data);
      } catch (e) {
        errCb('10010000:内部错误,出现异常');
      }
    })
    .on('response', function (response) {
      // 'set-cookie': [ 'PHPSESSID=qasin5st5vbght6ujr8k21v8t6; path=/; HttpOnly' ],
      try {
        // PHPSESSID=qasin5st5vbght6ujr8k21v8t6
        PHPSESSIDStr = response.headers['set-cookie'][0].split(';')[0];
      } catch (e) {
        PHPSESSIDStr = '';
      }
    })
    .on('end', function () {
      // 有cookie的时候，才算请求成功了
      if (PHPSESSIDStr.length) {
        request(indexUrl, function (err, res, body) {
          if (err) {
            errCb('10010001:内部错误,出现异常');
          } else {
            base64Image = Buffer.concat(base64ImageSource).toString('base64');
            // 'set-cookie': [ 'PHPSESSID=lrj8mmqocmq04rfh2cjd199i77; path=/; HttpOnly', '_csrf=d5f873119f7e72d7925187eaf22311f5b60570c7a73aeea80839d290a36d43cea%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22tVvL338Blok_rJ8yHrs77NdXDmrp7eB5%22%3B%7D; path=/; httponly' ],
            const headercsrf = res.headers['set-cookie'][1].split(';')[0];
            const $ = cheerio.load(body);
            const formcsrf = $('meta[name=csrf-token]').attr('content');

            cb({
              PHPSESSIDStr,
              img: base64Image,
              headercsrf,
              formcsrf,
            });
          }
        });
      } else {
        // 没有cookie，表示请求的时候就失败了
        errCb('10010002:内部错误,出现异常');
      }
    });
};
