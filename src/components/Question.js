import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../api/opentdbHelper';
import Loading from './Loading';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  getKeyByValue(object, value) {
    Object.keys(object).find((key) => object[key] === value);
  }

  fetchQuestions = async () => {
    const { token } = this.props;
    this.setState({
      loading: true,
    });
    const data = await fetchQuestion(token);

    this.setState(
      {
        questions: data,
      },
      this.setState({
        loading: false,
      }),
    );
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  nextQuestion = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
  };

  renderAnswers = (question) => {
    // if (question === undefined) return console.log(question);
    // const [incorrect_answers: incorrect, correct_answer: correct] = question;
    const answers = this.shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);

    let answerIndex = 0;
    return answers.map((answer) => {
      let id = '';
      if (this.getKeyByValue(question, answer) === 'correct_answer') {
        id = 'correct-answer';
      } else {
        id = `wrong-answer-${answerIndex}`;
        answerIndex += 1;
      }
      return (
        <input data-testid={ id } key={ answer } type="button" value={ answer } />
      );
    });
  };

  render() {
    const { questions, index, loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      questions.length > 0 && (
        <div>
          <h3 data-testid="question-category">{questions[index].category}</h3>
          <p data-testid="question-text">{questions[index].question}</p>
          <div data-testid="answer-options">
            {this.renderAnswers(questions[index])}
          </div>
          <input type="button" value="next" onClick={ this.nextQuestion } />
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
