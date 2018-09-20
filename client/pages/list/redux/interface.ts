interface UserState {
  name: string;
}

interface UserPropsType {
  user: UserState;
  novelStore: {
    rank: RankObject;
  };
  onViewInit: () => () => void;
  vali?: boolean;
  userStore: {
    currentUser: string;
    getData: () => void;
    data: number [];
  };
}

interface RankObject {
  male: MaleItem[];
  female: FemaleItem[];
  picture: PictureItem[];
  press: PressItem[];
  ok: boolean;
}
interface MaleItem {
  name: string;
  bookCount: number;
  monthlyCount: number;
  icon: string;
  bookCover: string[];
}
interface FemaleItem {
  name: string;
  bookCount: number;
  monthlyCount: number;
  icon: string;
  bookCover: string[];
}
interface PictureItem {
  name: string;
  bookCount: number;
  monthlyCount: number;
  icon: string;
  bookCover: string[];
}
interface PressItem {
  name: string;
  bookCount: number;
  monthlyCount: number;
  icon: string;
  bookCover: string[];
}

export {
  UserState,
  UserPropsType,
  RankObject,
};
