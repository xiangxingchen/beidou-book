import { observable, action } from 'mobx';
import axios from 'axios';
import { ISourceItem, ChapterInfo, IChapterList } from './interface';

const INIT_USER_STORE = {
  chapterInfo: {
    ok: true,
    chapter: {
      title: '12',
      id: '12',
    },
  },
  sourceArr: [],
  chapterList: {
    _id: '5a1ad2476a0f6e9f2f6d35c2',
    link: 'http://book.my716.com/getBooks.aspx?method=chapterList&bookId=2044498',
    source: 'my176',
    name: '176小说',
    chapters: [],
    updated: '2018-10-05T03:57:44.502Z',
    starting: false,
    host: 'book.my716.com',
  },
};

class ChapterStore {

  @observable public sourceArr: ISourceItem[];
  @observable public chapterList: IChapterList;
  @observable public chapterInfo: ChapterInfo;

  constructor(store = INIT_USER_STORE) {
    this.sourceArr = store.sourceArr;
    this.chapterList = store.chapterList;
    this.chapterInfo = store.chapterInfo;
  }

  @action public getBookById(id: string): void {
    axios.get(`/api/getBookById/${id}`)
      .then((res) => {
        this.sourceArr = res.data;
      })
      .catch((err) => console.log('------------', err));
  }
  @action public getchapterList(id: string): void {
    axios.get(`/api/getchapterList`, {
      params: {
        book: id,
      },
    })
      .then((res) => {
        this.sourceArr = res.data;
      })
      .catch((err) => console.log('------------', err));
  }

}

export default ChapterStore;
