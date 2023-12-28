import { RootDrawerParamList } from '../routes';

declare global {
  namespace ReactNavigation {
    type RootParamList = RootDrawerParamList
  }
}

export type Nav = {
  navigate: (value: keyof RootDrawerParamList) => void;
}