import { SET_GAME_SETTINGS } from '../actions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_GAME_SETTINGS:
    return { ...action.settings };
  default:
    return state;
  }
};

export default settings;
