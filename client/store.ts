import UserStore from './pages/list/redux/userStore';
import UiStore from './pages/ui/uiStore';
import NovelStore from './pages/list/novelStore';

function rootStore(initState) {
  const { userStore, uiStore, novelStore } = initState;
  return {
    userStore: new UserStore(userStore),
    uiStore: new UiStore(uiStore),
    novelStore: new NovelStore(novelStore),
  };
}

export { rootStore };
