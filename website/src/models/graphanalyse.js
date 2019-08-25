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
        const day2 = yield call(getGraphData, { filename, yearDate: lastSevenDay[1] })
        info.push(day2[uid])
        const day3 = yield call(getGraphData, { filename, yearDate: lastSevenDay[2] })
        info.push(day3[uid])
        const day4 = yield call(getGraphData, { filename, yearDate: lastSevenDay[3] })
        info.push(day4[uid])
        const day5 = yield call(getGraphData, { filename, yearDate: lastSevenDay[4] })
        info.push(day5[uid])
        const day6 = yield call(getGraphData, { filename, yearDate: lastSevenDay[5] })
        info.push(day6[uid])
        const day7 = yield call(getGraphData, { filename, yearDate: lastSevenDay[6] })
        info.push(day7[uid])
      } catch (e) {
        console.log('没有一周的数据量，将只显示最近采集到的数据')
      } finally {
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
      }
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
