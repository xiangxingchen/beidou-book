import UserStore from './pages/list/redux/userStore';
import UiStore from './pages/ui/uiStore';
import NovelStore from './pages/list/novelStore';
import BookStore from './pages/book/bookDetailStore';

function rootStore(initState) {
  const { userStore, uiStore, novelStore, bookStore } = initState;
  return {
    userStore: new UserStore(userStore),
    uiStore: new UiStore(uiStore),
    novelStore: new NovelStore(novelStore),
    bookStore: new BookStore(bookStore),
  };
}

export { rootStore };
