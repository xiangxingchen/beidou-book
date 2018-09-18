import { observable, action } from 'mobx';
import axios from 'axios';

const INIT_USER_STORE = {
  currentUser: 'chenxiang',
  data: [ 1 ],
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
  public set user(user: string) {
    this.currentUser = user;
  }
  @action public getData(): void {
    axios.get('/api/user')
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => console.log('------------', err));
  }

}

export default UserStore;
