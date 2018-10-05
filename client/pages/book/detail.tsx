import React from 'react';
import { defaultProps, computedProps } from 'react-decoration';
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import style from './index.module.less';
import { IBookDetail, ReviewsItem, BooksItem } from 'client/pages/book/interface';

moment.locale('zh-cn');
interface State {}
interface IRank {
  bookStore?: {
    bookInfo?: IBookDetail;
    bookReview?: ReviewsItem [];
    recommendBook?: BooksItem [];
  };
}
@inject('bookStore')
@observer
class BookDetail extends React.Component<IRank, State> {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    console.log('constructor', props);
    if (_.isEmpty(props.bookStore.bookInfo)) {
      props.bookStore.getBookById(id);
      props.bookStore.getBookReview(id);
    }
  }
  public render() {
    const { bookInfo, bookReview, recommendBook } = this.props.bookStore;
    console.log(recommendBook);
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
        <WhiteSpace size="md"/>
        <hr />
        <WhiteSpace size="md"/>
        <div className={style.shortInfo}>热门书评</div>
        <WhiteSpace size="md"/>
        {bookReview.length > 0 && bookReview.slice(0, 2).map(item => <Flex key={item._id} className={style.review}>
            <div><img className={style.review_img} src={'http://api.zhuishushenqi.com' + item.author.avatar}/></div>
            <div className={style.review_info}>
              <div className={style.review_name}>{item.author.nickname}</div>
              <div className={style.review_title}>{item.title.slice(0, 15)}</div>
              <div className={style.gray}>{item.content.slice(0, 60)} ...</div>
              <Flex className={style.gray}>
                <Flex.Item>{moment(item.created).fromNow()}</Flex.Item>
                <Flex.Item>{item.helpful.yes} 有用</Flex.Item>
              </Flex>
              <WhiteSpace size="md"/>
            </div>
        </Flex>)}
        <hr />
        <WhiteSpace size="md"/>
        <div className={style.shortInfo}>你可能喜欢</div>
        <WhiteSpace size="md"/>
        <Flex className={style.flex}>
        { recommendBook.length > 0 && recommendBook.slice(0, 6).map(item => <Flex.Item key={item._id} className={style.flex_item}>
          <Link  to={'/book/' + item._id}>
            <img src={decodeURIComponent(item.cover)} className={style.book_img}/>
            <div>{item.title}</div>
          </Link>
        </Flex.Item>)}
        </Flex>
      </WingBlank>
    );
  }
}

export default hot(module)(BookDetail);
