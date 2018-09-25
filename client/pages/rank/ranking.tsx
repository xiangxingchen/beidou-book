import React from 'react';
import { Flex, WhiteSpace, Badge } from 'antd-mobile';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames/bind';
import { defaultProps, computedProps } from 'react-decoration';
import { inject, observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import style from './index.module.less';
import { IRanking, IBook } from 'client/pages/list/redux/interface';

interface State {
  hidden: boolean;
}
interface IRank {
  novelStore?: {
    ranking: IRanking;
    books?: IBook[];
  };
}
@inject('novelStore')
@observer
class Ranking extends React.Component<IRank, State> {
  // encodeURIComponent
// window.encodeURIComponent()
  public render() {
    const { books } = this.props.novelStore.ranking;
    this.props.novelStore.books;

    return (
      <div>
        {books.length > 0 && books.map(item =>
          <Flex key={item._id} className={style.ranking}>
            <div className={style.ranking_img}>
              <img src={decodeURIComponent(item.cover)} className={style.ranking_cover}/>
            </div>
            <div className={style.ranking_desc}>
              <div className={style.ranking_title}>{item.title} </div>
              <WhiteSpace size="md"/>
              <div className={style.ranking_author}>{item.author}<Badge
                text={item.minorCate}
                style={{
                  marginLeft: 12,
                  padding: '0 3px',
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  color: '#f19736',
                  border: '1px solid #f19736',
                }}
              /></div>
              <WhiteSpace size="xs"/>

              <div className={style.ranking_shortIntro}>{item.shortIntro.slice(0, 30)}<span>...</span></div>
              <WhiteSpace size="md"/>
              <Flex>
                <div className={style.ranking_lately}>
                  <span className={style.blue}>{(item.latelyFollower / 10000).toFixed(1)}万</span>人气
                </div>
                <div className={style.ranking_lately}>
                  <span className={style.blue}>{item.retentionRatio}%</span>读者存留
                </div>
              </Flex>
            </div>
          </Flex>)}
      </div>
    );
  }
}

export default hot(module)(Ranking);
