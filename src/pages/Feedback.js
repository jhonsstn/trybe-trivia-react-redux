import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <section>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          {assertions > 2 ? (
            <p data-testid="feedback-text">Well Done!</p>
          ) : (
            <p data-testid="feedback-text">Could be better...</p>
          )}
          <Link to="/">
            <input
              data-testid="btn-play-again"
              type="button"
              value="Play Again"
            />
          </Link>
          <Link to="/ranking">
            <input data-testid="btn-ranking" type="button" value="Ranking" />
          </Link>
        </section>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
