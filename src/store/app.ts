import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Pages } from '../constants';

interface IAppStore {
  selectedPage: {
    name: string;
    code: string;
    icon: string;
  };
}

interface IAppStoreActions {
  setSelectedPage: (page: { name: string; code: string; icon: string }) => void;
}

export const useAppStore = create(
  immer<IAppStore & IAppStoreActions>((set) => ({
    selectedPage: {
      name: 'Home',
      code: Pages.Home,
      icon: 'pi-home',
    },

    setSelectedPage: (page: { name: string; code: string; icon: string }) => {
      set({ selectedPage: page });
    },
  })),
);
