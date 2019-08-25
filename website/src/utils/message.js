/**
 * 全局提示
 * @author lxfriday
 */
import { message } from 'antd'

export function messSuccess(msg = '操作成功', duration = 3, onClose = () => {}) {
  message.success(msg, duration, onClose)
}

export function messErr(msg = '操作失败', duration = 3, onClose = () => {}) {
  message.error(msg, duration, onClose)
}
