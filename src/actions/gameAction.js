import { fetchQuestion } from '../api/opentdbHelper';

export const GET_QUESTIONS = 'GET_QUESTIONS';

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
