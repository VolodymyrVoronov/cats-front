import client from './axios-client';

import type { Cat } from '../../store/cats';

const fetchAllCats = (): Promise<{ data: { cats: Cat[] } }> =>
  client.get('/cats');
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
