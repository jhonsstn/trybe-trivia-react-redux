import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../api/opentdbHelper';
import Loading from './Loading';

const SECOND = 1000;

class Question extends React.Component {
  constructor() {
    super();

    this.time = 29;
    this.timer = 0;

    this.state = {
      index: 0,
      questions: [],
      replied: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      console.log(this.time);
      if (this.time === 0) {
        this.setState({ replied: true });
        clearInterval(this.timer);
      }
      this.time -= 1;
    }, SECOND);
  }

  fetchQuestions = async () => {
    const { token } = this.props;
    const data = await fetchQuestion(token);
    this.setState({ questions: data, loading: false });

    this.startTimer();
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  nextQuestion = () => {
    const { index } = this.state;
    const maxNext = 4;

    if (index < maxNext) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        replied: false,
      }), this.startTimer);
    }
  };

  handleAnswer = ({ target }) => {
    const siblings = target.parentElement.childNodes;
    const correct = '3px solid rgb(6, 240, 15)';
    const wrong = '3px solid rgb(255, 0, 0)';
    siblings.forEach((element) => {
      if (element.id === 'correct-answer') {
        element.style.border = correct;
      } else {
        element.style.border = wrong;
      }
    });

    this.time = 29;
    this.setState({ replied: true });
    clearInterval(this.timer);
  };

  renderAnswers = (question, replied) => {
    const answers = this.shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);

    let answerIndex = 0;
    return answers.map((answer) => {
      let id = '';
      if (question.correct_answer === answer) {
        id = 'correct-answer';
      } else {
        id = `wrong-answer-${answerIndex}`;
        answerIndex += 1;
      }
      return (
        <button
          type="button"
          data-testid={ id }
          id={ id }
          key={ answer }
          value={ answer }
          disabled={ replied }
          onClick={ this.handleAnswer }
        >
          {answer}
        </button>
      );
    });
  };

  render() {
    const { questions, replied, index, loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      questions.length > 0 && (
        <div>
          <h3 data-testid="question-category">{questions[index].category}</h3>
          <p data-testid="question-text">{questions[index].question}</p>
          <div data-testid="answer-options">
            {this.renderAnswers(questions[index], replied)}
          </div>
          <input
            data-testid="btn-next"
            type="button"
            value="next"
            onClick={ this.nextQuestion }
          />
        </div>
      )
    );
  }
}

Question.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Question);
