import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('ranking'));

    const ranking = storage.sort(this.compareScore);

    this.setState({
      ranking,
    });
  }

  compareScore = (a, b) => b.score - a.score;

  render() {
    const { ranking } = this.state;
    return (
      <section className="ranking-container">
        <h3 data-testid="ranking-title">Ranking</h3>
        {ranking.map((player, index) => (
          <div key={ player.name }>
            <span data-testid={ `player-name-${index}` }>{player.name}</span>
            <span data-testid={ `player-score-${index}` }>{player.score}</span>
          </div>
        ))}
        <Link to="/">
          <input
            className="default-btn"
            data-testid="btn-go-home"
            type="button"
            value="Login"
          />
        </Link>
      </section>
    );
  }
}

export default Ranking;
