import client from './axios-client';

import type { Cats } from '../../store/cats';

const fetchAllCats = () => client.get<{ cats: Cats }>('/cats');
const fetchCatByID = (id: string) => client.get(`/cats/${id}`);
const createCat = (data: unknown) => client.post('/cat', data);
const deleteCat = (id: string) => client.delete(`/cats/${id}`);
const updateCat = (id: string, data: unknown) =>
  client.put(`/cats/${id}`, data);

export const CatService = {
  fetchAllCats,
  fetchCatByID,
  createCat,
  deleteCat,
  updateCat,
};
