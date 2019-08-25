import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { Chart, Axis, Tooltip, Geom, Label } from 'bizcharts'
import styles from './FollowerGraph.less'
const DataSet = require('@antv/data-set')

const cols = {
  date: { alias: '日期' },
  comment: { alias: '总评论数' },
}

class Graph extends Component {
  render() {
    const { commentGraph } = this.props

    const ds = new DataSet()
    const dv = ds.createView().source(commentGraph)
    dv.transform({
      // 把数据行逆序排列
      type: 'reverse',
    })

    return (
      <Card className={styles.container}>
        <Chart height={450} data={dv} scale={cols} forceFit>
          <div className={styles.titleWrapper}>总评论数增长趋势</div>
          <Axis title name="date" />
          <Axis title name="comment" />
          <Tooltip
            crosshairs={{
              type: 'cross',
            }}
          />
          <Geom type="line" position="date*comment" size={2} color="#0099CC" shape="smooth" />
          <Geom type="point" shape="circle" position="date*comment" color="#0099CC" size={5} />
        </Chart>
      </Card>
    )
  }
}

Graph.propTypes = {
  commentGraph: PropTypes.array.isRequired,
}

export default Graph
// color
// http://tool.c7sky.com/webcolor/
