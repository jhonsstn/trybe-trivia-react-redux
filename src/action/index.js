export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const GET_PLAYER_TOKEN = 'GET_PLAYER_TOKEN';

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
