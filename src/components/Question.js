import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: [],
      answers: [],
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { index } = this.state;
    const { getQuestions } = this.props;
    const { incorrect_answers: incorrect, correct_answer: correct } = getQuestions[index];
    this.setState({
      questions: getQuestions,
      answers: this.shuffleArray([...incorrect, correct]),
    });
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextQuestion() {
    const { index } = this.state;
    const { getQuestions } = this.props;
    const { incorrect_answers: incorrect, correct_answer: correct } = getQuestions[index];
    this.setState((prevState) => ({
      index: prevState.index + 1,
      answers: this.shuffleArray([...incorrect, correct]),
    }));
  }

  renderAnswers() {
    const { answers, questions, index } = this.state;
    let answerIndex = 0;
    return answers.map((answer) => {
      let id = '';
      if (this.getKeyByValue(questions[index], answer) === 'correct_answer') {
        id = 'correct-answer';
      } else {
        id = `wrong-answer-${answerIndex}`;
        answerIndex += 1;
      }
      return (
        <input data-testid={ id } key={ answer } type="button" value={ answer } />
      );
    });
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">{questions[index]?.category}</h3>
        <p data-testid="question-text">{questions[index]?.question}</p>
        {this.renderAnswers()}
        <input type="button" value="next" onClick={ this.nextQuestion } />

        <input type="button" value="next" onClick={ this.nextQuestion } />
      </div>
    );
  }
}

Question.propTypes = {
  getQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      correct_answer: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  getQuestions: state.game.questions,
});

export default connect(mapStateToProps)(Question);
