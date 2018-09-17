import { observable, action } from 'mobx';
import axios from 'axios';

const INIT_USER_STORE = {
  currentUser: 'chenxiang',
  data: [ 1 ],
};

const person = observable({
  name: 'cx',
});
const son = observable.map({
  name: 'son',
});

class UserStore {

  @observable public currentUser: string;
  @observable public data: number [];

  constructor(store) {
    console.log('store', store);
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
    son.set('name', 'new value');
    axios.get('/api/user')
      .then((res) => {
        this.data = res.data;
        console.log('res', res);
      })
      .catch((err) => console.log('------------', err));
  }

}

export default UserStore;
