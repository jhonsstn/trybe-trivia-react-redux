import { GET_PLAYER_TOKEN } from '../action';

const INITIAL_STATE = {
  token: '',
};

function token(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
  case GET_PLAYER_TOKEN:
    return payload.token;
  default:
    return state;
  }
}

export default token;
