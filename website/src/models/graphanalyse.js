import { getGraphData } from '@/services/api'
import { uidfile, getLastSevenDay } from '@/utils'

export default {
  namespace: 'graphanalyse',
  state: {
    followerData: [],
    dianzanData: [],
    commentData: [],
    lastSevenDay: [], // 最近几天的日期
  },
  subscriptions: {},
  effects: {
    *getData(
      {
        payload: { uid },
      },
      { call, put }
    ) {
      const filename = uidfile(uid)
      const info = []
      const lastSevenDay = getLastSevenDay()

      try {
        const day1 = yield call(getGraphData, { filename, yearDate: lastSevenDay[0] })
        info.push(day1[uid])
      } catch (e) {
        console.log('day1 没有')
      }
      try {
        const day2 = yield call(getGraphData, { filename, yearDate: lastSevenDay[1] })
        info.push(day2[uid])
      } catch (e) {
        console.log('day2 没有')
      }
      try {
        const day3 = yield call(getGraphData, { filename, yearDate: lastSevenDay[2] })
        info.push(day3[uid])
      } catch (e) {
        console.log('day3 没有')
      }
      try {
        const day4 = yield call(getGraphData, { filename, yearDate: lastSevenDay[3] })
        info.push(day4[uid])
      } catch (e) {
        console.log('day4 没有')
      }
      try {
        const day5 = yield call(getGraphData, { filename, yearDate: lastSevenDay[4] })
        info.push(day5[uid])
      } catch (e) {
        console.log('day5 没有')
      }
      try {
        const day6 = yield call(getGraphData, { filename, yearDate: lastSevenDay[5] })
        info.push(day6[uid])
      } catch (e) {
        console.log('day6 没有')
      }
      try {
        const day7 = yield call(getGraphData, { filename, yearDate: lastSevenDay[6] })
        info.push(day7[uid])
      } catch (e) {
        console.log('day7 没有')
      }

      // [关注者，总点赞量，总评论量]
      const followerData = []
      const dianzanData = []
      const commentData = []
      info.forEach(v => {
        followerData.push(v[0])
        dianzanData.push(v[1])
        commentData.push(v[2])
      })

      yield put({
        type: 'listReducer',
        payload: {
          followerData,
          dianzanData,
          commentData,
          lastSevenDay,
        },
      })
    },
  },
  reducers: {
    listReducer(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
