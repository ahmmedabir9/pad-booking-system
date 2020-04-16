import axios from 'axios';

import * as Types from './types';

export const loadMyPad = () => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'auth_token'
  );
  axios
    .get('http://localhost:5000/api/managepad/')
    .then((response) => {
      dispatch({
        type: Types.LOAD_MYPAD,
        payload: { mypad: response.data },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addMyPad = (data) => (dispatch) => {
  axios
    .post('http://localhost:5000/api/managepad/add-pad', data)
    .then((response) => {
      console.log(response);
      dispatch({
        type: Types.ADD_MYPAD,
        payload: { mypad: response.data },
      });
    })
    .catch();
};

export const removeMyPad = (id) => (dispatch) => {
  axios.delete(`http://localhost:5000/api/managepad/${id}`)
  .then(response => {
    dispatch({
      type: Types.REMOVE_MYPAD,
      payload: { id: response.data._id },
    });
  })
  .catch()
};
