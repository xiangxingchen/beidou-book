import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';
import styles from './index.module.less';
import Drawer from '../drawer';
import XyzIcon from '../xyzIcon';
import SearchPage from '../searchPage';

interface Props {
  title?: string;
  showBackBtn?: boolean;
  showSearchBtn?: boolean;
  showMiniNavBtn?: boolean;
  showCategoryBtn?: boolean;
  history: any; // tslint:disable-line
}

interface MiniNavItem {
  label: string;
  icon: string;
  path: string;
}

interface State {
  showMiniNavPanel: boolean;
  miniNav: MiniNavItem [];
  showCategoryPanel: boolean;
  categoryList: MiniNavItem [];
  showSearchPanel: boolean;
}

class Header extends React.Component<Props, State> {
  public static defaultProps = {
    title: '新一站保险网',
    showBackBtn: true,
    showSearchBtn: false,
    showMiniNavBtn: false,
    showCategoryBtn: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      showMiniNavPanel: false,
      miniNav: [
        {
          label: '首页',
          icon: 'home',
          path: '/',
        },
        {
          label: '分类',
          icon: 'category',
          path: '/',
        },
        {
          label: '发现',
          icon: 'discovery',
          path: '/',
        },
        {
          label: '我的',
          icon: 'user',
          path: '/',
        },
      ],
      showCategoryPanel: false,
      categoryList: [
        {
          label: '旅游险',
          icon: 'image',
          path: '/',
        },
        {
          label: '意外险',
          icon: 'umbrella',
          path: '/',
        },
        {
          label: '家财险',
          icon: 'home1',
          path: '/',
        },
        {
          label: '健康险',
          icon: 'medicine',
          path: '/',
        },
        {
          label: '人寿险',
          icon: 'heart',
          path: '/',
        },
        {
          label: '车险',
          icon: 'car',
          path: '/',
        },
        {
          label: '企业险',
          icon: 'users',
          path: '/',
        },
      ],
      showSearchPanel: false,
    };
  }

  public onLeftClick = () => {
    this.props.history.goBack();
  }

  public toggleMiniNav = () => {
    this.setState({
      showMiniNavPanel: !this.state.showMiniNavPanel,
    });
  }

  public toggleCategoryList = () => {
    this.setState({
      showCategoryPanel: !this.state.showCategoryPanel,
    });
  }

  public toggleSearchPanel = () => {
    this.setState({
      showSearchPanel: !this.state.showSearchPanel,
    });
  }

  public render() {
    // 拼接右侧按钮内容：搜索按钮
    const rightContent = [];
    if (this.props.showSearchBtn) {
      rightContent.push(
        <XyzIcon
          kind={'search'}
          key={'searchBtn'}
          className={styles.navBar__iconfont}
          onClick={this.toggleSearchPanel}
        />,
      );
    }
    if (this.props.showMiniNavBtn) {
      const type = (this.state.showMiniNavPanel ? 'close' : 'ellipsis');
      rightContent.push(
        <XyzIcon
          kind={type}
          onClick={this.toggleMiniNav}
          key={'miniNavBtn'}
          className={styles.navBar__iconfont}
        />,
      );
    }
    if (this.props.showCategoryBtn) {
      const type = (this.state.showCategoryPanel ? 'close' : 'list');
      rightContent.push(
        <XyzIcon
          kind={type}
          onClick={this.toggleCategoryList}
          key={'categoryBtn'}
          className={styles.navBar__iconfont}
        />,
      );
    }
    const showMiniNavPanel = (
      <ul className={styles.mini__nav_list}>
        {this.state.miniNav.map((item) => {
          return (
            <li className={styles.mini__nav_item} key={item.label}>
              <Link to={item.path}>
                <XyzIcon
                  kind={item.icon}
                  colorFul={true}
                  className={styles.navBar__iconfont}
                />
                <div>{item.label}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
    const categoryListPanel = (
      <ul className={styles.category_list}>
        {this.state.categoryList.map((item) => {
          return (
            <li className={styles.category_list__item} key={item.label}>
                <Link to={item.path}>
                  <XyzIcon
                    kind={item.icon}
                    colorFul={true}
                    className={styles.category_list__icon}
                  />
                  <span className={styles.category_list__text}>{item.label}</span>
                </Link>
            </li>
          );
        })}
      </ul>
    );
    const searchPanel = (
      <SearchPage
        onClickLeft={this.toggleSearchPanel}
      />
    );

    return (
      <div>
        <NavBar
          mode="light"
          icon={<XyzIcon kind={'arrow-left'} className={styles.navBar__iconfont}/>}
          onLeftClick={this.onLeftClick}
          rightContent={rightContent}
          className={styles.navBar}
        >
          {this.props.title}
        </NavBar>
        <Drawer
          sidebar={showMiniNavPanel}
          open={this.state.showMiniNavPanel}
          position={'top'}
          zIndex={600}
        />
        <Drawer
          showMask={true}
          sidebar={categoryListPanel}
          open={this.state.showCategoryPanel}
          position={'top'}
          clickMask={this.toggleCategoryList}
          zIndex={600}
        />
        <Drawer
          sidebar={searchPanel}
          open={this.state.showSearchPanel}
          position={'right'}
          isWindow={true}
        />
      </div>
    );
  }
}

export default withRouter(Header);
