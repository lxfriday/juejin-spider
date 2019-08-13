/**
 * 登录现代教育技术中心
 * @time 2018/11/22
 * @author lxfriday
 */
import request from 'request';

const loginUrl = 'http://zizhu.hzau.edu.cn/';

export default ({
  studentId,
  password,
  verifyCode,
  PHPSESSIDStr,
  headercsrf,
  formcsrf,
}, cb, errCb) => {
  try {
    // 获取一堆验证码和cookie
    request.post({
      url: loginUrl,
      headers: {
        Host: 'zizhu.hzau.edu.cn',
        Origin: 'http://zizhu.hzau.edu.cn',
        Referer: 'http://zizhu.hzau.edu.cn/',
        Cookie: `${headercsrf}; ${PHPSESSIDStr}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        _csrf: formcsrf,
        'LoginForm[username]': studentId,
        'LoginForm[password]': password,
        'LoginForm[verifyCode]': verifyCode,
        'login-button': '',
      },
    }, function (err, res) {
      try {
        // 返回状态码为302，代表请求成功了
        if (res.statusCode === 302) {
          const newPHPSESSIDStr = res.headers['set-cookie'][0].split(';')[0];
          cb({
            loginSuccess: true,
            studentId,
            newPHPSESSIDStr,
          });
        } else {
          cb({
            loginSuccess: false,
          });
        }
      } catch (e) {
        errCb('10011000:内部错误,出现异常');
      }
    });
  } catch (e) {
    errCb('10011001:内部错误,出现异常');
  }
};
