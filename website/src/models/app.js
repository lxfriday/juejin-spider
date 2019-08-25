import routeList from '@/utils/routes'

export default {
  namespace: 'app',
  state: {
    routeList,
    locationPathname: '',
    locationQuery: {},
    theme: 'light',
    scrollContainerTo: () => {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },
  },
  effects: {},
  reducers: {
    addContainerScroller(state, { payload }) {
      return {
        ...state,
        scrollContainerTo: payload.scrollContainerTo,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
