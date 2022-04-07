import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Question />
      </>
    );
  }
}

export default Game;
