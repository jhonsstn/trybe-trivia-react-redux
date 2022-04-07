import { GET_QUESTIONS } from '../actions/gameAction';

const INITIAL_STATE = {
  questions: [],
  loaded: false,
};

function game(state = INITIAL_STATE, actions) {
  const { payload } = actions;

  switch (actions.type) {
  case GET_QUESTIONS:
    console.log(payload.results);
    return { ...state, questions: [...payload.results], loaded: true };
  default:
    return state;
  }
}

export default game;
