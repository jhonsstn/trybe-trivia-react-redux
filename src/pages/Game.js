import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionAction } from '../actions/gameAction';
import Question from '../components/Question';

class Game extends Component {
  componentDidMount() {
    const { setQuestions } = this.props;
    setQuestions();
  }

  render() {
    // const {  } = this.props;
    return (
      <>
        <Header />
        <Question />
      </>
    );
  }
}

Game.propTypes = {
  setQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setQuestions: () => dispatch(fetchQuestionAction()),
});

export default connect(null, mapDispatchToProps)(Game);
