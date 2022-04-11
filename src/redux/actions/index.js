import { fetchToken } from '../../services/opentdbHelper';
import getGravatarUrl from '../../services/gravatarHelper';

export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const GET_PLAYER_TOKEN = 'GET_PLAYER_TOKEN';
export const SET_PLAYER_AVATAR = 'SET_PLAYER_AVATAR';
export const ADD_SCORE = 'ADD_SCORE';
export const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';

export const userLoginAction = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

const getPlayerToken = (payload) => ({
  type: GET_PLAYER_TOKEN,
  payload,
});

export const fetchTokenAction = () => async (dispatch) => {
  const object = await fetchToken();
  localStorage.setItem('token', object.token);
  dispatch(getPlayerToken(object));
};

const setPlayerAvatar = (avatar) => ({
  type: SET_PLAYER_AVATAR,
  avatar,
});

export const getGravatarAction = () => (dispatch, getState) => {
  const URL = getGravatarUrl(getState);
  dispatch(setPlayerAvatar(URL));
};

export const addScore = (points) => ({ type: ADD_SCORE, points });

export const gameSettingsAction = (settings) => ({
  type: SET_GAME_SETTINGS,
  settings,
});
