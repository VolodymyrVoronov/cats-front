import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { CatService } from '../services/api/services';

export interface Cat {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  age: number;
  breed: string;
  photo: string;
  diseases: string;
  marked: boolean;
  insurance: boolean;
  information: string;
  alive: boolean;
  dead: boolean;
}

interface ICatsStore {
  cats: Cat[] | [];
  fetchingCats: boolean;
  errorFetchingCats: string | null;

  catToEdit: Cat | null;

  showEditForm: boolean;
}

interface ICatsStoreActions {
  fetchAllCats: () => Promise<void>;
  setCatToEdit: (catId: string) => void;
  setShowEditForm: (show: boolean) => void;
}

export const useCatsStore = create(
  immer<ICatsStore & ICatsStoreActions>((set, get) => ({
    cats: [],
    fetchingCats: false,
    errorFetchingCats: null,

    catToEdit: null,

    showEditForm: false,

    fetchAllCats: async () => {
      const timeoutId = setTimeout(() => {
        set({ fetchingCats: true });
      }, 2000);

      await CatService.fetchAllCats()
        .then((res) => {
          set({ cats: res.data.cats });
          set({ fetchingCats: false });
        })
        .catch((err) => {
          set({ fetchingCats: false });
          set({ errorFetchingCats: err.message });
        })
        .finally(() => {
          set({ fetchingCats: false });
          clearTimeout(timeoutId);
        });
    },

    setCatToEdit: (catId) => {
      const catToEdit = get().cats.find((cat) => cat.id === catId);

      set({ catToEdit });
    },

    setShowEditForm: (show) => {
      set({ showEditForm: show });
    },
  })),
);
