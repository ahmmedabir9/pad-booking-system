import axios from 'axios';

import * as Types from './types';

export const loadMyShift = () => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'auth_token'
  );
  axios
    .get('http://localhost:5000/api/manageshift/')
    .then((response) => {
      dispatch({
        type: Types.LOAD_MYSHIFT,
        payload: { myshift: response.data },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addMyShift = (data) => (dispatch) => {
  axios
    .post('http://localhost:5000/api/manageshift/add-shift', data)
    .then((response) => {
      console.log(response);
      dispatch({
        type: Types.ADD_MYSHIFT,
        payload: { myshift: response.data },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeMyShift = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/manageshift/${id}`)
    .then((response) => {
      dispatch({
        type: Types.REMOVE_MYSHIFT,
        payload: { id: response.data._id },
      });
    })
    .catch();
};
