import { fetchQuestion } from '../api/opentdbHelper';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';

const getQuestion = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const fetchQuestionAction = () => async (dispatch, getState) => {
  const { token } = getState();
  console.log(`Estado antes: ${getState().game.questions}`);
  const object = await fetchQuestion(token);
  dispatch(getQuestion(object));
  console.log(`Estado depois: ${getState().game.questions}`);
};

export const addScore = (points) => ({ type: ADD_SCORE, points });
