import React, { Component } from 'react'
import { Button, Card, Col, DatePicker, Form, Row, Select } from 'antd'
import { getWeekInfo } from 'utils/time'
import { notiErr } from 'utils/notification'
import TimerEnhance from 'utils/TimerEnhance'

import styles from './ConditionSelector.less'

const FormItem = Form.Item
const { Option } = Select

@TimerEnhance
class ConditionSelector extends Component {
  constructor(props) {
    super(props)

    const { weekStartDay, weekEndDay } = getWeekInfo()

    this.state = {
      selectedStationid: '',
      // 选择时间段的开始时间和结束时间
      startTime: weekStartDay,
      endTime: weekEndDay,
    }
  }

  // 选择测定站
  handleSelectStation = stationid => {
    this.setState({ selectedStationid: stationid })
  }

  disabledStartTime = startValue => {
    const endValue = this.state.endTime
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndTime = endValue => {
    const startValue = this.state.startTime
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  // 选择开始的时间
  handleSelectStartTime = e => {
    this.setState({
      startTime: e,
    })
  }

  // 选择结束的时间
  handleSelectEndTime = e => {
    this.setState({
      endTime: e,
    })
  }

  handleSearch = () => {
    const { selectedStationid, startTime, endTime } = this.state
    const { handleSearch } = this.props

    if (selectedStationid.length) {
      handleSearch({
        selectedStationid,
        startTime: startTime.unix(),
        endTime: endTime.unix(),
      })
    } else {
      notiErr('先选择测定站，再查询数据')
    }
  }

  render() {
    const { stationList } = this.props
    const { startTime, endTime, selectedStationid } = this.state

    const stationListNode = stationList.map(v => (
      <Option value={v.stationid} key={v.id}>
        {v.stationAlias || v.stationid}
      </Option>
    ))

    return (
      <Card>
        <div className={styles.container}>
          <Row gutter={8}>
            <Col md={8}>
              <FormItem label="测定站号">
                <Select value={selectedStationid} placeholder="选择测定站" style={{ width: '100%' }} size="small" onChange={this.handleSelectStation}>
                  {stationListNode}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col md={8}>
              <FormItem label="开始时间">
                <DatePicker
                  disabledDate={this.disabledStartTime}
                  onChange={this.handleSelectStartTime}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                  size="small"
                  value={startTime}
                />
              </FormItem>
            </Col>
            <Col md={8}>
              <FormItem label="截止时间">
                <DatePicker
                  disabledDate={this.disabledEndTime}
                  onChange={this.handleSelectEndTime}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                  size="small"
                  value={endTime}
                />
              </FormItem>
            </Col>
          </Row>
          <div style={{ float: 'left' }}>
            <Button onClick={this.handleSearch} type="primary" size="small">
              查询
            </Button>
          </div>
        </div>
      </Card>
    )
  }
}

export default ConditionSelector
