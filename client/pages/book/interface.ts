
interface RootObject {
  total: number;
  today: number;
  reviews: ReviewsItem[];
  ok: boolean;
}
interface ReviewsItem {
  _id?: string;
  rating?: number;
  author?: Author;
  helpful?: Helpful;
  likeCount?: number;
  state?: string;
  updated?: string;
  created?: string;
  commentCount?: number;
  content?: string;
  title?: string;
}
interface Author {
  _id: string;
  avatar: string;
  nickname: string;
  activityAvatar: string;
  type: string;
  lv: number;
  gender: string;
}
interface Helpful {
  total: number;
  no: number;
  yes: number;
}


interface Rating {
  count: number;
  score: number;
  isEffect: boolean;
}

interface IBookDetail {
  _id: string;
  title: string;
  author: string;
  longIntro: string;
  cover: string;
  creater: string;
  majorCate: string;
  minorCate: string;
  majorCateV2: string;
  minorCateV2: string;
  hiddenPackage: any[];
  apptype: number[];
  rating: Rating;
  hasCopyright: boolean;
  buytype: number;
  sizetype: number;
  superscript: string;
  currency: number;
  contentType: string;
  _le: boolean;
  allowMonthly: boolean;
  allowVoucher: boolean;
  allowBeanVoucher: boolean;
  hasCp: boolean;
  postCount: number;
  latelyFollower: number;
  followerCount: number;
  wordCount: number;
  serializeWordCount: number;
  retentionRatio: string;
  updated: string;
  isSerial: boolean;
  chaptersCount: number;
  lastChapter: string;
  gender: string[];
  tags: string[];
  advertRead: boolean;
  cat: string;
  donate: boolean;
  _gg: boolean;
  isForbidForFreeApp: boolean;
  discount: null;
  limit: boolean;
}

export {
  IBookDetail,
  ReviewsItem,
};
