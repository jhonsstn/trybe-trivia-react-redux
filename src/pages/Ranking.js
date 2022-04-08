import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <>
        <h3 data-testid="ranking-title">Ranking</h3>
        <Link to="/">
          <input data-testid="btn-go-home" type="button" value="Login" />
        </Link>
      </>
    );
  }
}

export default Ranking;
