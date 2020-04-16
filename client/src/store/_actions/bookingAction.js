import axios from 'axios';

import * as Types from './types';

export const loadMyBooking = (pad) => (dispatch) => {
  console.log(pad);

  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'auth_token'
  );
  axios
    .post('http://localhost:5000/api/managebooking/', pad)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: Types.LOAD_MYBOOKING,
        payload: { mybooking: response.data },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const removeMyShift = (id) => (dispatch) => {
//   axios
//     .delete(`http://localhost:5000/api/manageshift/${id}`)
//     .then((response) => {
//       dispatch({
//         type: Types.REMOVE_MYSHIFT,
//         payload: { id: response.data._id },
//       });
//     })
//     .catch();
// };

export const updateMyBooking = (id, booking) => (dispatch) => {
  axios
    .put(`http://localhost:5000/api/manageshift/${id}`, booking)
    .then((response) => {
      dispatch({
        types: Types.UPDATE_MYBOOKING,
        payload: { booking: response.data.booking },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
