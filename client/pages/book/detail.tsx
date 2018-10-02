import React from 'react';
import { defaultProps, computedProps } from 'react-decoration';
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import style from './index.module.less';
import { IBookDetail } from 'client/pages/list/redux/interface';

moment.locale('zh-cn');
interface State {}
interface IRank {
  novelStore?: {
    bookInfo?: IBookDetail;
  };
}
@inject('novelStore')
@observer
class BookDetail extends React.Component<IRank, State> {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    console.log('constructor', props);
    if (_.isEmpty(props.novelStore.bookInfo)) {
      props.novelStore.getBookById(id);
    }
  }
  public render() {
    const { bookInfo } = this.props.novelStore;
    console.log(bookInfo);
    return (
      <WingBlank size="lg">
        <Flex>
          <div>
            <img src={decodeURIComponent(bookInfo.cover)} className={style.book_img}/>
          </div>
          <div className={style.info}>
            <div className={style.book_title}>{bookInfo.title}</div>
            <WhiteSpace size="md"/>
            <div>
              <span className={style.orangered}>{bookInfo.rating && bookInfo.rating.score.toFixed(1)}分</span>
              | <span className={style.gray}>{(bookInfo.rating.count / 10000).toFixed(1)}万人评</span>
            </div>
            <WhiteSpace size="sm"/>
            <div>
              <span className={style.red}>{bookInfo.author}</span> |
              <span className={style.gray}>{bookInfo.minorCate}</span>
            </div>
            <WhiteSpace size="sm"/>
            <div className={style.gray}>{(bookInfo.wordCount / 10000).toFixed(0)}万字<span>{moment(bookInfo.updated).fromNow(true)}之前更新</span></div>
            <WhiteSpace size="sm"/>
            <div className={style.gray}>5书币/千字</div>
          </div>
        </Flex>
        <WhiteSpace size="xl"/>
        <Flex className={style.desc}>
          <Flex.Item>追书热人气{bookInfo.latelyFollower}</Flex.Item>
          <Flex.Item>读者存留{bookInfo.retentionRatio}%</Flex.Item>
          <Flex.Item>社区帖子{bookInfo.postCount}</Flex.Item>
          <Flex.Item>日更字数{bookInfo.serializeWordCount}</Flex.Item>
        </Flex>
        <hr />
        <WhiteSpace size="xl"/>
        <div className={style.shortInfo}>简介</div>
        <WhiteSpace size="md"/>
        <div>{bookInfo.longIntro}</div>
      </WingBlank>
    );
  }
}

export default hot(module)(BookDetail);
