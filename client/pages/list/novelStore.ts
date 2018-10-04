import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { RankObject, ITabs, IRanking, IBookDetail } from './redux/interface';

const INIT_USER_STORE = {
  rank: {
    male: [],
    female: [],
    picture: [],
    press: [],
    ok: false,
  },
  tabs: [
    { title: '男版', key: 'male' },
    { title: '女版', key: 'female' },
    { title: '图书', key: 'picture' },
    { title: '出版', key: 'epub' },
  ],
  ranking: {
    _id: '5a6844aafc84c2b8efaa6b6e',
    updated: '2018-09-23T21:20:07.461Z',
    title: '好评榜',
    tag: 'manualRank',
    cover: '/ranking-cover/142319144267827',
    icon: '/cover/148945782817557',
    __v: 1414,
    shortTitle: '好评榜',
    created: '2018-09-24T06:20:14.082Z',
    biTag: 'favourable_comment_male',
    isSub: false,
    collapse: false,
    new: true,
    gender: 'male',
    priority: 260,
    books: [],
    id: '5a6844aafc84c2b8efaa6b6e',
    total: 97,
  },
};

class NovelStore {

  public rank: RankObject;
  public tabs: ITabs[];
  @observable public ranking: IRanking;
  @observable public currentTab: string;
  @observable public data: number [];

  constructor(store = INIT_USER_STORE) {
    this.rank = store.rank;
    this.ranking = store.ranking;
    this.tabs = INIT_USER_STORE.tabs;
    this.currentTab = 'male';
  }

  @computed get currentRank() {
    return this.rank[this.currentTab];
  }

  @action public setCurrentTab(tab: string): void {
    this.currentTab = tab;
  }

  @action public getRankingList(id: string): void {
    axios.get(`/api/getRanking/${id}`)
      .then((res) => {
        this.ranking = res.data;
      })
      .catch((err) => console.log('------------', err));
  }
}

export default NovelStore;
