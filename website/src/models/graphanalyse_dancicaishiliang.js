// 图表分析，单次采食量分析

const initialState = {
  // 测定站内种猪列表
  graphData: [
    {
      采食量: '0-200',
      占比: 0,
    },
    {
      采食量: '200-400',
      占比: 0,
    },
    {
      采食量: '400-600',
      占比: 0,
    },
    {
      采食量: '600-800',
      占比: 0,
    },
    {
      采食量: '800-1000',
      占比: 0,
    },
    {
      采食量: '1000-1200',
      占比: 0,
    },
    {
      采食量: '1200-1400',
      占比: 0,
    },
    {
      采食量: '1400-1600',
      占比: 0,
    },
    {
      采食量: '>1600',
      占比: 0,
    },
  ],
}

export default {
  namespace: 'graphanalyse_dancicaishiliang',
  state: {
    ...initialState,
  },
  effects: {
    *getDancicaishiliangDataEffect(
      {
        payload: { data },
      },
      { call, put }
    ) {},
  },

  reducers: {
    getDancicaishiliangDataReducer(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    resetDataReducer() {
      return {
        ...initialState,
      }
    },
  },
}
