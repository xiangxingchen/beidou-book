interface UserState {
  name: string;
}

interface UserPropsType {
  user: UserState;
  onViewInit: () => () => void;
  vali?: boolean;
  userStore: {
    currentUser: string;
    getData: () => void;
    data: number [];
  };
}

export {
  UserState,
  UserPropsType,
};
