import axios from 'axios';
import serverURL from '../../utils/serverURL';

import * as Types from './types';

export const loadMyPad = () => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'auth_token'
  );
  axios
    .get(`${serverURL}managepad/`)
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
    .post(`${serverURL}managepad/add-pad`, data)
    .then((response) => {
      console.log(response);
      dispatch({
        type: Types.ADD_MYPAD,
        payload: { mypad: response.data.pad },
      });
    })
    .catch();
};

export const removeMyPad = (id) => (dispatch) => {
  axios
    .delete(`${serverURL}managepad/${id}`)
    .then((response) => {
      dispatch({
        type: Types.REMOVE_MYPAD,
        payload: { id: response.data._id },
      });
    })
    .catch();
};

export const updateMyPad = (id, pad) => (dispatch) => {
  axios
    .put(`${serverURL}managepad/${id}`, pad)
    .then((response) => {
      dispatch({
        type: Types.UPDATE_MYPAD,
        payload: {
          mypad: response.data.pad,
        },
      });
    })
    .catch();
};
