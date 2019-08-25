/* eslint-disable */
/*
 * A TimerEnhance for React Native app (es6) which replaced TimerMixin (es5)
 * provides timer functions for executing code in the future that are safely cleaned up when the component unmounts
 * https://github.com/react-native-component/react-native-smart-timer-enhance/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

export default ComposedComponent => {
  let setter = (_setter, _clearer, _key) => {
    return function(callback, interval) {
      let timerId = _setter((...params) => {
        _clearer.call(this, timerId)
        callback.apply(this, params)
      }, interval)
      let { [_key]: timers } = this
      if (!timers) {
        this[_key] = [timerId]
      } else {
        timers.push(timerId)
      }
      return timerId
    }
  }

  let clearer = (_clearer, _key) => {
    return function(timerId) {
      let { [_key]: timers } = this
      if (timers) {
        let index = timers.indexOf(timerId)
        if (~index) {
          timers.splice(index, 1)
        }
      }
      _clearer(timerId)
    }
  }

  let _timeouts = 'TimerEnhance_timeouts'
  let _clearTimeout = clearer(clearTimeout, _timeouts)
  let _setTimeout = setter(setTimeout, _clearTimeout, _timeouts)

  let _intervals = 'TimerEnhance_intervals'
  let _clearInterval = clearer(clearInterval, _intervals)
  let _setInterval = setter(setInterval, () => {}, _intervals)

  let _immediates = 'TimerEnhance_immediates'
  let _clearImmediate = clearer(clearImmediate, _immediates)
  let _setImmediate = setter(setImmediate, _clearImmediate, _immediates)

  let _animationFrames = 'TimerEnhance_animationFrames'
  let _cancelAnimationFrame = clearer(cancelAnimationFrame, _animationFrames)
  let _requestAnimationFrame = setter(requestAnimationFrame, _cancelAnimationFrame, _animationFrames)

  return class extends ComposedComponent {
    componentWillUnmount() {
      super.componentWillUnmount && super.componentWillUnmount()
      let { [_timeouts]: timeouts, [_intervals]: intervals, [_immediates]: immediates, [_animationFrames]: animationFrames } = this
      timeouts &&
        timeouts.forEach(timerId => {
          clearTimeout(timerId)
        })
      this[_timeouts] = null
      intervals &&
        intervals.forEach(timerId => {
          clearInterval(timerId)
        })
      this[_intervals] = null
      immediates &&
        immediates.forEach(timerId => {
          clearImmediate(timerId)
        })
      this[_immediates] = null
      animationFrames &&
        animationFrames.forEach(timerId => {
          cancelAnimationFrame(timerId)
        })
      this[_animationFrames] = null
    }

    setTimeout = _setTimeout
    clearTimeout = _clearTimeout

    setInterval = _setInterval
    clearInterval = _clearInterval

    setImmediate = _setImmediate
    clearImmediate = _clearImmediate

    requestAnimationFrame = _requestAnimationFrame
    cancelAnimationFrame = _cancelAnimationFrame
  }
}
