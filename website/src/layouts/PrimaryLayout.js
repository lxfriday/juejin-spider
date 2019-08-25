import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { Layout } from 'antd'
import { MyLayout } from '@/components'
import smoothScrollTo from '@lxfriday/smooth-scroll-to'
import styles from './PrimaryLayout.less'

const { Content } = Layout
const { Sider, NavBar } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'app/addContainerScroller',
      payload: {
        scrollContainerTo: this.scrollContainerTo,
      },
    })
  }

  // 点击退出登录
  handleLogout = () => {
    this.props.dispatch({
      type: 'app/logoutEffect',
    })
  }

  scrollContainerTo = pos => {
    console.log({
      a: this.primaryLayoutContainer,
    })
    smoothScrollTo(this.primaryLayoutContainer, pos, 1.1)
  }

  render() {
    const { app, children } = this.props
    const { theme, routeList, openKeys, user, locationPathname } = app

    // MenuParentId is equal to -1 is not a available menu.
    const menus = routeList.filter(_ => _.menuParentId !== '-1' && !_.hide)

    const siderProps = {
      theme,
      menus,
      openKeys,
    }

    const navbarProps = {
      user: user,
      locationPathname,
      handleLogout: this.handleLogout,
    }

    return (
      <Fragment>
        <Layout>
          <Sider {...siderProps} />
          <div className={styles.container} id="primaryLayout" ref={r => (this.primaryLayoutContainer = r)}>
            {/*<Loader fullScreen={false} spinning={loading.global} />*/}
            <NavBar {...navbarProps} />
            <Content className={styles.content}>{children}</Content>
          </div>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
