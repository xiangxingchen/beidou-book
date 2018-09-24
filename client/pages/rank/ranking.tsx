import React from 'react';
import { Flex } from 'antd-mobile';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames/bind';
import { defaultProps, computedProps } from 'react-decoration';
import { inject, observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import style from './index.module.less';
import { IRanking } from 'client/pages/list/redux/interface';

interface State {
  hidden: boolean;
}
interface IRank {
  novelStore?: {
    ranking: IRanking;
  };
}
@inject('novelStore')
@observer
class Ranking extends React.Component<IRank, State> {
  // encodeURIComponent
// window.encodeURIComponent()
  public render() {
    const { books } = this.props.novelStore.ranking;
    console.log(books);
    return (
      <div>
        {books.length > 0 && books.map(item =>
          <Flex key={item._id}>
            <Flex.Item><div>{window.encodeURIComponent()}</div></Flex.Item>
            <Flex.Item>
              <div>
                <h1>{item.title}</h1>
                <div>{item.author}</div>
                <div>{item.shortIntro.slice(0, 20)}</div>
                <div><span>{item.latelyFollower}人气</span><span>{item.retentionRatio}读者存留</span></div>
              </div>
            </Flex.Item>
          </Flex>)}
      </div>
    );
  }
}

export default hot(module)(Ranking);
