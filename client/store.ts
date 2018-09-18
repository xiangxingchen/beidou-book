import UserStore from './pages/list/redux/userStore';
import UiStore from './pages/ui/uiStore';

function rootStore(initState) {
  const { userStore, uiStore } = initState;
  return {
    userStore: new UserStore(userStore),
    uiStore: new UiStore(uiStore),
  };
}

export { rootStore };
