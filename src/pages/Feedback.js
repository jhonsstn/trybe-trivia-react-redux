import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <h3 data-testid="feedback-text">Feedback</h3>
        <Header />
        <section>
          { assertions > 2
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p> }
        </section>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
