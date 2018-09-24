import React from 'react';
import { TabBar, ListView, Button, Tabs, Badge } from 'antd-mobile';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames/bind';
import { defaultProps, computedProps } from 'react-decoration';
import { inject, observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import style from './index.module.less';
import { RankObject, ITabs } from 'client/pages/list/redux/interface';

interface State {
  hidden: boolean;
}
interface IRank {
  novelStore?: {
    rank: RankObject;
    tabs: ITabs [];
    currentTab: string;
    setCurrentTab: (tab: string) => void;
  };
}
@inject('novelStore')
@observer
class Rank extends React.Component<IRank, State> {

  public render() {
    const { tabs, rank, currentTab } = this.props.novelStore;
    const data = rank[currentTab];
    console.log(data, currentTab);
    return (
      <div>
        <Tabs
          tabs={tabs}
          initialPage={1}
          onChange={(tab) => this.onTabChange(tab.key)}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          renderTab={tab => <span>{tab.title}</span>}
        >
          <div>1</div>
        </Tabs>
        {data.length > 0 && data.map(item =>
          <Link key={item._id} to={`/ranking/${item._id}`}>
            <div className={style.rank_item}>{item.shortTitle}</div>
          </Link>)}
      </div>
    );
  }
  private onTabChange(tab: string) {
    this.props.novelStore.currentTab = tab;
  }
}

export default hot(module)(Rank);
