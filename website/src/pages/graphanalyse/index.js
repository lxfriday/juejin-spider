import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Row, Col, Skeleton, Card, Input, Result, Icon } from 'antd'
import store from 'store'

import FollowerGraph from './components/FollowerGraph'
import DianzanGraph from './components/DianzanGraph'
import CommentGraph from './components/CommentGraph'

const { Search } = Input

@connect(({ loading, graphanalyse }) => ({
  loading,
  ...graphanalyse,
}))
class GraphAnalyse extends Component {
  componentDidMount() {
    const prevUrl = store.get('url')
    this.handleSearch(prevUrl)
  }

  handleSearch = val => {
    // https://juejin.im/user/57a0c28979bc440054958498
    if (val && val.length) {
      const uid = val.substring(val.lastIndexOf('/') + 1, val.length)
      store.set('url', val)

      this.props.dispatch({
        type: 'graphanalyse/getData',
        payload: {
          uid,
        },
      })
    }
  }

  render() {
    const { followerData, dianzanData, commentData, daysArr, loading } = this.props
    const isLoading = loading.effects['graphanalyse/getData']
    const followerGraph = []
    const dianzanGraph = []
    const commentGraph = []

    daysArr.forEach((v, i) => {
      if (followerData[i]) {
        followerGraph.push({ follower: followerData[i], date: v })
      }
      if (dianzanData[i]) {
        dianzanGraph.push({ dianzan: dianzanData[i], date: v })
      }
      if (commentData[i]) {
        commentGraph.push({ comment: commentData[i], date: v })
      }
    })

    return (
      <Fragment>
        <Card>
          <Row>
            <Col xs={24} xl={12}>
              <Search placeholder="粘贴用户主页 url" onSearch={this.handleSearch} enterButton />
            </Col>
          </Row>
        </Card>
        <Card>
          <Skeleton loading={isLoading} active>
            <Row gutter={8}>
              <Col xs={24}>
                <FollowerGraph followerGraph={followerGraph} />
              </Col>
              <Col xs={24}>
                <DianzanGraph dianzanGraph={dianzanGraph} />
              </Col>
              <Col xs={24}>
                <CommentGraph commentGraph={commentGraph} />
              </Col>
            </Row>
          </Skeleton>
        </Card>
        <Result
          style={{ marginTop: 12 }}
          icon={<Icon type="github" />}
          title={<a href="https://github.com/lxfriday/juejin-spider">juejin-spider</a>}
          extra={
            <p>
              Created by <a href="https://juejin.im/user/57a0c28979bc440054958498">云影sky</a>
            </p>
          }
        />
      </Fragment>
    )
  }
}

export default GraphAnalyse
