interface UserState {
  name: string;
}

interface UserPropsType {
  user: UserState;
  novelStore: {
    rank: RankObject;
  };
  onViewInit: () => () => void;
  vali?: boolean;
  userStore: {
    currentUser: string;
    getData: () => void;
    data: number [];
  };
}

interface RankObject {
  male: MaleItem[];
  female: FemaleItem[];
  picture: PictureItem[];
  press: PressItem[];
  ok: boolean;
}
interface MaleItem {
  name: string;
  bookCount: number;
  monthlyCount: number;
  icon: string;
  bookCover: string[];
}
interface FemaleItem {
  name: string;
  bookCount: number;
  monthlyCount: number;
  icon: string;
  bookCover: string[];
}
interface PictureItem {
  title: string;
  shortTitle: string;
  cover: string;
  _id: string;
  collapse: boolean;
}
interface PressItem {
  name: string;
  bookCount: number;
  monthlyCount: number;
  icon: string;
  bookCover: string[];
}
interface ITabs {
  key?: string;
  title: string;
  select?: boolean;
}
interface IBook {
  _id: string;
  title: string;
  author: string;
  shortIntro: string;
  majorCate: string;
  minorCate: string;
  cover: string;
  site: string;
  allowMonthly: boolean;
  banned: number;
  latelyFollower: number;
  retentionRatio: string;
}

interface IRanking {
  _id: string;
  updated: string;
  title: string;
  tag: string;
  cover: string;
  icon: string;
  __v: number;
  shortTitle: string;
  created: string;
  biTag: string;
  isSub: boolean;
  collapse: boolean;
  'new': boolean;
  gender: string;
  priority: number;
  books: IBook[];
  id: string;
  total: number;
}

export {
  UserState,
  UserPropsType,
  RankObject,
  ITabs,
  IRanking,
  IBook,
};
