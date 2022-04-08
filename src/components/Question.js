import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../api/opentdbHelper';
import { addScore } from '../actions/gameAction';
import Loading from './Loading';

const MAX_QUESTIONS = 4;
const CORRECT_ANSWER = 'correct-answer';
const SECOND = 1000;
const DEFAULT_POINT = 10;
const SCORE_BOARD = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Question extends React.Component {
  constructor() {
    super();

    this.timer = 0;

    this.state = {
      index: 0,
      time: 30,
      questions: [],
      replied: false,
      loading: true,
      shuffledAnswers: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const { time } = this.state;
      if (time === 1) {
        this.setState({ replied: true });
        clearInterval(this.timer);
      }
      this.setState({ time: time - 1 });
    }, SECOND);
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  fetchQuestions = async () => {
    const { index } = this.state;
    const { token } = this.props;
    const data = await fetchQuestion(token);
    this.setState({
      questions: data,
      loading: false,
      shuffledAnswers: this.shuffleArray([
        ...data[index].incorrect_answers,
        data[index].correct_answer,
      ]),
    }, this.startTimer);
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { index, questions } = this.state;

    if (index < MAX_QUESTIONS) {
      this.setState({
        index: index + 1,
        time: 29,
        replied: false,
        shuffledAnswers: this.shuffleArray([
          ...questions[index + 1].incorrect_answers,
          questions[index + 1].correct_answer,
        ]),
      }, this.startTimer);
    } else {
      history.push('/feedback');
    }
  };

  handleAnswer = (target, question) => {
    const { addPlayerScore } = this.props;
    const { time } = this.state;

    if (target.id === CORRECT_ANSWER) {
      addPlayerScore(DEFAULT_POINT + (time * SCORE_BOARD[question.difficulty]));
    }

    this.setState({ replied: true });
    clearInterval(this.timer);
  };

  renderAnswers = (question, replied) => {
    const { shuffledAnswers } = this.state;

    let answerIndex = 0;
    return shuffledAnswers.map((answer) => {
      let id = '';
      if (question.correct_answer === answer) {
        id = CORRECT_ANSWER;
      } else {
        id = `wrong-answer-${answerIndex}`;
        answerIndex += 1;
      }
      return (
        <button
          type="button"
          className="answer-input"
          data-testid={ id }
          id={ id }
          key={ answer }
          value={ answer }
          disabled={ replied }
          onClick={ ({ target }) => this.handleAnswer(target, question) }
        >
          {answer}
        </button>
      );
    });
  };

  render() {
    const { questions, time, replied, index, loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      questions.length > 0 && (
        <section className="question-container">
          <span>
            {time}
          </span>
          <h3 data-testid="question-category">{questions[index].category}</h3>
          <p data-testid="question-text">{questions[index].question}</p>
          <div
            className={ `answer-input-container${replied ? ' replied' : ''}` }
            data-testid="answer-options"
          >
            {this.renderAnswers(questions[index], replied)}
          </div>
          <input
            data-testid="btn-next"
            className={ `next-question-btn${!replied ? ' hidden' : ''}` }
            disabled={ !replied }
            type="button"
            value={ index < MAX_QUESTIONS ? 'Próxima Pergunta' : 'Finalizar' }
            onClick={ this.nextQuestion }
          />
        </section>
      )
    );
  }
}

Question.propTypes = {
  token: PropTypes.string.isRequired,
  addPlayerScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  addPlayerScore: (points) => dispatch(addScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
