import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { IBookDetail, ReviewsItem } from './interface';

const INIT_USER_STORE = {
  bookInfo: {
    _id: '548d9c17eb0337ee6df738f5',
    title: '最强狂兵',
    author: '烈焰滔滔',
    longIntro: '一代兵王含恨离开部队，销声匿迹几年后，逆天强者强势回归都市，再度掀起血雨腥风！简单粗暴是我的行事艺术，不服就干是我的生活态度！看顶级狂少如何纵横都市，书写属于他的天王传奇！依旧极爽极热血！ ',
    cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F683354%2F683354_f01a24b90d6a429c8c052614cc2d6ede.jpg%2F',
    creater: 'Lenovo Lenovo S899t',
    majorCate: '都市',
    minorCate: '都市生活',
    majorCateV2: '都市',
    minorCateV2: '热血兵王',
    hiddenPackage: [ ],
    apptype: [ 0, 1, 2, 4 ],
    rating: { count: 22628, score: 8.654, isEffect: true },
    hasCopyright: true,
    buytype: 0,
    sizetype: -1,
    superscript: '',
    currency: 0,
    contentType: 'txt',
    _le: false,
    allowMonthly: true,
    allowVoucher: true,
    allowBeanVoucher: true,
    hasCp: true,
    postCount: 19167,
    latelyFollower: 108506,
    followerCount: 0,
    wordCount: 10274046,
    serializeWordCount: 5764,
    retentionRatio: '65.64',
    updated: '2018-09-26T09:09:36.888Z',
    isSerial: true,
    chaptersCount: 3205,
    lastChapter: '正文 第3205章 喜当爹的太阳神！',
    gender: [ 'male' ],
    tags: [
      '强者回归',
      '称霸都市',
      '热血',
      '无敌流',
      '爽文',
      '都市',
      '扮猪吃虎',
      '特种兵',
    ],
    advertRead: true,
    cat: '都市生活',
    donate: false,
    _gg: false,
    isForbidForFreeApp: false,
    discount: null,
    limit: false,
  },
  bookReview: [],
};

class BookStore {

  @observable public bookInfo: IBookDetail;
  @observable public bookReview: ReviewsItem [];

  constructor(store = INIT_USER_STORE) {
    this.bookInfo = store.bookInfo;
    this.bookReview = store.bookReview;
  }

  @action public getBookById(id: string): void {
    axios.get(`/api/getBookById/${id}`)
      .then((res) => {
        this.bookInfo = res.data;
      })
      .catch((err) => console.log('------------', err));
  }
  @action public getBookReview(id: string): void {
    axios.get(`/api/getBookReview`, {
      params: {
        book: id,
      },
    })
      .then((res) => {
        this.bookInfo = res.data;
      })
      .catch((err) => console.log('------------', err));
  }

}

export default BookStore;
