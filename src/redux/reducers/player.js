import { PLAYER_LOGIN, SET_PLAYER_AVATAR, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  avatar: '',
};

const player = (state = INITIAL_STATE, actions) => {
  const { payload } = actions;
  switch (actions.type) {
  case PLAYER_LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
      score: 0,
    };
  case SET_PLAYER_AVATAR:
    return { ...state, avatar: actions.avatar };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + actions.points,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
