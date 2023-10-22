import client from './axios-client';

const fetchAllCats = async () => {
  try {
    const res = await client.get('/cats');
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const fetchCatByID = async (id: string) => {
  try {
    const res = await client.get(`/cats/${id}`);
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const createCat = async (data: any) => {
  try {
    const res = await client.post('/cat', data);
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteCat = async (id: string) => {
  try {
    const res = await client.delete(`/cats/${id}`);
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const updateCat = async (id: string, data: any) => {
  try {
    const res = await client.put(`/cats/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export { fetchAllCats, fetchCatByID, createCat, deleteCat, updateCat };
