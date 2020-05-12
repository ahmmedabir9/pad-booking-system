import axios from 'axios';
import serverURL from '../../utils/serverURL';
import * as Types from './types';

export const loadMyShift = () => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'auth_token'
  );
  axios
    .get(`${serverURL}manageshift/`)
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
    .post(`${serverURL}manageshift/add-shift`, data)
    .then((response) => {
      if (response.data.shift) {
        dispatch({
          type: Types.ADD_MYSHIFT,
          payload: { myshift: response.data.shift },
        });
        return response.data.shift;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeMyShift = (id) => (dispatch) => {
  axios
    .delete(`${serverURL}manageshift/${id}`)
    .then((response) => {
      dispatch({
        type: Types.REMOVE_MYSHIFT,
        payload: { id: response.data._id },
      });
    })
    .catch();
};
