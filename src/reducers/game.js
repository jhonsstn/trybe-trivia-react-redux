import { GET_QUESTIONS } from '../actions/gameAction';

const INITIAL_STATE = {
  questions: [],
};

function game(state = INITIAL_STATE, actions) {
  const { payload } = actions;
  switch (actions.type) {
  case GET_QUESTIONS:
    return { ...state, questions: [...payload.results] };
  default:
    return state;
  }
}

export default game;
