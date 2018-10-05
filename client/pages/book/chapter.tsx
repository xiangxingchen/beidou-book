import React from 'react';
import { WingBlank } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import style from './index.module.less';
import {
  ISourceItem,
  IChapterList,
  ChapterInfo,
} from 'client/pages/book/interface';

moment.locale('zh-cn');
interface State {}
interface IRank {
  chapterStore?: {
    sourceArr?: ISourceItem[];
    bookReview?: IChapterList;
    chapterInfo?: ChapterInfo;
  };
}
@inject('chapterStore')
@observer
class Chapter extends React.Component<IRank, State> {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    console.log('constructor', props);
    // if (_.isEmpty(props.bookStore.bookInfo)) {
    //   props.bookStore.getBookById(id);
    //   props.bookStore.getBookReview(id);
    // }
  }
  public render() {
    const { chapterInfo } = this.props.chapterStore;
    console.log(chapterInfo);
    const info = chapterInfo.chapter.cpContent.replace(/\s*\n*\s{2,}/g, '</p><p>');
    const infoFormat = info.replace(/\n+/g, '</p><p>');
    return (
      <WingBlank size="lg">
        <div dangerouslySetInnerHTML={{ __html: infoFormat }} />
      </WingBlank>
    );
  }
}

export default hot(module)(Chapter);
