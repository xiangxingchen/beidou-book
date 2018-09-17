import UserStore from './pages/list/redux/userStore';
const INIT_STATE = {
  userStore: undefined,
};

function store(initState = INIT_STATE) {
  return {
    userStore: new UserStore(),
  };
}

export default store;
