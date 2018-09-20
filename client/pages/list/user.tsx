import React from 'react';
import { TabBar, ListView, Button } from 'antd-mobile';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames/bind';
import { defaultProps, computedProps } from 'react-decoration';
import { inject, observer } from 'mobx-react';
import { hot } from 'react-hot-loader';

import { UserPropsType } from './redux/interface';
import style from './index.module.less';

const cx = classNames.bind(style);

interface State {
  hidden: boolean;
  selectedTab:string;
}
@inject('userStore', 'novelStore')
@observer
@defaultProps({ foo: 'bar' })
class User extends React.Component<UserPropsType, State> {
  protected aa = '123';
  constructor(props: UserPropsType) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  public componentDidMount() {
    const a: boolean = _.isArray('ddd');
    const b: string = moment(new Date()).format('YYYY-MM-DD');
  }
  public onClick = (): void => {
    // this.props.userStore.currentUser = 'dddd';
    this.props.userStore.getData();
  }
  public renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
           onClick={(e) => {
             e.preventDefault();
             this.setState({
               hidden: !this.state.hidden,
             });
           }}
        >
          Click to show/hide tab-bar
        </a>
      </div>
    );
  }

  public render() {
    console.log(this.props.novelStore.rank)
    return (
      <div className={style.footer}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title=""
            key="Life"
            icon={<div className={style.tab_item1}/>}
            selectedIcon={<div className={style.tab_item1_select}/>}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => this.setState({ selectedTab: 'blueTab' })}
            data-seed="logId"
          >
            <h1>ddddddddd</h1>
          </TabBar.Item>
          <TabBar.Item
            icon={<div className={style.tab_item2}/>}
            selectedIcon={<div className={style.tab_item2_select}/>}
            title=""
            key="Koubei"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => this.setState({ selectedTab: 'redTab' })}
            data-seed="logId1"
          >
            {this.renderContent('Koubei')}
          </TabBar.Item>
          <TabBar.Item
            icon={<div className={style.tab_item3}/>}
            selectedIcon={<div className={style.tab_item3_select}/>}
            title=""
            key="Friend"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={<div className={style.tab_item4}/>}
            selectedIcon={<div className={style.tab_item4_select}/>}
            title=""
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default hot(module)(User);
