import { observable, action } from 'mobx';
import axios from 'axios';
import { RankObject } from './redux/interface';

const INIT_USER_STORE = {
  rank: {
    male: [],
    female: [],
    picture: [],
    press: [],
    ok: false,
  },
};

class NovelStore {

  public rank: RankObject;
  @observable public data: number [];

  constructor(store = INIT_USER_STORE) {
    this.rank = store.rank;
  }

  @action public getData(): void {
    axios.get('/api/user')
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => console.log('------------', err));
  }

}

export default NovelStore;
