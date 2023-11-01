import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { pages } from '../constants';

interface IAppStore {
  selectedPage: {
    name: string;
    code: string;
    icon: string;
  };
  showEditForm: boolean;
}

interface IAppStoreActions {
  setSelectedPage: (page: { name: string; code: string; icon: string }) => void;
  setShowEditForm: (show: boolean) => void;
}

export const useAppStore = create(
  immer<IAppStore & IAppStoreActions>((set) => ({
    selectedPage: {
      name: 'Home',
      code: pages.Home,
      icon: 'pi-home',
    },
    showEditForm: false,

    setSelectedPage: (page: { name: string; code: string; icon: string }) => {
      set({ selectedPage: page });
    },

    setShowEditForm: (show) => {
      set({ showEditForm: show });
    },
  })),
);
