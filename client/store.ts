import UserStore from './pages/list/redux/userStore';
const INIT_STATE = {
  currentUser: '234',
  data: [],
};

function rootStore(initState) {
  return {
    userStore: new UserStore(initState),
  };
}

export { rootStore };
