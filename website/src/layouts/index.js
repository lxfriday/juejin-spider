import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
import { queryLayout } from '@/utils'
import NProgress from 'nprogress'
import config from '@/utils/config'
import withRouter from 'umi/withRouter'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import './index.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
}

@withRouter
@connect(({ loading, app }) => ({ loading, app }))
class BaseLayout extends PureComponent {
  previousPath = ''

  render() {
    const { loading, children, location } = this.props
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]

    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    if (!loading.global) {
      NProgress.done()
      this.previousPath = currentPath
    }
    return (
      <LocaleProvider locale={zhCN}>
        <Fragment>
          <Helmet>
            <title>{config.siteName}</title>
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
          </Helmet>
          <Container>{children}</Container>
        </Fragment>
      </LocaleProvider>
    )
  }
}

BaseLayout.propTypes = {
  loading: PropTypes.object,
}

export default BaseLayout
