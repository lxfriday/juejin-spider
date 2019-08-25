/**
 * 全局提示
 * @author lxfriday
 */
import { notification } from 'antd'

export function notiSuccess(msg = '操作成功') {
  notification.success({
    message: '提示',
    description: msg,
  })
}

export function notiErr(msg = '操作失败') {
  notification.error({
    message: '提示',
    description: msg,
  })
}
