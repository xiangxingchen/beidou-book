import { observable, action } from 'mobx';
import axios from 'axios';

const INIT_USER_STORE = {
  currentUser: 'chenxiang',
  data: [],
};

class UserStore {

  @observable public currentUser: string;
  @observable public data: number [];

  constructor(store = INIT_USER_STORE) {
    this.currentUser = store.currentUser;
    this.data = store.data;
  }

  @action public forgetUser() {
    this.currentUser = undefined;
  }
  @action public getData(): void {
    axios.get('/api/user')
      .then((res) => {
        this.data = res.data;
        console.log('res', res);
      })
      .catch((err) => console.log('------------', err));
  }

}

export default UserStore;
