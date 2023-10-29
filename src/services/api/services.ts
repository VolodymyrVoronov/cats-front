import client from './axios-client';

import type { Cat } from '../../store/cats';

interface ICreateCat extends Omit<Cat, 'id' | 'createdAt' | 'updatedAt'> {}

const fetchAllCats = (): Promise<{ data: { cats: Cat[] } }> =>
  client.get('/cats');
const fetchCatByID = (id: string) => client.get(`/cats/${id}`);
const createCat = (data: ICreateCat) => client.post('/cat', data);
const deleteCat = (id: string) => client.delete(`/cats/${id}`);
const updateCat = (id: string, data: Cat) => client.put(`/cats/${id}`, data);

export const CatService = {
  fetchAllCats,
  fetchCatByID,
  createCat,
  deleteCat,
  updateCat,
};
