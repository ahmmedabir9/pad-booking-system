import * as Types from './types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import serverURL from '../../utils/serverURL';

export const register = (user, history) => (dispatch) => {
  axios
    .post(`${serverURL}managers/register`, user)
    .then((res) => {
      console.log(res);
      if (res.data.registerSuccess) {
        dispatch({
          type: Types.USERS_ERROR,
          payload: {
            error: {},
          },
        });
        history.push('/Login');
      }
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const login = (user, history) => (dispatch) => {
  axios
    .post(`${serverURL}managers/login`, user)
    .then((res) => {
      let token = res.data.token;
      localStorage.setItem('auth_token', token);
      setAuthToken(token);
      let decode = jwtDecode(token);
      console.log(decode);

      dispatch({
        type: Types.SET_USER,
        payload: {
          user: decode,
        },
      });
      history.push('/ManagerDashboard');
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};
export const logout = (history) => {
  localStorage.removeItem('auth_token');
  return {
    type: Types.SET_USER,
    payload: {
      user: {},
    },
  };
  history.push('/Login');
};
