import axios from 'axios';

import * as Types from './types';

import serverURL from '../../utils/serverURL';

export const loadMyBooking = (pad) => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'auth_token'
  );
  axios
    .post(`${serverURL}managebooking/`, pad)
    .then((response) => {
      dispatch({
        type: Types.LOAD_MYBOOKING,
        payload: { mybooking: response.data },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeMyBooking = (id) => (dispatch) => {
  axios
    .delete(`${serverURL}managebooking/${id}`)
    .then((response) => {
      dispatch({
        type: Types.REMOVE_MYBOOKING,
        payload: { id: response.data._id },
      });
    })
    .catch();
};

export const updateMyBooking = (id, booking) => (dispatch) => {
  axios
    .put(`${serverURL}managebooking/${id}`, booking)
    .then((response) => {
      console.log(response.data.Booking);

      dispatch({
        type: Types.UPDATE_MYBOOKING,
        payload: { mybooking: response.data.Booking },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
