import { PLAYER_LOGIN } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, actions) {
  const { payload } = actions;
  switch (actions.type) {
  case PLAYER_LOGIN:
    return { ...state, name: payload.surname, gravatarEmail: payload.email };
  default:
    return state;
  }
}

export default player;
