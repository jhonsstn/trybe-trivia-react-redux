import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score, avatar } = this.props;
    const playerData = {
      name,
      score,
      avatar,
    };

    if (localStorage.getItem('ranking')) {
      const data = JSON.parse(localStorage.getItem('ranking'));
      data.push(playerData);
      localStorage.setItem('ranking', JSON.stringify(data));
    } else {
      const array = [playerData];
      localStorage.setItem('ranking', JSON.stringify(array));
    }
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <section className="feedback-container">
          <div>
            <span>Pontuação total: </span>
            <span data-testid="feedback-total-score">{score}</span>
          </div>
          <div>
            <span>Questões acertadas: </span>
            <span data-testid="feedback-total-question">{assertions}</span>
          </div>
          {assertions > 2 ? (
            <span data-testid="feedback-text">Well Done!</span>
          ) : (
            <span data-testid="feedback-text">Could be better...</span>
          )}
          <div>
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
          </div>
        </section>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  avatar: state.player.avatar,
});

export default connect(mapStateToProps)(Feedback);
