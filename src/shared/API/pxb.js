import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '27725708-a6a80f58c7bcef60f73c1e2a9',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 15,
  },
});

export const searchImages = async (q, page) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    }
  });

  return data.hits;
};