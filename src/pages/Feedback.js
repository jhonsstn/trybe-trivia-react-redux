import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <h3 data-testid="feedback-text">Feedback</h3>
        <Header />
      </>
    );
  }
}

export default Feedback;
