import { observable, action } from 'mobx';
import axios from 'axios';

const INIT_USER_STORE = {
  ui: 'ui',
};

class UiStore {

  @observable public ui: string;

  constructor(store = INIT_USER_STORE) {
    this.ui = store.ui;
  }

  @action public getData(): void {
    axios.get('/api/user')
      .then((res) => {
        this.ui = res.data;
      })
      .catch((err) => console.log('------------', err));
  }

}

export default UiStore;
