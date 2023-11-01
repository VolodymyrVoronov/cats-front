import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { CatService } from '../services/api/services';

export interface Cat {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  age: number | null;
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

  deletingCat: boolean;
  errorDeletingCat: string | null;

  catToEdit: Cat | null;
}

interface ICatsStoreActions {
  fetchAllCats: () => Promise<void>;
  deleteCat: (catId: string) => Promise<void>;
  setCatToEdit: (catId: string | null) => void;
}

export const useCatsStore = create(
  immer<ICatsStore & ICatsStoreActions>((set, get) => ({
    cats: [],
    fetchingCats: false,
    errorFetchingCats: null,
    deletingCat: false,
    errorDeletingCat: null,
    catToEdit: null,

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
          set({ errorFetchingCats: null });
          clearTimeout(timeoutId);
        });
    },

    deleteCat: async (catId) => {
      const timeoutId = setTimeout(() => {
        set({ deletingCat: true });
      }, 2000);

      await CatService.deleteCat(catId)
        .then((res) => {
          if (res.status === 200) {
            set({ deletingCat: false });

            get().fetchAllCats();
          }
        })
        .catch((err) => {
          set({ deletingCat: false });
          set({ errorDeletingCat: err.message });
        })
        .finally(() => {
          set({ deletingCat: false });
          set({ errorDeletingCat: null });
          clearTimeout(timeoutId);
        });
    },

    setCatToEdit: (catId) => {
      if (catId === null) {
        set({ catToEdit: null });
      } else {
        const catToEdit = get().cats.find((cat) => cat.id === catId);

        set({ catToEdit });
      }
    },
  })),
);
