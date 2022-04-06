import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    const { getQuestions } = this.props;
    console.log(getQuestions);
    const { index } = this.state;
    if (getQuestions.length === 0) {
      return <h3> Carregando... </h3>;
    }
    const combinedArray = [...getQuestions[index].incorrect_answers,
      getQuestions[index].correct_answer];
    console.log(combinedArray);
    const questions = this.shuffleArray(combinedArray);
    console.log(questions);
    return (
      <div>
        <h3 data-testid="question-category">
          { getQuestions[index].category }
        </h3>
        <p data-testid="question-text">
          { getQuestions[index].question }
        </p>
        { questions.map((question)=> {
          console.log('Ola');
          return (
            <input type="button" />
          );
        }) }
      </div>
    );
  }
}

Question.propTypes = {
  getQuestions: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

const mapStateToProps = (state) => ({
  getQuestions: state.game.questions,
});

export default connect(mapStateToProps)(Question);
