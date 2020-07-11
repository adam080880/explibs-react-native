import axios from 'axios';
import qs from 'querystring';
import apiUrl from '../helpers/apiUrl';

export default {
  get: (param) => {
    return axios.get(apiUrl(`/books?limit=4&${qs.stringify(param)}`));
  },
  find: (id) => {
    return axios.get(apiUrl(`/books/${id}`));
  },
  popular: () => axios.get(apiUrl('/books/popular')),
  review: (data, bookId, token) =>
    axios.post(apiUrl(`/books/review/${bookId}`), qs.stringify(data), {
      headers: {
        Authorization: 'Bearer '.concat(token),
      },
    }),
};
