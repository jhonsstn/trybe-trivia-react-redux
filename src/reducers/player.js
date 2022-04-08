import { PLAYER_LOGIN, SET_PLAYER_AVATAR } from '../actions/loginAction';
import { ADD_SCORE } from '../actions/gameAction';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  avatar: '',
};

function player(state = INITIAL_STATE, actions) {
  const { payload } = actions;
  switch (actions.type) {
  case PLAYER_LOGIN:
    return { ...state, name: payload.name, gravatarEmail: payload.email };
  case SET_PLAYER_AVATAR:
    return { ...state, avatar: actions.avatar };
  case ADD_SCORE:
    return { ...state, score: state.score + actions.points };
  default:
    return state;
  }
}

export default player;
