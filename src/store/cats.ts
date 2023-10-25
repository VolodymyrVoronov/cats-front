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

export interface Cats {
  cats: Cat[];
}

interface ICatsStore {
  cats: Cats | [];
  fetchingCats: boolean;
  errorFetchingCats: string | null;
}

interface ICatsStoreActions {
  fetchAllCats: () => Promise<void>;
}

export const useCatsStore = create(
  immer<ICatsStore & ICatsStoreActions>((set) => ({
    cats: [],
    fetchingCats: false,
    errorFetchingCats: null,

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
  })),
);
