import { getGraphData } from '@/services/api'
import { uidfile, getLastDays } from '@/utils'

export default {
  namespace: 'graphanalyse',
  state: {
    followerData: [],
    dianzanData: [],
    commentData: [],
    daysArr: [], // 日期构成的数组，预防某个日期没有数据时日期和时间的数据对应上
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
      const lastDays = getLastDays()
      const daysArr = []
      for (let i = 0; i < lastDays.length; i++) {
        try {
          const day1 = yield call(getGraphData, { filename, yearDate: lastDays[i] })
          info.push(day1[uid])
          daysArr.push(lastDays[i])
        } catch (e) {
          console.log(`${lastDays[i]} 缺少数据`)
        }
      }

      // try {
      //   const day1 = yield call(getGraphData, { filename, yearDate: lastSevenDay[0] })
      //   info.push(day1[uid])
      //   dateArr.push(lastSevenDay[0])
      // } catch (e) {
      //   console.log(`${lastSevenDay[0]} 缺少数据`)
      // }
      // try {
      //   const day2 = yield call(getGraphData, { filename, yearDate: lastSevenDay[1] })
      //   info.push(day2[uid])
      //   dateArr.push(lastSevenDay[1])
      // } catch (e) {
      //   console.log(`${lastSevenDay[1]} 缺少数据`)
      // }
      // try {
      //   const day3 = yield call(getGraphData, { filename, yearDate: lastSevenDay[2] })
      //   info.push(day3[uid])
      //   dateArr.push(lastSevenDay[2])
      // } catch (e) {
      //   console.log(`${lastSevenDay[2]} 缺少数据`)
      // }
      // try {
      //   const day4 = yield call(getGraphData, { filename, yearDate: lastSevenDay[3] })
      //   info.push(day4[uid])
      //   dateArr.push(lastSevenDay[3])
      // } catch (e) {
      //   console.log(`${lastSevenDay[3]} 缺少数据`)
      // }
      // try {
      //   const day5 = yield call(getGraphData, { filename, yearDate: lastSevenDay[4] })
      //   info.push(day5[uid])
      //   dateArr.push(lastSevenDay[4])
      // } catch (e) {
      //   console.log(`${lastSevenDay[4]} 缺少数据`)
      // }
      // try {
      //   const day6 = yield call(getGraphData, { filename, yearDate: lastSevenDay[5] })
      //   info.push(day6[uid])
      //   dateArr.push(lastSevenDay[5])
      // } catch (e) {
      //   console.log(`${lastSevenDay[5]} 缺少数据`)
      // }
      // try {
      //   const day7 = yield call(getGraphData, { filename, yearDate: lastSevenDay[6] })
      //   info.push(day7[uid])
      //   dateArr.push(lastSevenDay[6])
      // } catch (e) {
      //   console.log(`${lastSevenDay[6]} 缺少数据`)
      // }

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
          daysArr,
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
