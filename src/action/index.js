import md5 from 'crypto-js/md5';

export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const GET_PLAYER_TOKEN = 'GET_PLAYER_TOKEN';
export const SET_PLAYER_AVATAR = 'SET_PLAYER_AVATAR';

export const userLogin = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const getPlayerToken = (payload) => ({
  type: GET_PLAYER_TOKEN,
  payload,
});

export function fetchAPIAction() {
  return async (dispatch) => {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(URL);
    const data = await request.json();
    const objeto = {
      token: data.token,
    };
    dispatch(getPlayerToken(objeto));
  };
}

export const setPlayerAvatar = (avatar) => ({
  type: SET_PLAYER_AVATAR,
  avatar,
});

export function fetchGravatar() {
  return async (dispatch, getState) => {
    const hash = md5(getState().player.gravatarEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(setPlayerAvatar(URL));
  };
}
