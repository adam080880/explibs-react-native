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
};
