import React, { PureComponent } from 'react'
import styles from './NavBar.less'
import { getPageTitle } from '@/utils/routes'

class NavBar extends PureComponent {
  render() {
    const { locationPathname } = this.props
    const title = getPageTitle(locationPathname)

    return (
      <div className={styles.container}>
        {/* 左边的标题 */}
        <span className={styles.title}>{title}</span>
      </div>
    )
  }
}

NavBar.propTypes = {}

export default NavBar
