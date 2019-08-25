import React, { Component } from 'react'
import { Card, Spin } from 'antd'
import { Chart, Axis, Tooltip, Geom, Legend, Label } from 'bizcharts'
import styles from './Graph.less'
const DataSet = require('@antv/data-set')

const cols = {}

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphType: 'interval',
    }
  }

  // 选择图表类型
  handleSelectType = e => {
    this.setState({ graphType: e.target.value })
  }

  render() {
    const { loading, graphData } = this.props
    const { graphType } = this.state

    const ds = new DataSet()
    const dv = ds.createView().source(graphData)

    const tooltipProps = {
      useHtml: true,
      containerTpl:
        '<div class="g2-tooltip">' +
        '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>' +
        '<ul class="g2-tooltip-list"></ul>' +
        '</div>',
      itemTpl:
        '<li data-index={index}>' +
        '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
        '{name}: {value}%' +
        '</li>',
    }

    if (loading) {
      return (
        <Card>
          <div className="textCenter">
            <Spin size="large" />
          </div>
        </Card>
      )
    }

    return (
      <Card className={styles.container}>
        <Chart height={550} data={dv} scale={cols} forceFit>
          <div className={styles.titleWrapper}>采食量区间图</div>
          <Legend />
          <Axis
            title
            name="采食量"
            label={{
              formatter: val => `${val}`,
            }}
          />
          <Axis
            title
            name="占比"
            label={{
              formatter: val => `${val}%`,
            }}
          />
          <Tooltip {...tooltipProps} />
          <Geom type={graphType} shape="smooth" position="采食量*占比" color="red" size={50}>
            <Label content="占比" formatter={val => `${val}%`} />
          </Geom>
        </Chart>
      </Card>
    )
  }
}

export default Graph
