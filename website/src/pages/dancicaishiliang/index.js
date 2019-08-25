import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import ConditionSelector from './components/ConditionSelector'
import Graph from './components/Graph'

@connect(({ dashboard, loading, graphanalyse_dancicaishiliang }) => ({
  dashboard,
  loading,
  graphanalyse_dancicaishiliang,
}))
class Index extends Component {
  componentDidMount() {
    // 获取测定站列表，用来选择测定站
    this.getStationListData()
  }

  componentWillUnmount() {
    this.resetData()
  }

  // 重置数据
  resetData = () => {
    this.props.dispatch({
      type: 'graphanalyse_dancicaishiliang/resetDataReducer',
    })
  }

  getStationListData = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'dashboard/fetchStationList',
    })
  }

  // 查询数据
  handleSearch = info => {
    const data = {
      type: 'one',
      stationId: '',
      startTime: info.startTime,
      endTime: info.endTime,
    }
    // {selectedStationid: "all", startTime: 1554652800, endTime: 1555257599}
    if (info.selectedStationid === 'all') {
      // 数据源选择所有测定站
      data.type = 'all'
    } else {
      data.stationId = info.selectedStationid
    }

    this.props.dispatch({
      type: 'graphanalyse_dancicaishiliang/getDancicaishiliangDataEffect',
      payload: {
        data,
      },
    })
  }

  render() {
    const {
      dashboard,
      graphanalyse_dancicaishiliang: { graphData },
      loading,
    } = this.props
    const conditionSelectorProps = {
      stationList: [
        {
          // 选择第一个表示选择所有测定站
          stationid: 'all',
          stationAlias: '所有测定站',
        },
        ...dashboard.list,
      ],
      handleSearch: this.handleSearch,
    }

    const graphProps = {
      graphData,
      loading: loading.effects['graphanalyse_dancicaishiliang/getDancicaishiliangDataEffect'],
    }

    return (
      <Fragment>
        <ConditionSelector {...conditionSelectorProps} />
        <Graph {...graphProps} />
        {/*<img src={image1} alt=""/>*/}
      </Fragment>
    )
  }
}

export default Index
