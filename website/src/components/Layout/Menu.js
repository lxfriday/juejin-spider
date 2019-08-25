import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import Navlink from 'umi/navlink'
import withRouter from 'umi/withRouter'
import { arrayToTree, queryAncestors, pathMatchRegexp } from '@/utils'

const { SubMenu } = Menu

@withRouter
class SiderMenu extends PureComponent {
  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && <Icon type={item.icon} theme="filled" />}
                <span>{item.name}</span>
              </Fragment>
            }>
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Navlink to={item.route || '#'}>
            {item.icon && <Icon type={item.icon} theme="filled" />}
            <span style={{ fontSize: 12 }}>{item.name}</span>
          </Navlink>
        </Menu.Item>
      )
    })
  }

  render() {
    const { theme, menus, location, openKeys } = this.props

    // Generating tree-structured data for menu content.
    const menuTree = arrayToTree(menus, 'id', 'menuParentId')

    // Find a menu that matches the pathname.
    const currentMenu = menus.find(_ => _.route && pathMatchRegexp(_.route, location.pathname))

    // Find the key that should be selected according to the current menu.
    // 页面刷新的时候，依据路由找到 Menu 应该让哪一个 key 处于选中状态
    const selectedKeys = currentMenu ? queryAncestors(menus, currentMenu, 'menuParentId').map(_ => _.id) : []

    return (
      <Menu mode="inline" theme={theme} openKeys={openKeys} selectedKeys={selectedKeys}>
        {this.generateMenus(menuTree)}
      </Menu>
    )
  }
}

SiderMenu.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  openKeys: PropTypes.array,
}

export default SiderMenu
