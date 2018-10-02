import React from 'react';
import { defaultProps, computedProps } from 'react-decoration';
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
      <div>
        <div>{bookInfo.title}</div>
        <div><span>{bookInfo.rating.score.toFixed(1)}</span><span>{(bookInfo.rating.count / 10000).toFixed(1)}万人评</span></div>
        <div><span>{bookInfo.title}</span> | <span>{bookInfo.minorCate}</span></div>
        <div>{(bookInfo.wordCount / 10000).toFixed(0)}万字<span>{moment(bookInfo.updated).fromNow(true)}之前更新</span></div>
        <div>追书热人气{bookInfo.latelyFollower}</div>
        <div>读者存留{bookInfo.retentionRatio}</div>
        <div>社区帖子{bookInfo.postCount}</div>
        <div>日更字数{bookInfo.serializeWordCount}</div>
        <div>{bookInfo.longIntro}</div>
      </div>
    );
  }
}

export default hot(module)(BookDetail);
